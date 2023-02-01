import React from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import './Home.css';
//import Login from "./login";
  
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home Page:</h1>
      <br />
          {/* Endpoint to route to About component */}
            <button type ="button" class = "btn success" onClick={() => navigate("/login")}>Log In</button>
            <button type ="button"  class = "btn info"onClick={() => navigate("/register")}>Sign Up</button>

          
    </div>
  );
};
  
export default Home;