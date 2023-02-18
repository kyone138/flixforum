import React, { useState} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Search from './searchbar';

export default function SearchResult (props) {

    const result = useLocation();
    console.log(result.state);
    const [displayShow, setDisplayedShow] = useState(false);
    let query = ''
    if (result.state) {
        console.log(JSON.stringify(result.state.message))
        query = JSON.stringify(result.state.message)
    };

    let seen_shows = [];
    fetch('https://netflix-data.p.rapidapi.com/search/?query='+ query + '&limit_suggestions=1', {
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
        if (item.summary.type == 'show' && !seen_shows.includes(item.jawSummary.title)) {
          console.log("this is a show");
          // console.log(item);
          seen_shows.push(item.jawSummary.title);
          console.log('seen shows array:')
          console.log(seen_shows);
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

    return (
        <>
        <h2>Search Input: {query}</h2>
        </>
    );
};