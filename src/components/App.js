import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import UserContext from "../context/UserContext";
import SignIn from "./authentication/SignIn";
import SignUp from "./authentication/SignUp";
import HomePage from "./home/HomePage";

export default function App () {
  const [progressHabits, setProgressHabits] = useState(0);
  
  return (
    <>
      <GlobalStyle />
      <BrowserRouter >
        <UserContext.Provider value={{ progressHabits, setProgressHabits }}>
          <Routes >
            <Route path="/" element={<SignIn />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route
              path="/hoje"
              element={
                <HomePage>
                  
                </HomePage>
              } />
            <Route
              path="/habitos"
              element={
                <HomePage>
                  
                </HomePage>
              } />
              <Route
              path="/historico"
              element={
                <HomePage>
                  
                </HomePage>
              } />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}