import React from "react";
import { Link, Outlet } from "react-router-dom";

import "./app.css";

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/comics">Comic</Link>
                    <Link to="/comics/create">Create Comic</Link>
                </nav>
                <Outlet />
            </div>
        );
    }

}
