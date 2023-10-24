import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import SignIn from "./authentication/SignIn";
import SignUp from "./authentication/SignUp";
import HomePage from "./home/HomePage";

export default function App () {
  const [token, setToken] = useState(localStorage.getItem("userData"));
  const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem("userData")));
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setAuthData(userData);
  }, [token]);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AuthContext.Provider value={{ token, setToken }}>
        <UserContext.Provider value={{ authData, setAuthData }}>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/timeline"
              element={
                <HomePage>
                  
                </HomePage>
              } />
          </Routes>
        </UserContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
}