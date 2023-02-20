import React from "react";
import { useNavigate } from "react-router-dom";
import "./logo.css";

function Logo() {
    const navigate = useNavigate();
    return (
        <button type="button" className="logo-flixforum" onClick={() => navigate("/")}>FLIXFORUM</button>
    )

}
export default Logo;