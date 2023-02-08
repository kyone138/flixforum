import React from 'react';
import { useLocation } from 'react-router-dom';
import Search from './searchbar';

export default function SearchResult (props) {

    const result = useLocation();
    console.log(result.state);
    let query = ''
    if (result.state) {
        console.log(JSON.stringify(result.state.message))
        query = JSON.stringify(result.state.message)
    };
    return (
        <>
        <h2>Search Input: {query}</h2>
        </>
    );
};