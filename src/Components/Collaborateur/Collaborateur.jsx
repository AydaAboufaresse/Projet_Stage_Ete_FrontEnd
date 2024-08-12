import React, { useState, useEffect } from "react";
import OCPLogo from '../Assets/OCP_Group.png';
import './Collaborateur.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBellFill, BsChevronDown } from "react-icons/bs";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { BASEURL, getAllData, saveCollaborateur, deleteCollaborateur, updateCollaborateur } from "../axios/requestCollaborateur";
import avatar from '../Assets/pro.png';
import OCPHISTO from '../Assets/Train.jpg';
import imagepro from '../Assets/pro.png';
import { TbListDetails } from "react-icons/tb";
import { RiCloseLargeLine } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
   

const Collaborateur = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [collaborators, setCollaborators] = useState([]);
    const [newCollaborateur, setNewCollaborateur] = useState({
        nom: "",
        prenom: "",
        cin: "",
        tel: "",
        date_naissance: "",
        service: "",
        position: "",
        email: "",
        genre: "",
        adress:""
    });
    const [collaborateurs, setCollaborateurs] = useState([]);
    const [selectedCollaborator, setSelectedCollaborator] = useState(null);

    const [imageToUpload, setImageToUpload] = useState(null);
    const [collaboratorToDelete, setCollaboratorToDelete] = useState(null);
    const [collaboratorToUpdate, setCollaboratorToUpdate] = useState({
        id: "",
        nom: "",
        prenom: "",
        cin: "",
        tel: "",
        date_naissance: "",
        service: "",
        position: "",
        email: "",
        genre: "",
        adress:""
    });
    const [updateImageToUpload, setUpdateImageToUpload] = useState(null);
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    const toggleDetailsPopup = (collaborator) => {
        setCollaboratorToUpdate(collaborator);
        setShowDetailsPopup(!showDetailsPopup);
    };

    useEffect(() => {
        fetchCollaborators();
    }, []);

    const fetchCollaborators = async () => {
        try {
            const data = await getAllData();
            setCollaborators(data);
        } catch (error) {
            console.error("Error fetching collaborators:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Si c'est le champ date_naissance, assurez-vous de le gérer correctement
        if (name === "date_naissance") {
            // Pour s'assurer que le format est correct
            setNewCollaborateur((prev) => ({ ...prev, [name]: value }));
        } else {
            setNewCollaborateur((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        setImageToUpload(e.target.files[0]);
    };

    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setCollaboratorToUpdate((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateImageChange = (e) => {
        setUpdateImageToUpload(e.target.files[0]);
    };

    const handleSave = async () => {
        console.log("Données à enregistrer:", newCollaborateur); // Ajoutez cette ligne
        try {
            let status = await saveCollaborateur(newCollaborateur, imageToUpload);
    
                Swal.fire({
                    icon: "success",
                    title: "Collaborateur ajouté avec succès",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  setNewCollaborateur({
                    nom: "",
                    prenom: "",
                    cin: "",
                    tel: "",
                    date_naissance: "",
                    service: "",
                    position: "",
                    email: "",
                    genre: "",
                    adress:""
                });
            fetchCollaborators();
            toggleModal();
        } catch (error) {
            Swal.fire({
                title: "Erreur!",
                text: "Une erreur s'est produite lors de l'ajout du collaborateur.",
                icon: "error"
            });
        }
    };
    
    const handleUpdate = async () => {
        try {
            await updateCollaborateur(collaboratorToUpdate, updateImageToUpload);
            Swal.fire({
                icon: "success",
                title: "Collaborateur mis à jour avec succès",
                showConfirmButton: false,
                timer: 1500
            });
            fetchCollaborators();
            toggleUpdatePopup(null);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Une erreur s'est produite lors de la mise à jour du collaborateur.",
            });
        }
    };

    const toggleDeleteModal = async (collaborateur) => {
        console.log('Collaborateur sélectionné :', collaborateur);
    
        const result = await Swal.fire({
            title: "Êtes-vous sûr ?",
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Oui, supprimez-le !"
        });
    
        if (result.isConfirmed) {
            try {
                await deleteCollaborateur(collaborateur.id, collaborateur.imageUrl);
                Swal.fire({
                    title: "Supprimé !",
                    text: "Le collaborateur a été supprimé.",
                    icon: "success"
                });
                // Rafraîchir la liste des collaborateurs
                const response = await getAllData();
                setCollaborateurs(response);
                fetchCollaborators();
            } catch (error) {
                console.error('Erreur lors de la suppression du collaborateur :', error);
                Swal.fire({
                    title: "Erreur !",
                    text: "Il y a eu un problème lors de la suppression du collaborateur.",
                    icon: "error"
                });
            }
        }
    };
    
    
    
    

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const toggleDeletePopup = (collaborator) => {
        setCollaboratorToDelete(collaborator);
        setShowDeletePopup(!showDeletePopup);
    };

    const toggleUpdatePopup = (collaborator) => {
        setCollaboratorToUpdate(collaborator || {
            id: "",
            nom: "",
            prenom: "",
            cin: "",
            tel: "",
            date_naissance: "",
            service: "",
            position: "",
            email: "",
            genre: "",
            adress:""
        });
        setUpdateImageToUpload(null);
        setShowUpdatePopup(!showUpdatePopup);
    };
    
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
            {/* Header section */}
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
                                            <img src={avatar} alt="User Avatar" className="avatar" />
                                            <BsChevronDown className="arrow" />
                                        </a>
                                        {showDropdown && (
                                            <ul className="dropdown-menu">
                                                <li><a href="/Profile">Profile</a></li>
                                                <li><a  onClick={handleLogout}>Déconnexion</a></li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Breadcrumb section */}
            <section className="breadcrumb-section" style={{ backgroundImage: `url(${OCPHISTO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Collaborateurs OCP GROUP</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collaborateurs section */}
            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__btns">
                                <button onClick={toggleModal} className="btn btn-primary custom-btn-primary ajout">
                                    <span className="icon_loading"></span> Ajouter Collaborateur
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="shoping__Collab">Collaborateurs</th>
                                            <th>CIN</th>
                                            <th>Tel</th>
                                            <th>Service</th>
                                            <th>Position</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {collaborators.map((collaborator) => (
                                            <tr key={collaborator.id}>
                                                <td className="shoping__cart__item">
                                                    <img className="image" src={collaborator.imageUrl ? `${BASEURL}image/${collaborator.imageUrl}` : imagepro} alt="Collaborateur" />
                                                    <h5>{collaborator.nom} {collaborator.prenom}</h5>
                                                </td>
                                                <td>{collaborator.cin}</td>
                                                <td>{collaborator.tel}</td>
                                                <td>{collaborator.service}</td>
                                                <td>{collaborator.position}</td>
                                                <td className="shoping__cart__item__close">
                                                    <FaTrashAlt
                                                        style={{ cursor: "pointer",fontSize: '18px', color: '#b2b2b2'  }}
                                                        onClick={() => toggleDeleteModal(collaborator)}
                                                    />
                                                    <FaRegEdit
                                                        style={{ cursor: "pointer", marginLeft: "10px", fontSize: '18px', color: '#b2b2b2' }}
                                                        onClick={() => toggleUpdatePopup(collaborator)}
                                                    />
                                                    <TbListDetails
                                                        style={{ cursor: "pointer", marginLeft: "10px", fontSize: '18px', color: '#b2b2b2'  }}
                                                        onClick={() => toggleDetailsPopup(collaborator)}
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

            {/* Add Collaborateur Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <RiCloseLargeLine className="close-icon" onClick={toggleModal} />
                            <div className="modal-header">
                                <h5 className="modal-title">Ajouter Collaborateur</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Nom</label>
                                        <input type="text" className="form-control" name="nom" value={newCollaborateur.nom} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Prenom</label>
                                        <input type="text" className="form-control" name="prenom" value={newCollaborateur.prenom} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>CIN</label>
                                        <input type="text" className="form-control" name="cin" value={newCollaborateur.cin} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Telephone</label>
                                        <input type="text" className="form-control" name="tel" value={newCollaborateur.tel} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Date Naissance</label>
                                        <input type="date" className="form-control" name="date_naissance" value={newCollaborateur.date_naissance} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Service</label>
                                        <input type="text" className="form-control" name="service" value={newCollaborateur.service} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Position</label>
                                        <input type="text" className="form-control" name="position" value={newCollaborateur.position} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" name="email" value={newCollaborateur.email} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Adress</label>
                                        <input type="text" className="form-control" name="adress" value={newCollaborateur.adress} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Genre</label>
                                        <div>
                                            <label>
                                                <input type="radio" name="genre" value="homme" checked={newCollaborateur.genre === "homme"} onChange={handleInputChange} required />
                                                Homme
                                            </label>
                                            <label style={{ marginLeft: '10px' }}>
                                                <input type="radio" name="genre" value="femme" checked={newCollaborateur.genre === "femme"} onChange={handleInputChange} required />
                                                Femme
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Fermer</button>
                                <button type="button" className="btn btn-primary custom-btn-primary" style={{ backgroundColor: '#7fad39' }} onClick={handleSave}>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Collaborateur Popup */}
            {showUpdatePopup && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <RiCloseLargeLine className="close-icon" onClick={() => toggleUpdatePopup(null)} />
                            <div className="modal-header">
                                <h5 className="modal-title">Modifier Collaborateur</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Nom</label>
                                        <input type="text" className="form-control" name="nom" value={collaboratorToUpdate.nom} onChange={handleUpdateInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Prenom</label>
                                        <input type="text" className="form-control" name="prenom" value={collaboratorToUpdate.prenom} onChange={handleUpdateInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>CIN</label>
                                        <input type="text" className="form-control" name="cin" value={collaboratorToUpdate.cin} onChange={handleUpdateInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Telephone</label>
                                        <input type="text" className="form-control" name="tel" value={collaboratorToUpdate.tel} onChange={handleUpdateInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Date Naissance</label>
                                        <input type="date" className="form-control" name="date_naissance" value={collaboratorToUpdate.date_naissance} onChange={handleUpdateInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Service</label>
                                        <input type="text" className="form-control" name="service" value={collaboratorToUpdate.service} onChange={handleUpdateInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Position</label>
                                        <input type="text" className="form-control" name="position" value={collaboratorToUpdate.position} onChange={handleUpdateInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" name="email" value={collaboratorToUpdate.email} onChange={handleUpdateInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Adress</label>
                                        <input type="text" className="form-control" name="adress" value={collaboratorToUpdate.adress} onChange={handleUpdateInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Genre</label>
                                        <div>
                                            <label>
                                                <input type="radio" name="genre" value="homme" checked={collaboratorToUpdate.genre === "homme"} onChange={handleUpdateInputChange} required />
                                                Homme
                                            </label>
                                            <label style={{ marginLeft: '10px' }}>
                                                <input type="radio" name="genre" value="femme" checked={collaboratorToUpdate.genre === "femme"} onChange={handleUpdateInputChange} required />
                                                Femme
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => toggleUpdatePopup(null)}>Fermer</button>
                                <button type="button" className="btn btn-primary custom-btn-primary" style={{ backgroundColor: '#7fad39' }} onClick={handleUpdate}>Enregistrer</button>
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
                    <h5 className="modal-title">Détails du Collaborateur</h5>
                </div>
                <div className="modal-body">
                    {/* Affichage des détails du collaborateur */}
                    {collaboratorToUpdate && ( // Vérifiez que collaboratorToUpdate n'est pas null
                        <div className="details-section">
                            <p><strong>Nom:</strong> {collaboratorToUpdate.nom}</p>
                            <p><strong>Prénom:</strong> {collaboratorToUpdate.prenom}</p>
                            <p><strong>CIN:</strong> {collaboratorToUpdate.cin}</p>
                            <p><strong>Téléphone:</strong> {collaboratorToUpdate.tel}</p>
                            <p><strong>Date de Naissance:</strong> {collaboratorToUpdate.date_naissance}</p>
                            <p><strong>Service:</strong> {collaboratorToUpdate.service}</p>
                            <p><strong>Position:</strong> {collaboratorToUpdate.position}</p>
                            <p><strong>Email:</strong> {collaboratorToUpdate.email}</p>
                            <p><strong>Adress:</strong> {collaboratorToUpdate.adress}</p>
                            <p><strong>Genre:</strong> {collaboratorToUpdate.genre === "homme" ? "Homme" : "Femme"}</p>
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

export default Collaborateur;
