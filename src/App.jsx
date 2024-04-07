import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import DetailsForm from './components/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path="/footer" element={<Footer />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/userDetails" element={<DetailsForm />} />
        <Route exact path="*" />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
