import React from "react";
import { axios } from "../../axios";

import "./styles.css";

export default class Registration extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: ""
        };
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = async (event) => {
        event.preventDefault();
        
        const response = await axios.post("/users", this.state);
        if (response && response.data) {
           const user = response.data.token;
           console.log(user);
        }
    }
    
    render() {
        return (
            <div className="registration">
                <form className="registration-form">
                    <input id="name" name="name" type="name" onChange={ this.onChange } value={ this.state.name } />
                    <input id="email" name="email" type="email" onChange={ this.onChange } value={ this.state.email } />
                    <input id="password" name="password" type="password" onChange={ this.onChange } value={ this.state.password } />
                    <button id="submit" onClick={ this.onSubmit }>Register</button>
                </form>
            </div>
        );
    }

}
