import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const signUp = (email, password) => {
    console.log("email:", email);
    console.log("password:", password);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/signup">
          <SignUpPage signUp={signUp} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
