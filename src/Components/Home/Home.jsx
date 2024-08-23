import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import OCPLogo from '../Assets/OCP_Group.png';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBellFill, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import avatar from '../Assets/pro.png';
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const DefaultIcon = L.icon({
    iconUrl: require('../Assets/live-location.png'), 
    iconSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Home = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [missions, setMissions] = useState([]); 
    const [selectedMission, setSelectedMission] = useState(null); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const navigate = useNavigate();
    const mapRef = useRef(); 
    const defaultPosition = [31.7917, -7.0926]; 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            fetchMissions(); 
        }
    }, [navigate]);

    const fetchMissions = async () => {
        try {
            const response = await axios.get('http://localhost:8087/api/missions'); 
            setMissions(response.data); 
        } catch (error) {
            console.error("Error fetching missions", error);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/");
    };

    const handleMissionClick = (mission) => {
        console.log("Mission details:", mission);
        setSelectedMission(mission);
        
        if (mapRef.current) {
            mapRef.current.setView([mission.mission_latitude, mission.mission_longitude], 13);
        }
    };

    // Fonction pour gérer le changement de l'entrée de recherche
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtrer les missions en fonction du terme de recherche
    const filteredMissions = missions.filter(mission =>
        mission.titre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header__logo">
                                <img src={OCPLogo} alt="OCP Logo" className="logo"/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu d-flex justify-content-center">
                                <ul className="d-flex mb-0">
                                    <li className="active"><a href="/Home">Home</a></li>
                                    <li><a href="/Mission">Missions</a></li>
                                    <li><a href="/Collaborateur">Collaborateurs</a></li>
                                    <li><a href="/Vehicule">Vehicules</a></li>
                                    <li><a href="/Reservation">Reservation</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="header__cart">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <div className="icon"><BsBellFill /></div>
                                            <span>1</span>
                                        </a>
                                    </li>
                                    <li className="dropdown">
                                        <a href="#" onClick={toggleDropdown}>
                                            <img src={avatar} alt="User Avatar" className="avatar"/>
                                            <BsChevronDown className="arrow" />
                                        </a>
                                        {showDropdown && (
                                            <ul className="dropdown-menu">
                                                <li><a href="/Profile">Profile</a></li>
                                                <li><a onClick={handleLogout}>Déconnexion</a></li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="hero__categories">
                                <div className="hero__categories__all" onClick={toggleCategories}>
                                    <FaBars className="bar-icon" />
                                    <span>Tous les Missions</span>
                                    {showCategories ? <BsChevronUp className="arrowad" /> : <BsChevronDown className="arrowad" />}
                                </div>
                                {showCategories && (
                                    <ul>
                                        {filteredMissions.map(mission => ( // Utilisation des missions filtrées
                                            <li key={mission.id} onClick={() => handleMissionClick(mission)}>
                                                <a href="#">{mission.description}</a> 
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="hero__search">
                                <div className="hero__search__form">
                                    <form action="#">
                                        <div className="hero__search__categories">
                                            Les Missions
                                            <span className="arrow_carrot-down"></span>
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="Rechercher par titre de mission..." 
                                            value={searchTerm} 
                                            onChange={handleSearchChange} 
                                        />
                                        <button type="submit" className="site-btn">Recherche</button>
                                    </form>
                                </div>
                            </div>
                            <div className="map">
                                <MapContainer 
                                    center={selectedMission ? [selectedMission.mission_latitude, selectedMission.mission_longitude] : defaultPosition} 
                                    zoom={selectedMission ? 13 : 10} 
                                    scrollWheelZoom={false}
                                    ref={mapRef}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {filteredMissions.map(mission => ( // Utilisation des missions filtrées
                                        <Marker 
                                            key={mission.id}
                                            position={[mission.mission_latitude, mission.mission_longitude]}
                                            eventHandlers={{
                                                click: () => handleMissionClick(mission),
                                            }}
                                        >
                                            <Popup>
                                                <strong>Titre:</strong> {mission.titre} <br />
                                                <strong>Description:</strong> {mission.description} <br />
                                                <strong>Date Debut:</strong> {new Date(mission.dateDebut).toLocaleDateString()} <br />
                                                <strong>Date Fin:</strong> {new Date(mission.dateFin).toLocaleDateString()} <br />
                                                <strong>Collaborateur:</strong> {mission.collaborateur.nom} {mission.collaborateur.prenom} <br />
                                                <strong>Matricule Véhicule:</strong> {mission.vehicule.immatriculation}
                                            </Popup>
                                        </Marker>
                                    ))}
                                    {selectedMission && (
                                        <Popup
                                            position={[selectedMission.mission_latitude, selectedMission.mission_longitude]}
                                            onClose={() => setSelectedMission(null)}
                                        >
                                            <div>
                                                <strong>Titre:</strong> {selectedMission.titre} <br />
                                                <strong>Description:</strong> {selectedMission.description} <br />
                                                <strong>Date Debut:</strong> {new Date(selectedMission.dateDebut).toLocaleDateString()} <br />
                                                <strong>Date Fin:</strong> {new Date(selectedMission.dateFin).toLocaleDateString()} <br />
                                                <strong>Collaborateur:</strong> {selectedMission.collaborateur.nom} {selectedMission.collaborateur.prenom} <br />
                                                <strong>Matricule Véhicule:</strong> {selectedMission.vehicule.immatriculation}
                                            </div>
                                        </Popup>
                                    )}
                                </MapContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
