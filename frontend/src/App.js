import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MyRecipesPage from "./pages/MyRecipesPage";

import axiosInstance from "./utils/axios-instance";

function App() {
  const [token, setToken] = useState(null);
  const [searchWords, setSearchWords] = useState([]);

  useEffect(() => {
    // Get item from localStorage and set result on state
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setToken(userData.token);
    }

    // Fetch search words
    fetchSearchWords();
  }, []);

  const fetchSearchWords = async () => {
    try {
      const { data } = await axiosInstance.get("search-words");
      console.log("fetched search words:", data);
      setSearchWords(data);
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (email, password) => {
    try {
      let { data } = await axiosInstance.post("/auth/signup", {
        email,
        password,
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          token: data.token,
        })
      );
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
          token: data.token,
        })
      );
      setToken(data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("userData");
    setToken(null);
  };

  const addSearchWords = (searchWordCopy) => {
    setSearchWords(searchWordCopy);
  };

  const getRoutes = () => {
    let routes;
    if (token) {
      routes = (
        <Switch>
          <Route path="/my-recipes">
            <MyRecipesPage />
          </Route>
          <Route path="/">
            <LandingPage
              searchWords={searchWords}
              addSearchWords={addSearchWords}
            />
          </Route>
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/signup">
            <SignUpPage signUp={signUp} />
          </Route>
          <Route path="/login">
            <LoginPage logIn={logIn} />
          </Route>
          <Route path="/">
            <LandingPage
              searchWords={searchWords}
              addSearchWords={addSearchWords}
            />
          </Route>
        </Switch>
      );
    }
    return routes;
  };

  return (
    <BrowserRouter>
      <Navbar token={token} logOut={logOut} />
      {getRoutes()}
    </BrowserRouter>
  );
}

export default App;
