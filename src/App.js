import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header.js";
import PropetiesByStation from "./components/Properties/PropertiesByStation";
import { Routes, Route, useLocation, Router } from "react-router-dom";
import Home from "./components/Home/Home.js";
import NoMatch from "./components/NoMatch/NoMatch.js";
import Contact from "./components/Contact/Contact.js";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <Header />

      <ScrollToTop />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/properties">
          <Route path="tozaisen/:stationID" element={<PropetiesByStation />} />
          <Route index element={<NoMatch />} />
        </Route>
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
