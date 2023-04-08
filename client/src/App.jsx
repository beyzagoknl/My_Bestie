import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "../src/components/Nav/Nav";
import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import AppWrapper from "./AppWrapper";

const App = () => {
  return (
    <AppWrapper className="app-container">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </AppWrapper>
  );
};

export default App;
