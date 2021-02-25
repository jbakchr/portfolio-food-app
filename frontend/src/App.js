import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";

import axiosInstance from "./utils/axios-instance";

function App() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

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

  console.log("userId:", userId);
  console.log("token:", token);

  return (
    <BrowserRouter>
      <Navbar token={token} />
      <Switch>
        <Route path="/signup">
          <SignUpPage signUp={signUp} />
        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
