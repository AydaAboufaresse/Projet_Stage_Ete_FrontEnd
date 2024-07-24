import React, { useState } from "react";
import OCPLogo from '../Assets/OCP_Group.png';
import './Mission.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBellFill, BsChevronDown } from "react-icons/bs";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import avatar from '../Assets/pro.png';
import OCPHISTO from '../Assets/OCP_history.jpg';
import { FaFilePdf } from "react-icons/fa6";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Page, Text, View, Document, StyleSheet, BlobProvider } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 10,
      backgroundColor: "#ffffff"
    },
    section: {
      margin: 10,
      padding: 10,
      borderBottom: "1px solid #eee"
    },
    text: {
      fontSize: 12
    }
  });
  
  // Create Document Component
  const MyDocument = ({ mission }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text}>Titre: {mission.title}</Text>
          <Text style={styles.text}>Description: {mission.description}</Text>
          <Text style={styles.text}>Longitude: {mission.longitude}</Text>
          <Text style={styles.text}>Latitude: {mission.latitude}</Text>
          <Text style={styles.text}>Date et heure debut: {mission.startDate}</Text>
          <Text style={styles.text}>Date et heure fin: {mission.endDate}</Text>
          <Text style={styles.text}>Collaborateur: {mission.collaborator}</Text>
          <Text style={styles.text}>Matricule: {mission.matricule}</Text>
        </View>
      </Page>
    </Document>
  );

const Mission = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [selectedCollaborator, setSelectedCollaborator] = useState('');
    const [selectedMatricule, setSelectedMatricule] = useState('');
    const [selectedMission, setSelectedMission] = useState(null);

    const mission = {
        title: "Mission 1",
        description: "Description of mission",
        longitude: "10.000",
        latitude: "20.000",
        startDate: "2024-07-01 10:00",
        endDate: "2024-07-01 12:00",
        collaborator: "John Doe",
        matricule: "AB12345"
      };

    const collaborators = [
        { id: '1', name: 'Ayda' },
        { id: '2', name: 'Lina' },
        // Add more collaborators as needed
    ];

    const matricules = [
        { id: '1', code: 'AB12345' },
        { id: '2', code: 'CD67890' },
        // Add more matricules as needed
    ];

    const handleCollaboratorChange = (e) => {
        setSelectedCollaborator(e.target.value);
    };

    const handleMatriculeChange = (e) => {
        setSelectedMatricule(e.target.value);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    const toggleUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Mission added");
        toggleModal(); // Close the modal after submission
    };

    const handlePositionSelect = (latlng) => {
        setLongitude(latlng.lng);
        setLatitude(latlng.lat);
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

    const handleDelete = () => {
        // Handle delete logic
        console.log("Mission deleted");
        toggleDeleteModal(); // Close the delete modal
    };

    const handleUpdate = () => {
        // Handle update logic
        console.log("Mission updated");
        toggleUpdateModal(); // Close the update modal
    };

    const handlePDFGeneration = () => {
        // Handle PDF generation logic
        console.log("PDF generated");
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
                            <nav className="header__menu">
                                <ul>
                                    <li><a href="/Home">Home</a></li>
                                    <li className="active"><a href="/Mission">Missions</a></li>
                                    <li><a href="/Collaborateur">Collaborateurs</a></li>
                                    <li><a href="/Vehicule">Vehicules</a></li>
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
                                <h2>Missions OCP GROUP</h2>
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
                                        {/* Sample Rows */}
                                        <tr>
                                            <td className="shoping__cart__item">
                                                <h5 name="nompre_collaborateur">Mission 1</h5>
                                            </td>
                                            <td className="shoping__cart__description">
                                                Description of mission
                                            </td>
                                            <td className="shoping__cart__tel">10.000</td>
                                            <td>20.000</td>
                                            <td>2024-07-01 10:00</td>
                                            <td>2024-07-01 12:00</td>
                                            <td>John Doe</td>
                                            <td>AB12345</td>
                                            <td className="shoping__cart__item__close">
                                                <FaTrashAlt
                                                    style={{ cursor: 'pointer', fontSize: '18px', color: '#b2b2b2' }}
                                                    onClick={() => {
                                                        setSelectedMission("Mission 1"); // Set the selected mission
                                                        toggleDeleteModal();
                                                    }}
                                                />
                                                <FaRegEdit
                                                    style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '18px', color: '#b2b2b2' }}
                                                    onClick={() => {
                                                        setSelectedMission("Mission 1"); // Set the selected mission
                                                        toggleUpdateModal();
                                                    }}
                                                />
                                                <BlobProvider document={<MyDocument mission={mission} />}>
                                                {({ url }) => (
                                                    <a href={url} target="_blank" rel="noopener noreferrer" download="mission_details.pdf">
                                                        <FaFilePdf style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '18px', color: '#b2b2b2' }}/>
                                                    </a>
                                                    )}
                                                </BlobProvider>
                                            </td>
                                        </tr>
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

            {/* Add Mission Modal */}
            
            {showModal && <div className="modal-backdrop fade show"></div>}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ajouter Mission</h5>
                                
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="titre" placeholder="Titre" required />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control" id="description" placeholder="Description" rows="3" required></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="longitude" placeholder="Mission longitude" value={longitude} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="latitude" placeholder="Mission latitude" value={latitude} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <MapContainer center={[32.26855544621476, -9.231295309978055]} zoom={13} style={{ height: '400px', width: '100%' }}>
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            <LocationMarker onPositionSelect={handlePositionSelect} />
                                        </MapContainer>
                                    </div>
                                    <div className="form-group">
                                        <label>Date et heure debut</label>
                                        <input type="datetime-local" className="form-control" id="dateDebut" placeholder="Date et heure debut" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Date et heure fin</label>
                                        <input type="datetime-local" className="form-control" id="dateFin" placeholder="Date et heure fin" required />
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control" value={selectedCollaborator} onChange={handleCollaboratorChange} required>
                                            <option value="">Choisir un Collaborateur</option>
                                            {collaborators.map(collaborator => (
                                                <option key={collaborator.id} value={collaborator.id}>{collaborator.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control" value={selectedMatricule} onChange={handleMatriculeChange} required>
                                            <option value="">Choisir Matricule</option>
                                            {matricules.map(matricule => (
                                                <option key={matricule.id} value={matricule.id}>{matricule.code}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={toggleModal}>Fermer</button>
                                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#7fad39' }}>Enregistrer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            
            {showModal && <div className="modal-backdrop fade show"></div>}
            {showDeleteModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmer la Suppression</h5>
                            </div>
                            <div className="modal-body">
                                <p>Êtes-vous sûr de vouloir supprimer la mission <strong>{selectedMission}</strong> ?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleDeleteModal}>Annuler</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            
            {showModal && <div className="modal-backdrop fade show"></div>}
            {showUpdateModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modifier Mission</h5>
                                
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Titre" />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control" placeholder="Description" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Mission longitude" value={longitude} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Mission latitude" value={latitude} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <MapContainer center={[32.26855544621476, -9.231295309978055]} zoom={13} style={{ height: '400px', width: '100%' }}>
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            <LocationMarker onPositionSelect={handlePositionSelect} />
                                        </MapContainer>
                                    </div>
                                    <div className="form-group">
                                        <label>Date et heure debut</label>
                                        <input type="datetime-local" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Date et heure fin</label>
                                        <input type="datetime-local" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control" value={selectedCollaborator} onChange={handleCollaboratorChange}>
                                            <option value="">Choisir un Collaborateur</option>
                                            {collaborators.map(collaborator => (
                                                <option key={collaborator.id} value={collaborator.id}>{collaborator.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control" value={selectedMatricule} onChange={handleMatriculeChange}>
                                            <option value="">Choisir Matricule</option>
                                            {matricules.map(matricule => (
                                                <option key={matricule.id} value={matricule.id}>{matricule.code}</option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleUpdateModal}>Annuler</button>
                                <button type="button" className="btn btn-primary" style={{ backgroundColor: '#7fad39' }}onClick={handleUpdate}>Mettre à jour</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mission;
