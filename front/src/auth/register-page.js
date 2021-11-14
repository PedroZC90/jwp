import React, { useState } from "react";

import AuthService from "../services/auth";
import { axios } from "../axios";

import "./styles.css";
import { useNavigate } from "react-router";

const Registration = () => {

    const navigate = useNavigate();
    const [ state, setState ] = useState({ name: "", email: "", password: "", password_confirm: "" });

    function onChange(event) {
        const key = event.target.name;
        const value = event.target.value;
        setState({ ...state, [key]: value });
    }

    async function onSubmit(event) {
        event.preventDefault();

        const password = state.password;
        const password_confirm = state.password_confirm;
        if (password !== password_confirm) return;
        
        const response = await axios.post("/auth/register", state);
        if (!response || !response.data) return;

        
        const user = response.data.user;
        console.log("REGISTERED USER:", user);
        
        const token = response.data.token;
        if (token) {
            AuthService.setToken(token);
            navigate("/comics", { state: { isLoggedIn: true } });
        } else {
            navigate("/loogin");
        }
    }

    function isSubmitEnabled() {
        return !(
            state.email.length > 0 &&
            state.password.length > 0 &&
            state.password_confirm.length > 0 &&
            state.password === state.password_confirm
        );
    }
    
    return (
        <div className="registration wrapper">
            <form className="form-grid">
                <input id="name" name="name" type="name" placeholder="Name" onChange={ onChange } value={ state.name } />
                <input id="email" name="email" type="email" placeholder="Email" onChange={ onChange } value={ state.email } />
                <input id="password" name="password" type="password" placeholder="Password" onChange={ onChange } value={ state.password } />
                <input id="password_confirm" name="password_confirm" type="password" placeholder="Password Confirm" onChange={ onChange } value={ state.password_confirm } />
                <button id="submit" disabled={ isSubmitEnabled() } onClick={ onSubmit }>Register</button>
            </form>
        </div>
    );

}

export default Registration;
