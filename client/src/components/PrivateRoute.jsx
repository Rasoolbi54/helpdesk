import React,{ useContext } from "react";
import { helpDeskContext } from "../context/HelpDeskContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { token, loading } = useContext(helpDeskContext)

  
  if (loading) {
    return <div>Checking authentication...</div>; 
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
