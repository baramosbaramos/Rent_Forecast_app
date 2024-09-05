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
      {/* ここに半蔵門線を変数として渡す */}
      <Header />

      <ScrollToTop />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/properties">
          {/* ここに半蔵門線を変数として渡す */}
          <Route
            path="tozaisen/:stationID"
            element={<PropetiesByStation rosen="東京メトロ東西線" />}
          />
          <Route
            path="marunouchisen/:stationID"
            element={<PropetiesByStation rosen="東京メトロ丸ノ内線" />}
          />
          <Route
            path="hanzomonsen/:stationID"
            element={<PropetiesByStation rosen="東京メトロ半蔵門線" />}
          />
          <Route
            path="yurakuchosen/:stationID"
            element={<PropetiesByStation rosen="東京メトロ有楽町線" />}
          />
          <Route
            path="ginzasen/:stationID"
            element={<PropetiesByStation rosen="東京メトロ銀座線" />}
          />
          <Route
            path="chiyodasen/:stationID"
            element={<PropetiesByStation rosen="東京メトロ千代田線" />}
          />
          <Route
            path="hibiyasen/:stationID"
            element={<PropetiesByStation rosen="東京メトロ日比谷線" />}
          />
          <Route
            path="nanbokusen/:stationID"
            element={<PropetiesByStation rosen="東京メトロ南北線" />}
          />
          <Route
            path="hukutoshinsen/:stationID"
            element={<PropetiesByStation rosen="東京メトロ副都心線" />}
          />
          <Route index element={<NoMatch />} />
        </Route>
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
