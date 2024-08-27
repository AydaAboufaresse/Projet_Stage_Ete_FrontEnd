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
import { Page, Text, View, Document, StyleSheet, BlobProvider, Image } from "@react-pdf/renderer";
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASEURL, saveMission, updateMission, deleteMission, getAllMissions } from '../axios/missionRequests';
import { useNavigate } from "react-router-dom";

const HomeCollaborateur = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    const [missions, setMissions] = useState([]);
    const [selectedMission, setSelectedMission] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/LoginCollaborateur');
        } else {
            const id = JSON.parse(localStorage.getItem('user')).id;
            axios.get(`http://localhost:8087/api/missions/collaborateur/${id}`)
                .then(response => {
                    setMissions(response.data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/LoginCollaborateur");
    };

    const toggleDetailsPopup = (mission) => {
        setSelectedMission(mission);
        setShowDetailsPopup(!showDetailsPopup);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

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
                                            <th>Titre</th>
                                            <th>Description</th>
                                            <th>Mission Longitude</th>
                                            <th>Mission Latitude</th>
                                            <th>Date et Heure Debut</th>
                                            <th>Date et Heure Fin</th>
                                            <th>Statut</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {missions.map(mission => (
                                            <tr key={mission.id}>
                                                <td>{mission.titre}</td>
                                                <td>{mission.description}</td>
                                                <td>{mission.mission_longitude}</td>
                                                <td>{mission.mission_latitude}</td>
                                                <td>{mission.dateDebut}</td>
                                                <td>{mission.dateFin}</td>
                                                <td>{mission.statut}</td>
                                                <td>
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

            {showDetailsPopup && selectedMission && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Détails Mission</h5>
                            </div>
                            <div className="modal-body">
                                <div className="details-section">
                                    <p><strong>Titre :</strong> {selectedMission.titre}</p>
                                    <p><strong>Description :</strong> {selectedMission.description}</p>
                                    <p><strong>Date Debut :</strong> {selectedMission.dateDebut}</p>
                                    <p><strong>Date Fin :</strong> {selectedMission.dateFin}</p>
                                    <p><strong>Latitude :</strong> {selectedMission.mission_latitude}</p>
                                    <p><strong>Longitude :</strong> {selectedMission.mission_longitude}</p>
                                    <p><strong>Statut :</strong> {selectedMission.statut}</p>
                                    <p><strong>Matricule :</strong> {selectedMission.vehicule.immatriculation}</p>
                                    <p><strong>Nom & Prenom du Collaborateur :</strong> {selectedMission.collaborateur.nom} {selectedMission.collaborateur.prenom}</p>
                                </div>
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
