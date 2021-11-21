import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthService from "../services/auth";
import "./app.css";

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!AuthService.isLoggedIn()) {
            navigate("/login", { replace: true });
        }
    });

    const logout = (event) => {
        event.preventDefault();
        AuthService.logout();
        navigate("/login");
    }

    return (
        <div className="app">
            <nav>
                <Link to="/comics">Comics</Link>
                <a onClick={ logout }>Logout</a>
            </nav>
            <Outlet />
        </div>
    );
};

export default App;
