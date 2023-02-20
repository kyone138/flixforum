import React , { useState } from 'react';
import { useNavigate } from "react-router";
import "./searchbar.css";
import searchbar from "./searchbar.png"



export const Search = () => {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log("clicked enter");
            navigate("/searchResult", {state: {message: searchInput}});
        }
    };


    return (
        <>
        <div className = "search-bar-icon">
            {/* <div className = "icon"> */}
                <img className="searchicon" src={searchbar} /> 
            {/* </div> */}
            <input className= "search-bar"
            size="50"
            type="text"
            placeholder="Enter a TV show"
            onChange={handleChange}
            onKeyUp={handleKeyPress}
            value={searchInput} />
           
        </div>
        </>

    );
} 

export default Search;