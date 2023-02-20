import React, { useState, useContext } from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { useNavigate } from "react-router";
import CategoryContext from "./CategoryContext";
import Search from './Searchbar/searchbar';
import './Home.css';
import Logo from "./Logo/logo";

/** Citations
 * Frontend Login Page: https://www.youtube.com/watch?v=Y-XW9m8qOis
 * Backend Login Page: https://www.youtube.com/watch?v=W-sZo6Gtx_E , https://www.youtube.com/watch?v=W8jySpfRUDY 
 */



const Home = () => {
  const {loginStatus, setLoginStatus} = useContext(CategoryContext);
  console.log(loginStatus);

  const curr = localStorage.getItem('member');
  const logout = () => {
    setLoginStatus(false);
    localStorage.removeItem('member');
    console.log(loginStatus);
  };

  const navigate = useNavigate();
  return (
    <>
    <div className = 'homepage'>
      <div className = 'logo'>
        <Logo/> </div>
        <br />
        <div className = "search-and-login">
          <div className='search-bar'>
                  <Search/>
          </div>
          <div className = "login-buttons">
              {/* Endpoint to route to About component */}
              {
                (loginStatus || curr) ?  
                  <button type ="button" class = "btn success" onClick={logout}>Log Out</button> : 
                  <button type ="button" class = "btn success" onClick={() => navigate("/login")}>Log In</button>
              }
          </div>
        </div>
      {/* </div> */}
    </div>
    <button type ="button" class = "btn info" onClick={() => navigate("/forum")}>forums</button>
    </>
  );
};
  
export default Home;