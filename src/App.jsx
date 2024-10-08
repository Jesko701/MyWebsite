import { Route, Routes, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home";
import "./css/App.css";
import NavbarComponent from "./components/NavbarComponent";
import User from "./Context/User";
import data from "../json/paragraph.json";

function App() {
  const location = useLocation();

  const [paragraph, setParagraph] = useState(data.content);

  function renderNavbar(path) {
    switch (path) {
      case "/":
        return <NavbarComponent />;
      default:
        return null;
    }
  }

  return (
    <React.Fragment>
      <div className="app">
        {renderNavbar(location.pathname)}
        <User.Provider value={{ paragraph }}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </User.Provider>
      </div>
    </React.Fragment>
  );
}

export default App;
