import React, { useState, useEffect } from "react";
import axios from 'axios';
import OCPLogo from '../Assets/OCP_Group.png';
import './Vehicule.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBellFill, BsChevronDown } from "react-icons/bs";
import { BiRightArrow } from "react-icons/bi"; 
import { CiBookmarkPlus } from "react-icons/ci";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import avatar from '../Assets/pro.png';
import OCPHISTO from '../Assets/OCP_history.jpg';
import { useNavigate } from "react-router-dom";
import { GetAllData, saveVehicule, deleteVehicule, updateVehicule } from '../axios/request'
import Swal from "sweetalert2";
const BASEURL = 'http://localhost:8087/api/';

   

const Vehicule = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [imageUpload, setImageUpload] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
        immatriculation: '',
        modele:'',
        marque: '', 
        status: 0,
        service: '',
        vehiculeImageUrl:""
    });
    const [vehicule, setVehicule] = useState({
        marque: "",
        modele: "",
        immatriculation: "",
        status: 0,
        service: "",
        vehiculeImageUrl: ""
    });
const [vehicules, setVehicules] = useState([]);
const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Fetch all vehicles on component mount
        const fetchVehicles = async () => {
            const response = await axios.get(`${BASEURL}`);
            setVehicles(response.data);
        };
        fetchVehicles();
    }, []);
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        // Fetch filtered vehicles
        const fetchFilteredVehicles = async () => {
            const response = await axios.get(`${BASEURL}search?query=${e.target.value}`);
            setVehicles(response.data);
        };
        fetchFilteredVehicles();
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleModal = () => {
        console.log('Toggling Add Modal');
        setShowModal(!showModal);
    };
    function handleTextFieldChange(e) {
        setVehicule({ ...vehicule, [e.target.name]: e.target.value });
    }

    const toggleEditModal = (vehicle) => {
        console.log('Toggling Edit Modal for vehicle:', vehicle);
        setSelectedVehicle(vehicle);
        setFormData(vehicle); // Populate form data with selected vehicle's data
        setShowEditModal(!showEditModal);
    };
    const deleteFile = async (filename) => {
        try {
            await axios.delete(`${BASEURL}delete`, {
                params: { filename }
            });
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };
    
    const toggleDeleteModal = async (vehicle) => {
        setSelectedVehicle(vehicle); 
        console.log('Selected Vehicle:', vehicle);
        
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
                await deleteVehicule(vehicle.vehiculeId, vehicle.vehiculeImageUrl);
                Swal.fire({
                    title: "Supprimé !",
                    text: "Votre fichier a été supprimé.",
                    icon: "success"
                });
                // Refresh the vehicle list
            const response = await axios.get(`${BASEURL}`);
            setVehicles(response.data);
                
            } catch (error) {
                console.error('Error deleting vehicle:', error);
                Swal.fire({
                    title: "Erreur!",
                    text: "Il y a eu un problème lors de la suppression du véhicule.",
                    icon: "error"
                });
            }
        }
    };
    const [filter, setFilter] = useState('all');
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };
    

    async function handleSubmitVehicule() {
        let status = await saveVehicule(vehicule, imageUpload);
        if (status === 201) {
            Swal.fire({
                icon: "success",
                title: "Votre véhicule a été enregistré",
                showConfirmButton: false,
                timer: 1500
              });
            setVehicule({
                marque: "",
                modele: "",
                immatriculation: "",
                status: 0,
                service: "",
                vehiculeImageUrl: ""
            });
            document.getElementById("imageUpload").value = "";
            setImageUpload("");

            // Refresh the vehicle list
            const response = await axios.get(`${BASEURL}`);
            setVehicles(response.data);
            setShowModal(false);
            
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if there is a new image
            if (formData.image) {
                // Delete the old image
                await deleteFile(selectedVehicle.vehiculeImageUrl);
    
                // Upload the new image
                const imagePath = await uploadFile(formData.image);
                formData.vehiculeImageUrl = imagePath; // Update the URL in formData
            }
    
            // Send the update request
            const response = await axios.put(`${BASEURL}vehicule/${selectedVehicle.vehiculeId}`, formData);
            // Update the vehicle list with the new data
            setVehicles(vehicles.map(vehicle => vehicle.vehiculeId === selectedVehicle.vehiculeId ? response.data : vehicle));
            setShowEditModal(false); // Close the modal
    
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
    

   

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(`${BASEURL}upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
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

            <section className="breadcrumb-section" style={{ backgroundImage: `url(${OCPHISTO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Véhicules OCP GROUP</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            {/* Espace réservé pour d'autres composants à gauche si nécessaire */}
                        </div>
                        <div className="col-lg-9">
                            <div className="search">
                                <div className="search__form">
                                    <form action="#">
                                        <div className="search__categories">
                                            Nos Vehicules
                                            <span className="arrow_carrot-down"></span>
                                        </div>
                                        <input type="text" placeholder="Quel véhicule recherchez-vous ?" value={searchQuery} onChange={handleSearchChange} />
                                        <button type="submit" className="site-btn">Recherche</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section des produits */}
            <section className="product spad">
    <div className="container">
        <div className="row">
            <div className="col-lg-4 col-md-5">
                <div className="filter__sort">
                    <span>Filter par Reservation</span>
                    <select onChange={handleFilterChange} value={filter}>
                        <option value="all">Tous</option>
                        <option value="reserved">Réserver</option>
                        <option value="available">Non Réserver</option>
                    </select>
                </div>
            </div>
            <div className="col-lg-4 col-md-4">
                <div className="filter__found">
                    <h6><span>{vehicles.length}</span> Vehicules Disponible</h6>
                </div>
            </div>
            <div className="col-lg-4 col-md-3">
                <div className="filter__option">
                    <button className="btn-plus" onClick={toggleModal}><CiBookmarkPlus /></button>
                </div>
            </div>
        </div>

        <div className="row">
            {vehicles.length === 0 ? (
                <div className="col-12 no-vehicles-message">
                    <i className="fas fa-exclamation-triangle"></i>
                    <h1>Aucun véhicule trouvé</h1>
                </div>
            ) : (
                vehicles
                    .filter(vehicle => {
                        if (filter === 'reserved') {
                            return vehicle.status === 1;
                        } else if (filter === 'available') {
                            return vehicle.status === 0;
                        }
                        return true;
                    })
                    .map(vehicle => (
                        <div className="col-lg-4 col-md-6 col-sm-6" key={vehicle.vehiculeId}>
                            <div className="product__item">
                                <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${BASEURL}image/${vehicle.vehiculeImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <ul className="product__item__pic__hover">
                                        <li><a href="#" onClick={() => toggleDeleteModal(vehicle)}><FaTrashAlt /></a></li>
                                        <li><a href="#" onClick={() => toggleEditModal(vehicle)}><FaPen /></a></li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6><b>Matricule : </b>{vehicle.immatriculation}</h6>
                                    <h6><b>Service : </b>{vehicle.service}</h6>
                                    <h6><b>Model : </b>{vehicle.modele}</h6>
                                    <h6><b>Marque : </b>{vehicle.marque}</h6>
                                    <h5>{vehicle.status ? "Réserver" : "Disponible"}</h5>
                                </div>
                            </div>
                        </div>
                    ))
            )}
        </div>
    </div>
</section>


            {/* Add Vehicle Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ajouter Vehicule</h5>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <input type="text" className="form-control"  value={vehicule.marque} onChange={handleTextFieldChange} name="marque" placeholder="Marque*" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control"  value={vehicule.modele} onChange={handleTextFieldChange} name="modele" placeholder="Modele*" />
                                </div>
                                <div className="form-group">
                                    <input type="text"className="form-control"  value={vehicule.immatriculation} onChange={handleTextFieldChange} name="immatriculation" placeholder="Immatriculation*" />
                                </div>
                                <div className="form-group">
                                    <input type="hidden" className="form-control"  value={vehicule.status} onChange={handleTextFieldChange} name="status" placeholder="Status*" />
                                </div>
                                <div className="form-group">
                                    <input type="text"className="form-control"  value={vehicule.service} onChange={handleTextFieldChange} name="service" placeholder="Service*" />
                                </div>
                                <div className="form-group">
                                    <input type="file"className="form-control" id='imageUpload' onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Fermer</button>
                                <button className="btn btn-primary custom-btn-primary" onClick={handleSubmitVehicule}style={{ backgroundColor: '#7fad39' }}>Enregistrer</button>
                            </div>         
                        </div>
                    </div>
                </div>
                
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}

            {showEditModal && (
    <div className="modal fade show" style={{ display: 'block' }} role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Modifier Vehicule</h5>
                </div>
                <form onSubmit={handleEditSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <input type="text" className="form-control" name="marque" value={formData.marque} onChange={handleInputChange} placeholder="Marque" required />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="modele" value={formData.modele} onChange={handleInputChange} placeholder="Modele" required />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="immatriculation" value={formData.immatriculation} onChange={handleInputChange} placeholder="Immatriculation" required />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="service" value={formData.service} onChange={handleInputChange} placeholder="Service" required />
                        </div>
                        <div className="form-group">
                            <input type="file" className="form-control" name="image" onChange={handleImageChange} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={toggleEditModal}>Fermer</button>
                        <button type="submit" className="btn btn-primary custom-btn-primary" style={{ backgroundColor: '#7fad39' }}>Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}
{showEditModal && <div className="modal-backdrop fade show"></div>}

            {showEditModal && <div className="modal-backdrop fade show"></div>}

            
        </div>
    );
};

export default Vehicule;
