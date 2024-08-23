import React, { useState, useEffect } from "react";
import OCPLogo from '../Assets/OCP_Group.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBellFill, BsChevronDown } from "react-icons/bs";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import avatar from '../Assets/pro.png';
import OCPHISTO from '../Assets/OCP_history.jpg';
import { FaFilePdf } from "react-icons/fa6";
import { TbListDetails } from 'react-icons/tb';
import moment from 'moment';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Page, Text, View, Document, StyleSheet, BlobProvider,Image } from "@react-pdf/renderer";
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASEURL, saveMission, updateMission, deleteMission, getAllMissions } from '../axios/missionRequests';

const HomeCollaborateur = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [collaborateurs, setCollaborateur] = useState('');
    const [selectedMission, setSelectedMission] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [missions, setMissions] = useState([]);
    const [oldMatricule, setOldMatricule] = useState(null);
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        dateDebut: '',
        dateFin: '',
        description: '',
        statut:'',
        titre: '',
        collaborateur: {id : ""},
        vehicule: {vehiculeId : ""},
        mission_longitude: '',
        mission_latitude: ''
    });
    const [mission, setMission] = useState({
        dateDebut: '',
        dateFin: '',
        description: '',
        statut:'',
        titre: '',
        collaborateur: {id : ""},
        vehicule: {vehiculeId : ""},
        mission_longitude: '',
        mission_latitude: ''
    });
    useEffect(() => {
        async function fetchVehicles() {
            try {
                const response = await fetch("http://localhost:8087/api/");
                const data = await response.json();
                const availableVehicles = data.filter(vehicle => vehicle.status !== 1); 
                setVehicles(availableVehicles);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        }
        fetchVehicles();
    }, []);
    
    useEffect(() => {
        async function fetchCollaborateurs() {
            try {
                const response = await fetch("http://localhost:8087/api/collaborateur/");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCollaborateur(data);
            } catch (error) {
                console.error("Error fetching collaborateurs:", error);
            }
        }
        fetchCollaborateurs();
    }, []);

    const toggleDetailsPopup = (mission) => {
        setMission(mission);
        setShowDetailsPopup(!showDetailsPopup);
    };
    
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

  
    useEffect(() => {
        const fetchMissions = async () => {
            const response = await axios.get(`${BASEURL}`);
            setMissions(response.data);
        };
        fetchMissions();
    }, []);

  
    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header__logo">
                                <img src={OCPLogo} alt="OCP Logo" className="logo" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu d-flex justify-content-center">
                                <ul className="d-flex mb-0">
                                    <li className="active"><a href="/HomeCollaborateur">Missions</a></li>
                                    <li><a href="/ReservationMission">Reservation</a></li>
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
                                            <img src={avatar} alt="User Avatar" className="avatar" />
                                            <BsChevronDown className="arrow" />
                                        </a>
                                        {showDropdown && (
                                            <ul className="dropdown-menu">
                                                <li><a href="/ProfileCollaborateur">Profile</a></li>
                                                <li><a href="#">Déconnexion</a></li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="breadcrumb-section" style={{ backgroundImage: `url(${OCPHISTO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Vos Missions</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table__Mission-container">
                                <table className="shoping__cart__table__Mission">
                                    <thead>
                                        <tr>
                                            <th className="shoping__Mission">Titre</th>
                                            <th>Description</th>
                                            <th>Mission longitude</th>
                                            <th>Mission latitude</th>
                                            <th>Date et heure debut</th>
                                            <th>Date et heure fin</th>
                                            <th>Collaborateur</th>
                                            <th>Matricule</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {missions.map(mission => (
                                        <tr key={mission.id}>
                                            <td className="shoping__cart__item">
                                                <h5 name="nompre_collaborateur"></h5>
                                            </td>
                                            <td className="shoping__cart__description">
                                            
                                            </td>
                                            <td className="shoping__cart__tel"></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="shoping__cart__item__close">
                                                    <TbListDetails
                                                        style={{ cursor: 'pointer', fontSize: '18px', color: '#b2b2b2' }}
                                                        onClick={() => toggleDetailsPopup(mission)}
                                                    />
                                                    <button className="btn btn-success" style={{ marginLeft: '5px', padding: '4px 8px', fontSize: '9px' }}>Mission Realiser</button>
                                            </td>
                                        
                                        </tr>
                                     ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>

           
            {showDetailsPopup && (
    <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Détails Mission</h5>
                </div>
                <div className="modal-body">
                    {mission && ( 
                        <div className="details-section">
                            <p><strong>Titre :</strong></p>
                            <p><strong>Description :</strong> </p>
                            <p><strong>Date Debut :</strong> </p>
                            <p><strong>Date Fin :</strong> </p>
                            <p><strong>Latitude :</strong> </p>
                            <p><strong>Longtitude :</strong> </p>
                            <p><strong>Statut :</strong> </p>
                            <p><strong>Matricule :</strong> </p>
                            <p><strong>Nom & Prenom du Collaborateur :</strong> </p>
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => toggleDetailsPopup(null)}>Fermer</button>
                    
                </div>
            </div>
        </div>
    </div>
)}
        </div>
    );
    
};

export default HomeCollaborateur;
