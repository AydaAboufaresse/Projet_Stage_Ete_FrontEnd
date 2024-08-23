import React, { useState } from "react";
import OCPLogo from '../Assets/OCP_Group.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBellFill, BsChevronDown } from "react-icons/bs";
import avatar from '../Assets/pro.png';
import imagepro from '../Assets/pro.png';

const ProfileCollaborateur = () => {
    const [showDropdown, setShowDropdown] = useState(false);
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
                                    <li ><a href="/HomeCollaborateur">Missions</a></li>
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
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img
                                className="rounded-circle mt-5"
                                width="150px"
                                src={imagepro}
                                alt="Profile"
                            />
                            <span className="font-weight-bold">Ayda Aboufaresse</span>
                            <span className="text-black-50">ayda.aboufaresse@gmail.com</span>
                            <span> </span>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Nom</label>
                                    <input type="text" className="form-control" placeholder="Nom" />
                                </div>
                                <div className="col-md-6">
                                    <label className="labels">Prenom</label>
                                    <input type="text" className="form-control" placeholder="Prenom" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Poste de Travail</label>
                                    <input type="text" className="form-control" placeholder="Entrez Votre Poste" />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Numero de Téléphone</label>
                                    <input type="text" className="form-control" placeholder="Entrez Votre Numero de Téléphone" />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">E-mail</label>
                                    <input type="text" className="form-control" placeholder="Entrez Votre E-mail" />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Adress</label>
                                    <input type="text" className="form-control" placeholder="Entrez Votre Adress" />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Code Postal</label>
                                    <input type="text" className="form-control" placeholder="Entrez Code Postal" />
                                </div>
                                <div className="col-md-12">
                                    <label className="labels">Ville</label>
                                    <input type="text" className="form-control" placeholder="Ville" />
                                </div>
                            </div>
                            <div className="mt-5 text-center">
                                <button className="btn btn-primary profile-button" type="button">
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCollaborateur;
