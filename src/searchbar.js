import React , { useState } from 'react';
import { useNavigate } from "react-router";
import SearchResult from './searchResult';

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
            <SearchResult message = {searchInput}></SearchResult>
            navigate("/searchResult");
        }
    };


    return (
        <>
        <input
            type="text"
            placeholder="Enter a TV show"
            onChange={handleChange}
            onKeyUp={handleKeyPress}
            value={searchInput} />
            <SearchResult message = {searchInput}></SearchResult>
        </>

    );
} 

export default Search;