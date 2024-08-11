import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Login/LoginForm";
import Home from "./Components/Home/Home";
import Vehicule from "./Components/Vehicule/Vehicule"; 
import Collaborateur from "./Components/Collaborateur/Collaborateur"; 
import Profile from "../src/Components/Profile/profile"; 
import Mission from "./Components/Mission/Mission"; 
import PrivateRoute from "./Components/PrivateRoute";
import Reservation from "./Components/reservation/reservation"

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/Home" element={<PrivateRoute element={Home} />} />
            <Route path="/Vehicule" element={<PrivateRoute element={Vehicule} />} /> 
            <Route path="/Collaborateur" element={<PrivateRoute element={Collaborateur} />} />
            <Route path="/Profile" element={<PrivateRoute element={Profile} />} />
            <Route path="/Mission" element={<PrivateRoute element={Mission} />} />
            <Route path="/Reservation" element={<PrivateRoute element={Reservation} />} />
        </Routes>
    </Router>
);

export default App;
