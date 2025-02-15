import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';

import IntroPage from "./pages/Auth/Intro";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (accessible only when not authenticated)
const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Root route now shows IntroPage */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <IntroPage />
            </PublicRoute>
          } 
        />

        {/* Auth routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } 
        />

        {/* Protected dashboard route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />

        {/* Catch all route - redirects to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;