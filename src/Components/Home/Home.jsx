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
import 'leaflet-routing-machine';
import Swal from 'sweetalert2';

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
    const [searchTitle, setSearchTitle] = useState("");
    const navigate = useNavigate();
    const mapRef = useRef();
    const routingControlRef = useRef(null);
    const markersRef = useRef({});

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

    const searchMissions = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8087/api/missions/search?title=${searchTitle}`);
            if (response.data.length > 0) {
                handleMissionClick(response.data[0]);
            } else { Swal.fire({
                title: 'Mission non trouvée',
                text: "Aucune mission trouvée avec ce titre.",
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            }
        } catch (error) {
            console.error("Error searching missions", error);
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
        setSelectedMission(mission);

        if (mapRef.current) {
            const map = mapRef.current;
            map.setView([mission.mission_latitude, mission.mission_longitude], 13);

            if (routingControlRef.current) {
                routingControlRef.current.getPlan().setWaypoints([]);
                map.removeControl(routingControlRef.current);
            }

            routingControlRef.current = L.Routing.control({
                waypoints: [
                    L.latLng(32.232157, -9.252964), // Starting point
                    L.latLng(mission.mission_latitude, mission.mission_longitude) // Mission location
                ],
                show: false,
                addWaypoints: false,
                routeWhileDragging: true,
                draggableWaypoints: false,
                fitSelectedRoutes: true,
                showAlternatives: false,
            }).addTo(map);

            // Open the popup for the selected mission
            const marker = markersRef.current[mission.id];
            if (marker) {
                marker.openPopup();
            }
        }
    };

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
                                        {missions.map(mission => (
                                            <li key={mission.id} onClick={() => handleMissionClick(mission)}>
                                                <a href="#">{mission.titre}</a> 
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="hero__search">
                                <div className="hero__search__form">
                                    <form onSubmit={searchMissions}>
                                        <div className="hero__search__categories">
                                            Les Missions
                                            <span className="arrow_carrot-down"></span>
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="Où est situé le mission ?" 
                                            value={searchTitle} 
                                            onChange={(e) => setSearchTitle(e.target.value)} 
                                        />
                                        <button type="submit" className="site-btn">Recherche</button>
                                    </form>
                                </div>
                            </div>
                            <div className="map">
                                <MapContainer 
                                    center={[31.7917, -7.0926]} 
                                    zoom={10} 
                                    scrollWheelZoom={false}
                                    ref={mapRef}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {missions.map(mission => (
                                        <Marker 
                                            key={mission.id}
                                            position={[mission.mission_latitude, mission.mission_longitude]}
                                            eventHandlers={{
                                                click: () => {
                                                    handleMissionClick(mission);
                                                },
                                            }}
                                            ref={el => markersRef.current[mission.id] = el}
                                        >
                                            <Popup>
                                                <strong>Titre:</strong> {mission.titre} <br />
                                                <strong>Description:</strong> {mission.description} <br />
                                                <strong>Date Debut:</strong> {new Date(mission.dateDebut).toLocaleDateString()} <br />
                                                <strong>Date Fin:</strong> {new Date(mission.dateFin).toLocaleDateString()} <br />
                                                <strong>Collaborateur:</strong>{mission.collaborateur ? `${mission.collaborateur.nom || 'N/A'} ${mission.collaborateur.prenom || 'N/A'}`: 'Collaborateur pas disponible'} <br />
                                                <strong>Matricule Véhicule:</strong> {mission.vehicule.immatriculation}
                                            </Popup>
                                        </Marker>
                                    ))}
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
