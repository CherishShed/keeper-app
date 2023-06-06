import './App.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="blogs" />
        <Route path="contact" />
        <Route path="*" />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
