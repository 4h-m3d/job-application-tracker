import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { JobsProvider } from "./contexts/JobsContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import JobDetails from "./pages/JobDetails";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router basename="/job-application-tracker">
      <AuthProvider>
        <JobsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/add-job"
              element={
                <PrivateRoute>
                  <AddJob />
                </PrivateRoute>
              }
            />

            <Route
              path="/edit-job/:id"
              element={
                <PrivateRoute>
                  <EditJob />
                </PrivateRoute>
              }
            />

            <Route
              path="/jobs/:id"
              element={
                <PrivateRoute>
                  <JobDetails />
                </PrivateRoute>
              }
            />

            {/* default */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </JobsProvider>
      </AuthProvider>
    </Router>
  );
}
