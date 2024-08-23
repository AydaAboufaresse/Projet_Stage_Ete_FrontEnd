import React, { useState } from "react";
import './LoginForm.css';
import { FaUserAlt } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import OCPLogo from '../Assets/OCP-logo.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8087/api/admin/auth/signin', {
                username,
                password
            });

            const {
                token,
                id,
                nom,
                prenom,
                date_naissance,
                service,
                tel,
                cin,
                position,
                email,
                genre,
                adress,
                imageUrl,
                type_utilisateur
            } = response.data;
            console.log('Type Utilisateur:', type_utilisateur);

            if (type_utilisateur !== 'Responsable') {
                Swal.fire({
                    icon: 'error',
                    title: 'Accès refusé',
                    text: 'Vous n\'êtes pas autorisé à accéder à cette application',
                });
                return; 
            }


            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({
                id,
                nom,
                prenom,
                date_naissance,
                username,
                service,
                tel,
                cin,
                position,
                email,
                genre,
                adress,
                imageUrl
            }));

            navigate("/Home");
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Nom d\'utilisateur ou mot de passe incorrect',
                });
            } else if (error.request) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Aucune réponse du serveur',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite',
                });
            }
        }
    }

    return (
        <div className="login-background">
            <div className="logo-container">
                <img src={OCPLogo} alt="OCP Logo" className="logo" />
            </div>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Se Connecter</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <FaUserAlt className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <MdOutlinePassword className="icon" />
                    </div>
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;