import React from "react";

import "./App.css";
import TopNav from "./components/TopNav/TopNav";
import WeatherApp from "./components/Dashboard/WeatherApp";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
function App() {
  return (
    <div className="App">
      <TopNav />
      <Router>
        <Routes>
          <Route path="/" element={<WeatherApp />} />
          <Route path="/weather-details/:name" element={<WeatherDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
