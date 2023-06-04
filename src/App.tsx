import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import TopNav from "./components/TopNav/TopNav";
import WeatherApp from "./components/Dashboard/WeatherApp";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import store from "./components/WeatherRedux/store";
import WishList from "./components/WeatherDetails/WishList";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TopNav />
        <Router>
          <Routes>
            <Route path="/" element={<WeatherApp />} />
            <Route path="/weather-details/:name" element={<WishList />} />
            <Route path="/weatherApp" element={<WeatherApp />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
