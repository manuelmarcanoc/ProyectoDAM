import React, { useState } from "react";
import Login from "./components/Login";
import Menu from "./components/Menu";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {!loggedIn ? (
        <Login onLogin={() => setLoggedIn(true)} />
      ) : (
        <Menu onLogout={() => setLoggedIn(false)} />
      )}
    </div>
  );
}

export default App;
