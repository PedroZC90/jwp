import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthService from "../services/auth";
import "./app.css";

const App = () => {
    const navigate = useNavigate();

    // if (!AuthService.isLoggedIn()) {
    //     navigate("/login", { replace: true });
    // }

    // useEffect(() => {
    //     console.log("USE EFFECT APP");
    // })
    const logout = (event) => {
        event.preventDefault();
        AuthService.logout();
        navigate("/login");
    }

    return (
        <div className="app">
            <nav>
                {/* <Link to="/">Home</Link> */}
                {/* <Link to="/login">Login</Link> */}
                <Link to="/comics">Comics</Link>
                <a onClick={ logout }>Logout</a>
            </nav>
            <Outlet />
        </div>
    );
};

export default App;
