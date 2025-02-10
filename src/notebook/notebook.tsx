import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './notebook.css';
import { NotebookData } from '../context/notebookContext';

const Notebook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Add useNavigate hook
  const [notebook, setNotbook] = useState<NotebookData>();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchNote = async () => {
      if (!id) return;

      const note = doc(db, 'notebooks', id);
      const noteSnapshot = await getDoc(note);

      if (!noteSnapshot.exists()) {
        console.error("Note not found");
        setIsLoading(false);
        return;
      }

      const noteData = noteSnapshot.data();
      setInput(noteData.content);
      setNotbook(noteData as NotebookData);
      setIsLoading(false);
    };

    fetchNote();
  }, [id]);

  async function updatenNoteInFirestore(newContent: string) {
    try {
      if (!id) return;

      const note = doc(db, 'notebooks', id);
      await setDoc(note, { content: newContent }, { merge: true });
    } catch (err) {
      console.error("Error adding note: ", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("check changed, wait 1 second before updating Firestore...");
    if (input === notebook?.content) {
      return;
    }

    setIsLoading(true);
    const getData = setTimeout(() => {
      console.log("updating Firestore...");
      updatenNoteInFirestore(input);
    }, 1000);

    return () => clearTimeout(getData);
  }, [input, notebook?.content]);

  return (
    <div className="notebook-container">
      <div className='title-loader'>
        {!isLoading && <h1>{notebook?.title ?? "Notes"}</h1>}
        {isLoading && <div className='loading-animation'>
          <p>Saving...</p>
        </div>}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button onClick={() => navigate(-1)} className="back-button">Back</button> {/* Add Back button */}
    </div>
  );
};

export default Notebook;