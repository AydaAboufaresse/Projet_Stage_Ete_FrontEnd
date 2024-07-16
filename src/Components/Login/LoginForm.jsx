import React from "react";
import './LoginForm.css';
import { FaUserAlt } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import OCPLogo from '../Assets/OCP-logo.png'; 
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/Home");
    }

    return(
        <div className="login-background">
            <div className="logo-container"> 
                <img src={OCPLogo} alt="OCP Logo" className="logo" />
            </div>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Se Connecter</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Nom d'utilisateur" required />
                        <FaUserAlt className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <MdOutlinePassword className="icon"/>
                    </div>
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;
