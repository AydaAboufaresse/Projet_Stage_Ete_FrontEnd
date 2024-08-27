import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BsBellFill, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import OCPLogo from '../Assets/OCP_Group.png';
import avatar from '../Assets/pro.png';
import { FaTrashAlt } from "react-icons/fa";
import OCPHISTO from '../Assets/Train.jpg';
import './resevation.css';
import { Await, useNavigate } from "react-router-dom";

const Reservation = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [ongoingMissions, setOngoingMissions] = useState([]);
    const [filter, setFilter] = useState("all");

    // Fonction pour récupérer les réservations
    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:8087/api/reservations');
            setReservations(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des réservations", error);
        }
    };

    // Fonction pour récupérer les missions en attente
    const fetchOngoingMissions = async () => {
        try {
            const response = await axios.get('http://localhost:8087/api/reservations/status?status=-1');
            setOngoingMissions(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des missions en cours", error);
        }
    };

    useEffect(() => {
        fetchReservations();
        fetchOngoingMissions();
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };
    
    const handleMissionClick = (reservation) => {
        Swal.fire({
            title: `Accepter ou Refuser la réservation pour`,
            text: `
                Titre de la Mission: ${reservation.mission.titre}
                Collaborateur: ${reservation.collaborateur.nom} ${reservation.collaborateur.prenom}
            `,
            showCancelButton: true, 
            confirmButtonText: 'Accepter',
            cancelButtonText: 'Refuser',
            showCloseButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleAccept(reservation.id); 
                fetchOngoingMissions();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                await handleReject(reservation.id); // Passe l'ID de la réservation
                fetchOngoingMissions();
            }
        });
    };

    const handleAccept = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8087/api/reservations/${id}/accept`);
            if (response.status === 200) {
                Swal.fire('Accepté!', 'La réservation a été acceptée.', 'success');
                await fetchReservations(); // Mettre à jour les réservations
            }
        } catch (error) {
            console.error("Erreur lors de l'acceptation de la réservation", error);
            Swal.fire('Erreur', 'Une erreur est survenue lors de l\'acceptation de la réservation.', 'error');
        }
    };
    
    const handleReject = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8087/api/reservations/${id}/reject`);
            if (response.status === 200) {
                Swal.fire('Refusé!', 'La réservation a été refusée.', 'success');
                await fetchReservations(); // Mettre à jour les réservations
            }
        } catch (error) {
            console.error("Erreur lors du refus de la réservation", error);
            Swal.fire('Erreur', 'Une erreur est survenue lors du refus de la réservation.', 'error');
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Cette action ne peut pas être annulée!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:8087/api/reservations/${id}`);
                    if (response.status === 200) {
                        Swal.fire('Supprimé!', 'La réservation a été supprimée.', 'success');
                        
                        // Manually update the reservations state
                        setReservations((prevReservations) =>
                            prevReservations.filter((reservation) => reservation.id !== id)
                        );
    
                    }
                    try {
                        const response = await axios.get('http://localhost:8087/api/reservations');
                        setReservations(response.data);
                    } catch (error) {
                        console.error("Erreur lors de la récupération des réservations", error);
                    }
                } catch (error) {
                    console.error("Erreur lors de la suppression de la réservation", error);
                    Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression de la réservation.', 'error');
                }
            }
        });
    };
    
    const filteredReservations = reservations.filter((res) =>
        filter === "all" || res.statut === parseInt(filter)
    );

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/");
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
                                    <li><a href="/Home">Home</a></li>
                                    <li><a href="/Mission">Missions</a></li>
                                    <li><a href="/Collaborateur">Collaborateurs</a></li>
                                    <li><a href="/Vehicule">Vehicules</a></li>
                                    <li className="active"><a href="/Reservation">Reservation</a></li>
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
            <section className="breadcrumb-section" style={{ backgroundImage: `url(${OCPHISTO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Reservation Mission OCP GROUP</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="heroj">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="hero__categories">
                                <div className="hero__categories__all" onClick={toggleCategories}>
                                    <FaBars className="bar-icon" />
                                    <span>En cours </span>
                                    {showCategories ? <BsChevronUp className="arrowad" /> : <BsChevronDown className="arrowad" />}
                                </div>
                                {showCategories && (
                                   <ul>
                                   {ongoingMissions.map((reservation) => (
                                       <li key={reservation.id} onClick={() => handleMissionClick(reservation)}>
                                           <a href="#">{reservation.mission.titre}</a>
                                       </li>
                                   ))}
                               </ul>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="hero__searche">
                                <div className="hero__search__forme">
                                    <div className="filterreservation">
                                        <span>Filter par Reservation</span>
                                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                                            <option value="all">Tous</option>
                                            <option value="1">Accepter</option>
                                            <option value="0">Refuser</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <section className="shoping-cart spad">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="shoping__cart__table__Mission-container">
                                                <table className="shoping__cart__table__Mission">
                                                    <thead>
                                                        <tr>
                                                            <th className="shoping__Mission">Titre Mission</th>
                                                            <th className="shoping__Mission">Collaborateur</th>
                                                            <th className="shoping__Mission">Matricule</th>
                                                            <th className="shoping__status">Statut</th>
                                                            <th className="shoping__action"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredReservations.map((reservation) => (
                                                            <tr key={reservation.id}>
                                                                <td>{reservation.mission.titre}</td>
                                                                <td>{reservation.collaborateur.nom} {reservation.collaborateur.prenom}</td>
                                                                <td>{reservation.mission.vehicule.immatriculation}</td>
                                                                <td>{reservation.statut === 1 ? 'Accepté' : reservation.statut === 0 ? 'Refusé' : 'En Attente'}</td>
                                                                <td>
                                                                    <FaTrashAlt
                                                                        style={{ cursor: "pointer",fontSize: '18px', color: '#b2b2b2'  }}
                                                                        onClick={() => handleDelete(reservation.id)}
                                                                    />
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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Reservation;

                                           
