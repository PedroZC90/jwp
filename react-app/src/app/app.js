import React from "react";
import Environment from "../activity/environment";
import logo from "../logo.svg";
import "./app.css";

export default class App extends React.Component {
    render = () => {
        return (
            <div className="app">
                <header className="app-header">
                    {/* <img src={logo} className="app-logo" alt="logo" />
                    <p>Edit <code>src/App.js</code> and save to reload.</p>
                    <a className="app-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
                    <a className="app-link" href="./ar-conditioner" target="_blank" rel="noopener noreferrer">Ar Condicionado</a> */}
                    <Environment temperature={40}></Environment>
                </header>
            </div>
        );
    }
}
