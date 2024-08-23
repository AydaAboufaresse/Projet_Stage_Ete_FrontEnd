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


const ReservationMission = () => {
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
    const handleInputChangecollab = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            collaborateur: {
                ...prevState.collaborateur,
                id: value
            }
        }));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "vehicule.vehiculeId") {
            // Pour le champ matricule, mettez à jour `formData` correctement
            setFormData(prevState => ({
                ...prevState,
                vehicule: { vehiculeId: value }
            }));
        } else {
            // Pour les autres champs
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
           
            const response = await axios.put(`${BASEURL}/${selectedMission.id}`, formData);
            if (oldMatricule && formData.vehicule.vehiculeId !== oldMatricule) {
                await axios.put(`http://localhost:8087/api/vehicule/${oldMatricule}/status`, {
                    status: 0,
                });
    
                await axios.put(`http://localhost:8087/api/vehicule/${formData.vehicule.vehiculeId}/status`, {
                    status: 1,
                });
            } else if (formData.vehicule.vehiculeId !== oldMatricule) {
                await axios.put(`http://localhost:8087/api/vehicule/${formData.vehicule.vehiculeId}/status`, {
                    status: 1,
                });
            }
    
            const missionsResponse = await axios.get(`${BASEURL}`);
            setMissions(missionsResponse.data);
            try {
                const response = await fetch("http://localhost:8087/api/");
                const data = await response.json();
                const availableVehicles = data.filter(vehicle => vehicle.status !== 1);
                setVehicles(availableVehicles);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
            setShowEditModal(false); 
    
            Swal.fire({
                title: "Mis à jour!",
                text: "Le véhicule a été mis à jour.",
                icon: "success"
            });
    
        } catch (error) {
            console.error('Error editing vehicle:', error);
            Swal.fire({
                title: "Erreur!",
                text: "Il y a eu un problème lors de la mise à jour du véhicule.",
                icon: "error"
            });
        }
    };

    const handleMatriculeChange = async (e) => {
        const selectedMatricule = e.target.value;
        setMission(prevState => ({
            ...prevState,
            vehicule: { vehiculeId: selectedMatricule }
        }));
    
        try {
            const updatedVehicle = await updateVehicleStatus(selectedMatricule, 1);
            if (updatedVehicle) {
                setVehicles(prevVehicles =>
                    prevVehicles.map(vehicle =>
                        vehicle.vehiculeId === selectedMatricule
                            ? { ...vehicle, status: updatedVehicle.status }
                            : vehicle
                    )
                );
            }
        } catch (error) {
            console.error('Failed to update vehicle status:', error);
            Swal.fire({
                title: "Erreur!",
                text: "Il y a eu un problème lors de la mise à jour du véhicule.",
                icon: "error"
            });
        }
    };
    async function updateVehicleStatus(vehicleId, status) {
        try {
            const response = await axios.put(`http://localhost:8087/api/vehicule/${vehicleId}/status`, {
                status: status
            });
            console.log('Vehicle status updated:', response.data);
        } catch (error) {
            console.error('Failed to update vehicle status:', error);
        }
    }
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleEditCancel = () => {
        setShowEditModal(false);
    };
    const toggleEditModal = (mission = null) => {
        if (mission) {
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                return date.toISOString().slice(0, 16); 
            };
            setFormData({
                ...mission,
                dateDebut: formatDate(mission.dateDebut),
                dateFin: formatDate(mission.dateFin),
                vehicule: { vehiculeId: mission.vehicule.vehiculeId },
                collaborateur: { id: mission.collaborateur.id}
            });
            setSelectedMission(mission);
            setOldMatricule(mission.vehicule.vehiculeId);
        }
        setShowEditModal(!showEditModal);
    };

    const toggleDeleteModal = async (mission) => {
        setSelectedMission(mission); 
        console.log('Selected Mission:', mission);
        
        const result = await Swal.fire({
            title: "Êtes-vous sûr ??",
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, supprimez-le !"
        });
        
        if (result.isConfirmed) {
            try {
                await deleteMission(mission.id);
                Swal.fire({
                    title: "Supprimé !",
                    text: "Votre Mission a été supprimé.",
                    icon: "success"
                });
            const response = await axios.get(`${BASEURL}`);
            setMissions(response.data);
            try {
                const response = await fetch("http://localhost:8087/api/");
                const data = await response.json();
                const availableVehicles = data.filter(vehicle => vehicle.status !== 1);
                setVehicles(availableVehicles);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
                
            } catch (error) {
                console.error('Error deleting mission:', error);
                Swal.fire({
                    title: "Erreur!",
                    text: "Il y a eu un problème lors de la suppression du mission.",
                    icon: "error"
                });
            }
        }
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Mission added");
        toggleModal();
    };
    const handlePositionSelect = (latlng) => {
        setLongitude(latlng.lng);
        setLatitude(latlng.lat);
        setFormData(prevState => ({
            ...prevState,
            mission_latitude: latlng.lat,
            mission_longitude: latlng.lng
        }));
    };
    const LocationMarker = ({ onPositionSelect }) => {
        useMapEvents({
            click(e) {
                onPositionSelect(e.latlng);
            },
        });
        return (
            longitude && latitude && (
                <Marker position={[latitude, longitude]}>
                    <Popup>
                        Latitude: {latitude}<br />Longitude: {longitude}
                    </Popup>
                </Marker>
            )
        );
    };
    const handleTextFieldChange = (event) => {
        const { name, value } = event.target;
        setMission(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    useEffect(() => {
        const fetchMissions = async () => {
            const response = await axios.get(`${BASEURL}`);
            setMissions(response.data);
        };
        fetchMissions();
    }, []);

    const handleSubmitMission = async () => {
        if (!moment(mission.dateFin).isSameOrAfter(moment(mission.dateDebut))) {
            Swal.fire({
                title: "Erreur!",
                text: "La date de fin doit être après la date de début.",
                icon: "error"
            });
            return;
        }
    
        console.log("Mission Data before saving:", mission);
        const missionData = {
            ...mission,
            mission_longitude: longitude,
            mission_latitude: latitude,
        };
        console.log("Mission Data before2 saving:", missionData);
        try {
            const response = await saveMission(missionData);
            if (response === 200) {
                setMission({
                    dateDebut: "",
                    dateFin: "",
                    description: "",
                    statut: "",
                    titre: "",
                    collaborateur: {id: ""},
                    vehicule: {vehiculeId : ""},
                    mission_longitude: "",
                    mission_latitude: "",
                });
                setLongitude('');
                setLatitude('');
                const missionsResponse = await axios.get(`${BASEURL}`);
                setMissions(missionsResponse.data);
                try {
                    const response = await fetch("http://localhost:8087/api/");
                    const data = await response.json();
                    const availableVehicles = data.filter(vehicle => vehicle.status !== 1);
                    setVehicles(availableVehicles);
                } catch (error) {
                    console.error("Error fetching vehicles:", error);
                }
                setShowModal(false);
                Swal.fire({
                    icon: "success",
                    title: "Votre mission a été enregistrée",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Échec",
                    text: "Une erreur s'est produite lors de l'enregistrement de la mission.",
                });
            }
        } catch (error) {
            console.error("Error saving mission:", error);
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Une erreur s'est produite lors de l'enregistrement de la mission.",
            });
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
                                    <li ><a href="/HomeCollaborateur">Missions</a></li>
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
                                                <h5 name="nompre_collaborateur">{mission.titre}</h5>
                                            </td>
                                            <td className="shoping__cart__description">
                                            {mission.description}
                                            </td>
                                            <td className="shoping__cart__tel">{mission.mission_longitude}</td>
                                            <td>{mission.mission_latitude}</td>
                                            <td>{mission.dateDebut}</td>
                                            <td>{mission.dateFin}</td>
                                            <td>{mission.collaborateur.nom} {mission.collaborateur.prenom}</td>
                                            <td>{mission.vehicule.immatriculation}</td>
                                            <td className="shoping__cart__item__close">
                                                <FaTrashAlt
                                                    style={{ cursor: 'pointer', fontSize: '18px', color: '#b2b2b2' }}
                                                    onClick={() => {
                                                        toggleDeleteModal(mission);
                                                    }}
                                                />
                                                <FaRegEdit
                                                    style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '18px', color: '#b2b2b2' }}
                                                    onClick={() => {
                                                        toggleEditModal(mission);
                                                    }}
                                                />
                                                
                                                <TbListDetails
                                                    style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '18px', color: '#b2b2b2' }}
                                                    onClick={() => toggleDetailsPopup(mission)}
                                                />
                                            </td>
                                        </tr>
                                     ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__btns">
                                <button onClick={toggleModal} className="btn btn-primary custom-btn-primary" style={{ backgroundColor: '#7fad39' }}>
                                    Ajouter Mission
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showModal && <div className="modal-backdrop fade show"></div>}
{showModal && (
    <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Ajouter Mission</h5>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                        <input
    type="text"
    className="form-control"
    name="titre" 
    value={mission.titre} 
    onChange={handleTextFieldChange} 
    placeholder="Titre"
    required
/>
                        </div>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                name="description"
                                value={mission.description}
                                onChange={handleTextFieldChange}
                                placeholder="Description"
                                rows="3"
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="longitude"
                                value={longitude}
                                onChange={handleTextFieldChange}
                                placeholder="Mission longitude"
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="latitude"
                                value={latitude}
                                onChange={handleTextFieldChange}
                                placeholder="Mission latitude"
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <MapContainer
                                center={[32.26855544621476, -9.231295309978055]}
                                zoom={13}
                                style={{ height: '400px', width: '100%' }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <LocationMarker onPositionSelect={handlePositionSelect} />
                            </MapContainer>
                        </div>
                        <div className="form-group">
                            <label>Date et heure debut</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="dateDebut"
                                value={mission.dateDebut}
                                min={moment().format("YYYY-MM-DDTHH:mm")}
                                onChange={handleTextFieldChange}
                                required
                            />
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        </div>
                        <div className="form-group">
                            <label>Date et heure fin</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="dateFin"
                                min={moment().format("YYYY-MM-DDTHH:mm")}
                                value={mission.dateFin}
                                onChange={handleTextFieldChange}
                                required
                            />
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        </div>
                        <div className="form-group">
                        <input
    type="text"
    className="form-control"
    name="collaborator" 
    value={mission.collaborateur.nom}
    required
/> </div>
                        <div className="form-group">
    <select
        className="form-control"
        name="matricule"
        onChange={handleMatriculeChange}
        value={mission.vehiculeId}
        required
    >
        <option value="">Choisir Matricule</option>
        {vehicles.map(vehicle => (
            <option key={vehicle.vehiculeId}value={vehicle.vehiculeId} >
                {vehicle.immatriculation}
            </option>
        ))}
    </select>
</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                                Fermer
                            </button>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmitMission} style={{ backgroundColor: '#7fad39' }}>
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
)}
 
            {showModal && <div className="modal-backdrop fade show"></div>}
            {showEditModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modifier Mission</h5>
                                
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleEditSubmit}>
                                    <div className="form-group">
                                    <input 
                                    type="text"
                                    className="form-control"
                                    name="titre"
                                    value={formData.titre}
                                    onChange={handleInputChange}
                                    placeholder="Titre"
                                    />
                                    </div>
                                    <div className="form-group">
                                    <textarea
                                    className="form-control"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"
                                    rows="3"
                                    />
                                    </div>
                                    <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="mission_longitude"
                                    value={formData.mission_longitude}
                                    onChange={handleInputChange}
                                    placeholder="Mission longitude"
                                    readOnly
                                    />
                                    </div>
                                    <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="mission_latitude"
                                    value={formData.mission_latitude}
                                    onChange={handleInputChange}
                                    placeholder="Mission latitude"
                                    readOnly
                                    />
                                    </div>
                                    <div className="form-group">
                                        <MapContainer center={[32.26855544621476, -9.231295309978055]} zoom={13} style={{ height: '400px', width: '100%' }}>
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            <LocationMarker
                                                onPositionSelect={handlePositionSelect}
                                                latitude={latitude}
                                                longitude={longitude}
                                            /> 
                                        </MapContainer>
                                    </div>
                                    <div className="form-group">
                            <label>Date et heure debut</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="dateDebut"
                                value={formData.dateDebut}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date et heure fin</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="dateFin"
                                value={formData.dateFin}

                                onChange={handleInputChange}
                            />
                        </div>
                                   
                                    <div className="form-group">
                        <input
    type="text"
    className="form-control"
    name="collaborateur.id"  
    value={formData.collaborateur.id }
    required
/> </div>
                                    <div className="form-group">
        <select
            className="form-control"
            name="vehicule.vehiculeId"
            value={formData.vehicule.vehiculeId}
            onChange={handleInputChange}
        >
            <option value="">Choisir Matricule</option>
            {vehicles.map(vehicle => (
                <option key={vehicle.vehiculeId} value={vehicle.vehiculeId}>
                    {vehicle.immatriculation}
                </option>
            ))}
        </select>
    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleEditCancel}>Annuler</button>
                                <button type="button" className="btn btn-primary" style={{ backgroundColor: '#7fad39' }} onClick={handleEditSubmit}>Mettre à jour</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
                            <p><strong>Titre :</strong> {mission.titre}</p>
                            <p><strong>Description :</strong> {mission.description}</p>
                            <p><strong>Date Debut :</strong> {mission.dateDebut}</p>
                            <p><strong>Date Fin :</strong> {mission.dateFin}</p>
                            <p><strong>Latitude :</strong> {mission.mission_latitude}</p>
                            <p><strong>Longtitude :</strong> {mission.mission_longitude}</p>
                            <p><strong>Statut :</strong> {mission.statut}</p>
                            <p><strong>Matricule :</strong> {mission.vehicule.immatriculation}</p>
                            <p><strong>Nom & Prenom du Collaborateur :</strong> {mission.collaborateur.nom} {mission.collaborateur.prenom}</p>
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
