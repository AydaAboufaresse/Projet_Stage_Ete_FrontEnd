import React, { useState } from "react";
import OCPLogo from '../Assets/OCP_Group.png'; 
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBellFill, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import avatar from '../Assets/pro.png'; 

const Home = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    return (
        <body>
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header__logo">
                                <img src={OCPLogo} alt="OCP Logo" className="logo"/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu">
                                <ul>
                                    <li className="active"><a href="/Home">Home</a></li>
                                    <li><a href="#">Missions</a></li>
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
                                            <img src={avatar} alt="User Avatar" className="avatar"/>
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
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="hero__categories">
                                <div className="hero__categories__all" onClick={toggleCategories}>
                                    <FaBars className="bar-icon" />
                                    <span>Tous les Missions</span>
                                    {<BsChevronDown className="arrowad" />}
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
                        <div class="col-lg-9">
                        <div class="hero__search">
                        <div class="hero__search__form">
                            <form action="#">
                                <div class="hero__search__categories">
                                    Les Collaborateurs
                                    <span class="arrow_carrot-down"></span>
                                </div>
                                <input type="text" placeholder="Où est situé le collaborateur ?"/>
                                <button type="submit" class="site-btn">Recherche</button>
                            </form>
                        </div>
                       </div>
                    <div class="map" data-setbg="">
                        
                    </div>
                </div>
                    </div>
                </div>
            </section>
        </body>
    );
}

export default Home;
