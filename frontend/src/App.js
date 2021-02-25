import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

import axiosInstance from "./utils/axios-instance";

function App() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get item from localStorage and set result on state
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUserId(userData.userId);
      setToken(userData.token);
    }
  }, []);

  const signUp = async (email, password) => {
    try {
      let { data } = await axiosInstance.post("/auth/signup", {
        email,
        password,
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: data.userId,
          token: data.token,
        })
      );
      setUserId(data.userId);
      setToken(data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const logIn = async (email, password) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: data.userId,
          token: data.token,
        })
      );
      setUserId(data.userId);
      setToken(data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    console.log("log out");
    // Remove item from localStorage
    localStorage.removeItem("userData");
    setToken(null);
    setUserId(null);
  };

  return (
    <BrowserRouter>
      <Navbar token={token} logOut={logOut} />
      <Switch>
        <Route path="/signup">
          <SignUpPage signUp={signUp} />
        </Route>
        <Route path="/login">
          <LoginPage logIn={logIn} />
        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
