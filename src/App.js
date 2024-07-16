import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Login/LoginForm";
import Home from "./Components/Home/Home"; 
import Vehicule from "./Components/Vehicule/Vehicule"; 

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Vehicule" element={<Vehicule />} /> 
        </Routes>
    </Router>
);

export default App;