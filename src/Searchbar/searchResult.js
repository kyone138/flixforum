import React, { useRef, useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
//import Button from "@mui/material/Button";
import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import CategoryContext from '../CategoryContext';
import "../ShowCard.css";
import Search from './searchbar';
import "./searchbar.css";
import Logo from "../Logo/logo";

// MAJORITY OF CODE COMES FROM THIS VIDEO FOR DISPLAYING THE SHOWS
// https://www.youtube.com/watch?v=FzWG8jiw4XM&ab_channel=LamaDev
function SearchResult() {
    //grad the search bar input and store it in a the query variable
    const result = useLocation();
    console.log(result.state);
    let query = ''
    if (result.state) {
        console.log(JSON.stringify(result.state.message))
        query = JSON.stringify(result.state.message)
    };
    const [list, setList] = useState([]);
    // handles how far you scroll through list of shows
    //const [listPos, setListPos] = useState(0);
    // sets the shows name to pass to the forums when clicked
    const {selectedShow, setSingleShow} = useContext(CategoryContext);
    // handles updating the position of the shows cards
    const showRef = useRef();
    const navigate = useNavigate();
    // useEffect is used to get the shows but not repeatedly unless this page
    // is navigated to
    useEffect(() => {
        // fetches random shows from Netflix API
        fetch('https://netflix-data.p.rapidapi.com/search/?query='+ query + '&limit_suggestions=1', {
            "method": "GET",
            "headers": {
            'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
            'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        // sets the
        .then((json) => {
            const convert_list = json.titles;
            setList(convert_list);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    return(
        <div className="list">
             <Logo/>
            <div className='search-bar'>
                  <Search/>
            </div>
            <br></br> 
            <div className="recommend"> Search Results:</div>
            <div className="wrapper">
                <div className="container" ref={showRef}>
                    {list.map((show) => (
                        show.summary.type == 'show' ?
                        <Card sx={{width: 225, height: 160, ml: 1}}>
                            <CardActionArea  onClick={
                                    () => {
                                        // console.log(show)
                                        setSingleShow(show);
                                        localStorage.setItem('showID', JSON.stringify(show.summary.id));
                                        localStorage.setItem('showTitle', JSON.stringify(show.jawSummary.title));
                                        localStorage.setItem('showImage', show.jawSummary.backgroundImage.url);
                                        navigate("/forum");
                                    }
                                }>
                                <CardMedia
                                    component="img"
                                    image={show.jawSummary.backgroundImage.url}
                                    height='110'
                                    alt="show image"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="subtitle1">
                                        {show.jawSummary.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        : null
                    ))}
                </div>
            </div>
        </div>
    );

}

export default SearchResult;