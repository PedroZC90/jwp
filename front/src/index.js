import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./app";
import Login from "./auth/login-page";
import Registration from "./auth/register-page";
import ComicList from "./comics/comic-list";
import ComicPage from "./comics/comic-page";
import NotFound from "./not-found";

const root = document.getElementById("root");

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ (false) ? <Navigate replace to="/login" /> : <App />} >
                    <Route path="/comics" element={<ComicList />} />
                    <Route path="/comics/:_id" element={<ComicPage />} />
                    <Route path="/comics/create" element={<ComicPage />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    root,
);
