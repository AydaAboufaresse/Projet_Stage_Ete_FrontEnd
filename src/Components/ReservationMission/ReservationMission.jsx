import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import OCPLogo from '../Assets/OCP_Group.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBellFill, BsChevronDown } from "react-icons/bs";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import avatar from '../Assets/pro.png';
import OCPHISTO from '../Assets/OCP_history.jpg';
import { FaFilePdf } from "react-icons/fa6";
import { TbListDetails } from 'react-icons/tb';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';

const ReservationMission = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    const [collaboratorId, setCollaboratorId] = useState(null);
    const [missions, setMissions] = useState([]);
    const [selectedMission, setSelectedMission] = useState(null);
    const [reservedMissions, setReservedMissions] = useState(new Set());

    // Toggle dropdown menu
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Toggle mission details popup
    const toggleDetailsPopup = (mission) => {
        setSelectedMission(mission);
        setShowDetailsPopup(!showDetailsPopup);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/LoginCollaborateur");
    };

    // Fetch missions and collaborator ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const missionsResponse = await axios.get('http://localhost:8087/api/missions/no-collaborateur');
                setMissions(missionsResponse.data);

                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/LoginCollaborateur');
                    return;
                }

                const username = JSON.parse(localStorage.getItem('user')).username;
                const collaboratorResponse = await axios.get(`http://localhost:8087/api/utilisateur/username/${username}`);
                setCollaboratorId(collaboratorResponse.data.id);
            } catch (error) {
                console.error("Error fetching data", error);
                Swal.fire('Erreur', 'Une erreur est survenue lors de la récupération des données.', 'error');
            }
        };

        fetchData();
    }, [navigate]);

    // Handle reservation
    const handleReservation = async (missionId) => {
    if (!collaboratorId) {
        Swal.fire('Erreur', 'Collaborateur non trouvé', 'error');
        return;
    }

    console.log('Attempting reservation with missionId:', missionId, 'and collaboratorId:', collaboratorId);

    try {
        const response = await axios.post('http://localhost:8087/api/reservations', {
            collaborateur: { id: collaboratorId },
            mission: { id: missionId }
        });
        console.log('Reservation response:', response.data);
        Swal.fire('Succès', 'Réservation effectuée avec succès', 'success');
        setReservedMissions((prevReservedMissions) => new Set(prevReservedMissions).add(missionId));
    } catch (error) {
        console.error("Error making reservation", error);
        Swal.fire('Erreur', 'Échec de la réservation', 'error');
    }
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
                                    <li><a href="/HomeCollaborateur">Missions</a></li>
                                    <li className="active"><a href="/ReservationMission">Réservation</a></li>
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
                                <h2>Réservation</h2>
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
                                            <th>Mission Longitude</th>
                                            <th>Mission Latitude</th>
                                            <th>Date et Heure Début</th>
                                            <th>Date et Heure Fin</th>
                                            <th>Collaborateur</th>
                                            <th>Matricule</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {missions.map(mission => (
                                            <tr key={mission.id}>
                                                <td className="shoping__cart__item">
                                                    <h5>{mission.titre}</h5>
                                                </td>
                                                <td className="shoping__cart__description">
                                                    {mission.description}
                                                </td>
                                                <td>{mission.mission_longitude}</td>
                                                <td>{mission.mission_latitude}</td>
                                                <td>{mission.dateDebut}</td>
                                                <td>{mission.dateFin}</td>
                                                <td>{mission.collaborateur 
                ? `${mission.collaborateur.nom || 'N/A'} ${mission.collaborateur.prenom || 'N/A'}`
                : 'Collaborateur pas disponible'
            }</td>
                                                <td>{mission.vehicule.immatriculation}</td>
                                                <td className="shoping__cart__item__close">
                                                    <TbListDetails
                                                        style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '18px', color: '#b2b2b2' }}
                                                        onClick={() => toggleDetailsPopup(mission)}
                                                    />
                                                    {!reservedMissions.has(mission.id) && (
        <button 
            className="btn btn-success" 
            style={{ marginLeft: '5px', padding: '4px 8px', fontSize: '9px' }}
            onClick={() => handleReservation(mission.id)}
        >
            Réserver
        </button>
    )}
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
                                {selectedMission && (
                                    <div className="details-section">
                                        <p><strong>Titre :</strong> {selectedMission.titre}</p>
                                        <p><strong>Description :</strong> {selectedMission.description}</p>
                                        <p><strong>Date Début :</strong> {moment(selectedMission.dateDebut).format('DD/MM/YYYY HH:mm')}</p>
                                        <p><strong>Date Fin :</strong> {moment(selectedMission.dateFin).format('DD/MM/YYYY HH:mm')}</p>
                                        <p><strong>Latitude :</strong> {selectedMission.mission_latitude}</p>
                                        <p><strong>Longitude :</strong> {selectedMission.mission_longitude}</p>
                                        <p><strong>Statut :</strong> {selectedMission.statut}</p>
                                        <p><strong>Matricule :</strong> {selectedMission.vehicule.immatriculation}</p>
                                        <p><strong>Nom & Prénom du Collaborateur :</strong> {selectedMission.collaborateur 
                ? `${selectedMission.collaborateur.nom || 'N/A'} ${selectedMission.collaborateur.prenom || 'N/A'}`
                : 'Collaborateur pas disponible'
            }</p>
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

export default ReservationMission;
