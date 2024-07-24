import React, { useState } from "react";
import OCPLogo from '../Assets/OCP_Group.png';
import './Vehicule.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBellFill, BsChevronDown } from "react-icons/bs";
import { BiRightArrow } from "react-icons/bi"; 
import { CiBookmarkPlus } from "react-icons/ci";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import avatar from '../Assets/pro.png';
import OCPHISTO from '../Assets/OCP_history.jpg';

const Vehicule = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [formData, setFormData] = useState({
        matricule: '',
        marque: '', 
        service: '',
        image: null
    });

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const toggleEditModal = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowEditModal(!showEditModal);
    };

    const toggleDeleteModal = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowDeleteModal(!showDeleteModal);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Add your form submission logic here
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        console.log(selectedVehicle);
        // Add your edit submission logic here
    };

    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        console.log(selectedVehicle);
        // Add your delete submission logic here
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
                                    <li><a href="/Mission">Missions</a></li>
                                    <li><a href="/Collaborateur">Collaborateurs</a></li>
                                    <li className="active"><a href="/Vehicule">Vehicules</a></li>
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
                                        <input type="text" placeholder="Quel véhicule recherchez-vous ?" />
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
                                <select>
                                    <option value="0">Réserver</option>
                                    <option value="0">Non Réserver</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="filter__found">
                                <h6><span>16</span> Vehicules Disponible</h6>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-3">
                            <div className="filter__option">
                                <button className="btn-plus" onClick={toggleModal}><CiBookmarkPlus /></button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {[1, 2, 3, 4, 5].map((item, index) => (
                            <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${OCPHISTO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                        <ul className="product__item__pic__hover">
                                            <li><a href="#" onClick={toggleDeleteModal} ><FaTrashAlt /></a></li>
                                            <li><a href="#" onClick={toggleEditModal}><FaPen /></a></li>
                                        </ul>
                                    </div>
                                    <div className="product__item__text">
                                        <h6>Matricule : 12568A | 54</h6>
                                        <h6>Service : informatique</h6>
                                        <h5>Reserver</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="product__pagination">
                        <a href="#">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#"><BiRightArrow /></a>
                    </div>
                </div>
            </section>

            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ajouter Vehicule</h5>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="matricule" name="matricule" placeholder="Matricule"required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="marque" name="marque" placeholder="Marque"required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="service" name="service" placeholder="Service" required/> 
                                    </div>
                                    <div className="form-group">
                                        <input type="file" className="form-control" id="image" name="image" placeholder="Image"required/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleModal}>Fermer</button>
                                    <button type="submit" className="btn btn-primary custom-btn-primary" style={{ backgroundColor: '#7fad39' }}>Enregistrer</button>
                                </div>
                            </form>
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
                                        <input type="text" className="form-control" id="matricule" name="matricule" placeholder="Matricule" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="marque" name="marque" placeholder="Marque" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="service" name="service" placeholder="Service" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="file" className="form-control" id="image" name="image" placeholder="Image" />
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

            {showDeleteModal && (
                <div className="modal fade show" style={{ display: 'block' }} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Supprimer Vehicule</h5>
                            </div>
                            <div className="modal-body">
                                <p>Êtes-vous sûr de vouloir supprimer ce véhicule?</p>
                                <p><strong>Matricule:</strong> </p>
                                <p><strong>Service:</strong> </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleDeleteModal}>Fermer</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteSubmit}>Supprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showDeleteModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default Vehicule;
