import './App.css';
import "./auth.css"
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Footer from './components/Footer';
import Login from './components/Login';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path="/footer" element={<Footer />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="*" />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
