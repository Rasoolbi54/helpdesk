import React,{ useContext } from "react";
import { helpDeskContext } from "../context/HelpDeskContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { token, loading } = useContext(helpDeskContext)

  // Don't redirect or render children while loading
  if (loading) {
    return <div>Checking authentication...</div>; // or spinner
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
