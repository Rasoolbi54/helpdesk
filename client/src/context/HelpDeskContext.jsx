import React, { createContext, useState, useEffect } from "react";

export const helpDeskContext = createContext();

const HelpDeskContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Define login function
  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // Define logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log(token, 'from context');
    
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <helpDeskContext.Provider value={value}>
      {props.children}
    </helpDeskContext.Provider>
  );
};

export default HelpDeskContextProvider;
