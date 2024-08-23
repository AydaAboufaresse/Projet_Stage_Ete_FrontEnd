import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import OCPLogo from '../Assets/OCP_Group.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBellFill, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import avatar from '../Assets/pro.png';
import './resevation.css';
import L from "leaflet";
import OCPHISTO from '../Assets/Train.jpg';
import { useNavigate } from "react-router-dom";

const DefaultIcon = L.icon({
    iconUrl: require('../Assets/live-location.png'), 
    iconSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Reservation = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const position = [31.7917, -7.0926]; 
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

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
                                <img src={OCPLogo} alt="OCP Logo" className="logo"/>
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
                                            <img src={avatar} alt="User Avatar" className="avatar"/>
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
                                        <li><a href="#">Fresh Meat</a></li>
                                        <li><a href="#">Vegetables</a></li>
                                        <li><a href="#">Fruit & Nut Gifts</a></li>
                                        <li><a href="#">Fresh Berries</a></li>
                                        <li><a href="#">Ocean Foods</a></li>
                                        <li><a href="#">Butter & Eggs</a></li>
                                        <li><a href="#">Fastfood</a></li>
                                        <li><a href="#">Fresh Onion</a></li>
                                        <li><a href="#">Papayaya & Crisps</a></li>
                                        <li><a href="#">Oatmeal</a></li>
                                        <li><a href="#">Fresh Bananas</a></li>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="hero__searche">
                                <div className="hero__search__forme">
                                <div className="filterreservation">
                                    <span>Filter par Reservation</span>
                                    <select >
                                        <option value="all">Tous</option>
                                        <option value="reserved">Accepter</option>
                                        <option value="available">Refuser</option>
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
                                            <th>Collaborateur</th>
                                            <th>Matricule</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                
                                        <tr >
                                            <td className="shoping__cart__item">
                                                <h5 name="nompre_collaborateur">mission.titre</h5>
                                            </td>
                                            <td>mission.collaborateur.nom</td>
                                            <td>mission.vehicule.immatriculation</td>
                                            <td className="shoping__cart__item__close">
                                                <button className="btn btn-success btn-sm">Accepter</button>
                                                <button className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }}>Refuser</button>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className="shoping__cart__item">
                                                <h5 name="nompre_collaborateur">mission.titre</h5>
                                            </td>
                                            <td>mission.collaborateur.nom</td>
                                            <td>mission.vehicule.immatriculation</td>
                                            <td className="shoping__cart__item__close">
                                                <button className="btn btn-success btn-sm">Accepter</button>
                                                <button className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }}>Refuser</button>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className="shoping__cart__item">
                                                <h5 name="nompre_collaborateur">mission.titre</h5>
                                            </td>
                                            <td>mission.collaborateur.nom</td>
                                            <td>mission.vehicule.immatriculation</td>
                                            <td className="shoping__cart__item__close">
                                                <button className="btn btn-success btn-sm">Accepter</button>
                                                <button className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }}>Refuser</button>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className="shoping__cart__item">
                                                <h5 name="nompre_collaborateur">mission.titre</h5>
                                            </td>
                                            <td>mission.collaborateur.nom</td>
                                            <td>mission.vehicule.immatriculation</td>
                                            <td className="shoping__cart__item__close">
                                                <button className="btn btn-success btn-sm">Accepter</button>
                                                <button className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }}>Refuser</button>
                                            </td>
                                        </tr>
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