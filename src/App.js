import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Login/LoginForm";
import Home from "./Components/Home/Home";
import Vehicule from "./Components/Vehicule/Vehicule"; 
import Collaborateur from "./Components/Collaborateur/Collaborateur"; 
import Profile from "../src/Components/Profile/profile"; 
import Mission from "./Components/Mission/Mission"; 
import Reservation from "./Components/reservation/reservation"; 
import LoginCollaborateur from "./Components/LoginCollaborateur/LoginCollaborateur"; 
import HomeCollaborateur from "./Components/HomeCollaborateur/HomeCollaborateur"; 
import ReservationMission from "./Components/ReservationMission/ReservationMission";
import ProfileCollaborateur from "./Components/ProfileCollaborateur/ProfileCollaborateur";



const App = () => (
    <Router>
    <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Vehicule" element={<Vehicule />} /> 
        <Route path="/Collaborateur" element={<Collaborateur/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Mission" element={<Mission/>}/>
        <Route path="/Reservation" element={<Reservation/>}/>
        <Route path="/LoginCollaborateur" element={<LoginCollaborateur/>}/>
        <Route path="/HomeCollaborateur" element={<HomeCollaborateur/>}/>
        <Route path="/ReservationMission" element={<ReservationMission/>}/>
        <Route path="/ProfileCollaborateur" element={<ProfileCollaborateur/>}/>
        
    </Routes>
</Router>

);

export default App;