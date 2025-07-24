import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
const App = () => {
  const location = useLocation();
  const { authUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#23232f] to-[#2a2a3d] bg-no-repeat bg-cover bg-center text-white">
      <AnimatePresence mode="wait">
        <Toaster />
        import {Navigate} from 'react-router-dom'; 
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              authUser ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <HomePage />
                </motion.div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              authUser ? (
                <Navigate to="/" replace />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginPage />
                </motion.div>
              )
            }
          />
          <Route
            path="/profile"
            element={
              authUser ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProfilePage />
                </motion.div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
