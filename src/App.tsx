import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';
import Home from './home/home';
import Login from './signin/signin';
import Signup from './signup/signup';
import './App.css';
import Notebook from './notebook/notebook';
import { NotebookProvider } from './context/notebookContext';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  }, [currentUser, navigate]);

  return currentUser ? <Home /> : null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotebookProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<AppContent />} />
            <Route path="/notebook/:id" element={<Notebook />} />
          </Routes>
        </Router>
      </NotebookProvider>
    </AuthProvider>
  );
};

export default App;