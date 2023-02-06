import React from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom";
import Register  from "./Login/Register";
import Login from './Login/Login';
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import './Home.css';
/** Citations
 * Frontend Login Page: https://www.youtube.com/watch?v=Y-XW9m8qOis
 * Backend Login Page: https://www.youtube.com/watch?v=W-sZo6Gtx_E , https://www.youtube.com/watch?v=W8jySpfRUDY 
 */
 


fetch('https://netflix-data.p.rapidapi.com/search/?query=&limit_titles=10&limit_suggestions=1', {
      "method": "GET",
      "headers": {
        'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
        'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
      }
    })
    .then(response => response.json())
    .then(data => {
      // holds a list of stuff pulled from API
      const list = data.titles;
      list.map((item) => {
        // only continue if data is a show
        if (item.summary.type == 'show') {
          console.log("this is a show");
          console.log(item);
          const name = item.jawSummary.title;
          const poster = item.jawSummary.backgroundImage.url;
          const show = `<li><img src="${poster}"> <h2>${name}</h2></li>`
          document.querySelector('.movies').innerHTML += show;

        }
      })
    })
    .catch(err => {
      console.log(err);
    })

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home Page:</h1>
      <br />
          {/* Endpoint to route to About component */}
            <button type ="button" class = "btn success" onClick={() => navigate("/login")}>Log In</button>
    </div>
  );
};
  
export default Home;