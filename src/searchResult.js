import React from 'react';
import Search from './searchbar';

export default function SearchResult (props) {

    console.log(props);

    return (
        <>
        <h1>{props.message}</h1>
        <h2>{'i am going to kill myself'}</h2>;
        </>
    );
};