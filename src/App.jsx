import './App.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Footer from './components/Footer';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path="/footer" element={<Footer />} />
        <Route exact path="contact" />
        <Route exact path="*" />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
