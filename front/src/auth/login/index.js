import React from "react";
import { axios } from "../../axios";

import "./styles.css";

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = { email: "", password: "" };
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = async (event) => {
        event.preventDefault();
        
        const response = await axios.post("/auth", { credentials: this.state });
        console.log(response);
        if (response && response.data) {
            const token = response.data.token;
            localStorage.setItem("token", token);
        }
    }
    
    render() {
        return (
            <div className="login">
                <form className="login-form">
                    <input id="email" name="email" type="email" onChange={ this.onChange } value={ this.state.email } />
                    <input id="password" name="password" type="password" onChange={ this.onChange } value={ this.state.password } />
                    <button id="submit" onClick={ this.onSubmit }>Login</button>
                </form>
            </div>
        );
    }

}
