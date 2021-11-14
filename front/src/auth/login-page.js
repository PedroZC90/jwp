import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axios } from "../axios";

import AuthService from "../services/auth";
import "./styles.css";

const Login = () => {
    const navigate = useNavigate();
    const [ credentials, setCredentials ] = useState({ email: "", password: "" });
    
    function onChange(event) {
        const key = event.target.name;
        const value = event.target.value;
        setCredentials({ ...credentials, [key]: value });
    }

    async function onSubmit(event) {
        event.preventDefault();
        
        const response = await axios.post("/auth", { credentials });
        if (!response || !response.data) return;

        const token = response.data.token;
        AuthService.setToken(token);
        if (!token) return;
        navigate("/comics", { state: { isLoggedIn: true } });
    }
    
    return (
        <div className="login wrapper">
            <form className="form-grid">
                <input id="email" name="email" type="email" placeholder="Email" onChange={ onChange } value={ credentials.email } />
                <input id="password" name="password" type="password" placeholder="Password" onChange={ onChange } value={ credentials.password } />
                <button id="submit" onClick={ onSubmit }>Login</button>
                <Link className="text-center" to="/register">Register</Link>
            </form>
        </div>
    );

}

export default Login;
