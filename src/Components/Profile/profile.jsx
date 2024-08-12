import React, { useState, useEffect } from "react";
import OCPLogo from '../Assets/OCP_Group.png';
import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBellFill, BsChevronDown } from "react-icons/bs";
import avatar from '../Assets/pro.png';
import imagepro from '../Assets/pro.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Profile = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        service: '',
        tel: '',
        email: '',
        adress: '',
        cin: '',
        position: '',
        date_naissance: '',
        genre: '',
        imageUrl: '',
        username: ''
    });

    const MySwal = withReactContent(Swal);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            const username = JSON.parse(localStorage.getItem('user')).username;
            axios.get(`http://localhost:8087/api/utilisateur/username/${username}`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = JSON.parse(localStorage.getItem('user')).username;

        axios.put(`http://localhost:8087/api/utilisateur/username/${username}`, userData)
            .then(response => {
                MySwal.fire('Succès', 'Profile mis à jour avec succès', 'success');
            })
            .catch(err => {
                console.error(err);
                MySwal.fire('Erreur', 'Échec de la mise à jour du profile', 'error');
            });
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('token');
        const username = JSON.parse(localStorage.getItem('user')).username;
        
        axios.post(`http://localhost:8087/api/utilisateur/upload/profile-image/${username}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            Swal.fire('Succès', 'Image de profil mise à jour avec succès', 'success');
            setUserData(prevState => ({ ...prevState, imageUrl: file.name }));
        })
        .catch(err => {
            console.error(err);
            Swal.fire('Erreur', 'Échec du téléchargement de l\'image', 'error');
        });
    };

    const showProfileImageUpload = () => {
        MySwal.fire({
            title: 'Changer photo de profil',
            html: (
                <input
                    type="file"
                    id="profileImageInput"
                    onChange={handleProfileImageChange}
                    style={{ display: 'block', margin: '10px auto' }}
                />
            ),
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
                const input = document.getElementById('profileImageInput');
                if (!input.files[0]) {
                    Swal.showValidationMessage('Veuillez sélectionner un fichier');
                }
            }
        });
    };
    const handleChangePassword = () => {
        MySwal.fire({
            title: 'Changer le mot de passe',
            html: `
                <input type="password" id="currentPassword" class="swal2-input" placeholder="Mot de passe actuel">
                <input type="password" id="newPassword" class="swal2-input" placeholder="Entrez votre nouveau mot de passe">
                <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirmer mot de passe">
            `,
            showCancelButton: true,
            confirmButtonText: 'Changer',
            cancelButtonText: 'Annuler',
            preConfirm: () => {
                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = document.getElementById('newPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
    
                if (!currentPassword || !newPassword || !confirmPassword) {
                    Swal.showValidationMessage('Veuillez remplir tous les champs');
                    return false;
                }
                if (newPassword !== confirmPassword) {
                    Swal.showValidationMessage('Les mots de passe ne correspondent pas');
                    return false;
                }
    
                const username = JSON.parse(localStorage.getItem('user')).username;
                const token = localStorage.getItem('token'); // Get the token from localStorage
    
                return axios.post(`http://localhost:8087/api/utilisateur/validate-password/${username}`, { currentPassword }, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the headers
                    }
                })
                .then(response => {
                    if (response.data.valid) {
                        return axios.put(`http://localhost:8087/api/utilisateur/change-password/${username}`, { newPassword }, {
                            headers: {
                                'Authorization': `Bearer ${token}` // Include the token in the headers
                            }
                        });
                    } else {
                        Swal.showValidationMessage('Mot de passe actuel incorrect');
                        return false;
                    }
                })
                .then(() => {
                    Swal.fire('Succès', 'Mot de passe changé avec succès', 'success');
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire('Erreur', 'Échec du changement de mot de passe', 'error');
                });
            }
        });
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
                                                <li><a href="#" onClick={handleLogout}>Déconnexion</a></li>
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
                <div className="mt-3 "style={{ textAlign: 'right' }}>
                    <button className="btn image-profile" onClick={handleChangePassword}>
                        Changer le mot de passe
                    </button>
                </div>

                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img
                                className="rounded-circle mt-5"
                                width="100px"
                                height="100px"
                                style={{ borderRadius: '50%' }}
                                src={userData.imageUrl ? `http://localhost:8087/api/utilisateur/image/${userData.imageUrl}` : imagepro}
                                alt="Profile"
                            />
                            <span className="font-weight-bold">{userData.nom} {userData.prenom}</span>
                            <span className="text-black-50">{userData.email}</span>
                            <span> </span>
                            <button className="btn image-profile" onClick={showProfileImageUpload}>
                                Changer photo de profile
                            </button>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="p-3 py-5">
                            <form onSubmit={handleSubmit}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Profile</h4>
                                </div>
                                <div className="row mt-2">
                                <div className="col-md-12">
                                    <label className="labels">Nom d'utilisateur</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={userData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                    <div className="col-md-6">
                                        <label className="labels">Nom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nom"
                                            name="nom"
                                            value={userData.nom}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="labels">Prenom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Prenom"
                                            name="prenom"
                                            value={userData.prenom}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label className="labels">Poste de Travail</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Entrez Votre Poste"
                                            name="position"
                                            value={userData.position}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Numero de Téléphone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Entrez Votre Numero de Téléphone"
                                            name="tel"
                                            value={userData.tel}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">E-mail</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Entrez Votre E-mail"
                                            name="email"
                                            value={userData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Adresse</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Entrez Votre Adresse"
                                            name="adress"
                                            value={userData.adress}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">CIN</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Entrez Votre CIN"
                                            name="cin"
                                            value={userData.cin}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Service</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Entrez Votre Service"
                                            name="service"
                                            value={userData.service}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Date de Naissance</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="date_naissance"
                                            value={userData.date_naissance}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Genre</label>
                                        <select
                                            className="form-control"
                                            name="genre"
                                            value={userData.genre}
                                            onChange={handleChange}
                                        >
                                            <option value="">{userData.genre}</option>
                                            <option value="homme">Homme</option>
                                            <option value="femme">Femme</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <button className="btn btn-primary profile-button" type="submit">
                                        Sauvegarder Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
