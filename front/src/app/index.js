import React from "react";

import Login from "../auth/login"
import Registration from "../auth/registration";

import logo from "../.assets/logo.svg";
import "./app.css";

export default class App extends React.Component {
    
    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <p>Edit <code>src/App.js</code> and save to reload.</p>
                    <a className="app-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
                </header>
                <Login></Login>
                <Registration></Registration>
            </div>
        );
    }

}
