import React, { useState } from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Dashboard/Home";

function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" && <Login onLogin={() => setPage("home")} />}
      {page === "register" && <Register onRegister={() => setPage("home")} />}
      {page === "home" && <Home />}
    </>
  );
}

export default App;
