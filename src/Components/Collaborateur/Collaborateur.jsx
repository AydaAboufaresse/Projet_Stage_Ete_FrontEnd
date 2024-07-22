import React, { useState } from "react";
import OCPLogo from '../Assets/OCP_Group.png';
import './Collaborateur.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBellFill, BsChevronDown } from "react-icons/bs";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

import avatar from '../Assets/pro.png';
import OCPHISTO from '../Assets/Train.jpg';
import imagepro from '../Assets/pro.png';

const Collaborateur = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [collaboratorToDelete, setCollaboratorToDelete] = useState(null);
    const [collaboratorToUpdate, setCollaboratorToUpdate] = useState({
        nom: "",
        prenom: "",
        cin: "",
        tel: "",
        date_naissance: "",
        service: "",
        role: "",
        username: "",
        password: ""
    });

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
        setCollaboratorToUpdate({
            nom: "John",
            prenom: "Doe",
            cin: "AB123456",
            tel: "0612345678",
            date_naissance: "1990-01-01",
            service: "Informatique",
            role: "Développeur",
            username: "johndoe",
            password: "********"
        });
        setShowUpdatePopup(!showUpdatePopup);
    };

    const handleDelete = () => {
        console.log("Deleting collaborator:", collaboratorToDelete);
        setShowDeletePopup(false);
    };

    const handleUpdate = () => {
        console.log("Updating collaborator:", collaboratorToUpdate);
        setShowUpdatePopup(false);
        // Implement update logic here
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
                            <nav className="header__menu">
                                <ul>
                                    <li><a href="/Home">Home</a></li>
                                    <li><a href="#">Missions</a></li>
                                    <li className="active"><a href="/Collaborateur">Collaborateurs</a></li>
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
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="shoping__Collab">Collaborateurs</th>
                                            <th>CIN</th>
                                            <th>Tel</th>
                                            <th>Date Naissance</th>
                                            <th>Service</th>
                                            <th>Role</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="shoping__cart__item">
                                                <img src={imagepro} alt="Collaborateur" />
                                                <h5 name="nompre_collaborateur">John Doe</h5>
                                            </td>
                                            <td className="shoping__cart__cin">
                                                AB123456
                                            </td>
                                            <td className="shoping__cart__tel">
                                                0612345678
                                            </td>
                                            <td className="shoping__cart__date">
                                                1990-01-01
                                            </td>
                                            <td className="shoping__cart__service">
                                                Informatique
                                            </td>
                                            <td className="shoping__cart__role">
                                                Développeur
                                            </td>
                                            <td className="shoping__cart__item__close">
                                                <FaTrashAlt
                                                    style={{ cursor: 'pointer', fontSize: '18px', color: '#b2b2b2' }}
                                                    onClick={() => toggleDeletePopup("John Doe")}
                                                />
                                                <FaRegEdit
                                                    style={{ cursor: 'pointer', marginLeft: '20px', fontSize: '18px', color: '#b2b2b2' }}
                                                    onClick={() => toggleUpdatePopup("John Doe")}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="shoping__cart__item">
                                                <img src={imagepro} alt="Collaborateur" />
                                                <h5 name="nompre_collaborateur">John Doe</h5>
                                            </td>
                                            <td className="shoping__cart__cin">
                                                AB123456
                                            </td>
                                            <td className="shoping__cart__tel">
                                                0612345678
                                            </td>
                                            <td className="shoping__cart__date">
                                                1990-01-01
                                            </td>
                                            <td className="shoping__cart__service">
                                                Informatique
                                            </td>
                                            <td className="shoping__cart__role">
                                                Développeur
                                            </td>
                                            <td className="shoping__cart__item__close">
                                                <FaTrashAlt
                                                    style={{ cursor: 'pointer', fontSize: '18px', color: '#b2b2b2' }}
                                                    onClick={() => toggleDeletePopup("John Doe")}
                                                />
                                                <FaRegEdit
                                                    style={{ cursor: 'pointer', marginLeft: '20px', fontSize: '18px', color: '#b2b2b2' }}
                                                    onClick={() => toggleUpdatePopup("John Doe")}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="shoping__cart__item">
                                                <img src={imagepro} alt="Collaborateur" />
                                                <h5 name="nompre_collaborateur">John Doe</h5>
                                            </td>
                                            <td className="shoping__cart__cin">
                                                AB123456
                                            </td>
                                            <td className="shoping__cart__tel">
                                                0612345678
                                            </td>
                                            <td className="shoping__cart__date">
                                                1990-01-01
                                            </td>
                                            <td className="shoping__cart__service">
                                                Informatique
                                            </td>
                                            <td className="shoping__cart__role">
                                                Développeur
                                            </td>
                                            <td className="shoping__cart__item__close">
                                                <FaTrashAlt
                                                    style={{ cursor: 'pointer', fontSize: '18px', color: '#b2b2b2' }}
                                                    onClick={() => toggleDeletePopup("John Doe")}
                                                />
                                                <FaRegEdit
                                                    style={{ cursor: 'pointer', marginLeft: '20px', fontSize: '18px', color: '#b2b2b2' }}
                                                    onClick={() => toggleUpdatePopup("John Doe")}
                                                />
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
                                    <span className="icon_loading"></span> Ajouter Collaborateur
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Add Collaborateur Modal */}
            {showModal && <div className="modal-backdrop fade show"></div>}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ajouter Collaborateur</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="nom" placeholder="Nom"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="prenom" placeholder="Prenom"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="cin" placeholder="CIN"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="tel" placeholder="Tel"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="date" className="form-control" id="date_naissance" placeholder="Date Naissance"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="service" placeholder="Service"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="role" placeholder="Role"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="Username" placeholder="Nom d'utilsateur"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="pass" placeholder="Mot de passe"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="file" className="form-control" id="image" name="image" placeholder="Image" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Fermer</button>
                                <button type="button" className="btn btn-primary custom-btn-primary" style={{ backgroundColor: '#7fad39' }}>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Collaborateur Modal */}
            {showUpdatePopup && <div className="modal-backdrop fade show"></div>}
            {showUpdatePopup && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modifier Collaborateur</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="nom" placeholder="Nom" defaultValue={collaboratorToUpdate.nom} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="prenom" placeholder="Prenom" defaultValue={collaboratorToUpdate.prenom} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="cin" placeholder="CIN" defaultValue={collaboratorToUpdate.cin} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="tel" placeholder="Tel" defaultValue={collaboratorToUpdate.tel} />
                                    </div>
                                    <div className="form-group">
                                        <input type="date" className="form-control" id="date_naissance" placeholder="Date Naissance" defaultValue={collaboratorToUpdate.date_naissance} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="service" placeholder="Service" defaultValue={collaboratorToUpdate.service} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="role" placeholder="Role" defaultValue={collaboratorToUpdate.role} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="Username" placeholder="Nom d'utilsateur" defaultValue={collaboratorToUpdate.username} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="pass" placeholder="Mot de passe" defaultValue={collaboratorToUpdate.password} />
                                    </div>
                                    <div className="form-group">
                                        <input type="file" className="form-control" id="image" name="image" placeholder="Image" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowUpdatePopup(false)}>Fermer</button>
                                <button type="button" className="btn btn-primary custom-btn-primary" style={{ backgroundColor: '#7fad39' }} onClick={handleUpdate}>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Popup */}
            {showDeletePopup && <div className="modal-backdrop fade show"></div>}
            {showDeletePopup && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmation de suppression</h5>
                            </div>
                            <div className="modal-body">
                                <p>Voulez-vous vraiment supprimer le collaborateur "{collaboratorToDelete}" ?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeletePopup(false)}>Annuler</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Collaborateur;
