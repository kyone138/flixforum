import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Forumpage.css";
import Modal from '../Newpostmodal/Newpostmodal';
import CategoryContext from "../CategoryContext";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Logo from "../Logo/logo";
import LikeButton from "../LikeButton/LikeButton";

// https://codesandbox.io/s/edmekk?file=/demo.tsx
function Forum() {
    // holds the login status of the user
    const {loginStatus} = useContext(CategoryContext);
    // holds data of the show that was picked by the user
    const {selectedShow, setSingleShow} = useContext(CategoryContext);
    const [seasonList, setSeasonList] = useState([]);
    const [currSeason, setCurrSeason] = useState('');
    const [episodeList, setEpisodeList] = useState([]);
    const [currEp, setCurrEp] = useState('');
    // used for creating posts
    const [show, setShow] = useState(false);
    // grabs the member info from the local storage
    const curr = localStorage.getItem('member');
    const ID = localStorage.getItem('showID');
    const Title = localStorage.getItem('title');
    const Image = localStorage.getItem('showImage');
    // used to move between home and forum pages
    const navigate = useNavigate();

    // localStorage.setItem('title', Title);
    // fetches the seasons of the selected show
    const seasonQuery = 'https://netflix-data.p.rapidapi.com/title/seasons/?ids='+ ID +'&offset=0&limit=25';
    // grabs the seasons of a show
    useEffect(() => {
        fetch(seasonQuery, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
                'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then((json) => {
            const convert_season = json[0];
            // console.log('convert season: ', convert_season);
            setSeasonList(convert_season.seasons);
        })
        .catch(err => {
            console.log(err);
        })
    }, [seasonQuery]);

    const episodeQuery = 'https://netflix-data.p.rapidapi.com/season/episodes/?ids='+ currSeason +'&offset=0&limit=25';
    useEffect(() => {
        fetch(episodeQuery, {
            method: 'GET',
	        headers: {
                'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
                'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
	        }
        })
        .then(response => response.json())
        .then((json) => {
            // console.log('episodes: ', json[0]);
            const convert_epi = json[0].episodes;
            setEpisodeList(convert_epi);
        })
        .catch(err => {
            console.log(err);
        })
    }, [episodeQuery]);

    return (
        <>
        <div className="forumspage">
        <Logo/>
            {/* <br></br> */}
            <div className="tvshowpicture">
                {Image && <img 
                src={Image}
                alt={Title}
                height='380'
                width='750'
                ></img>}
            </div>
            <div className = "show-title">{Title && <div>{Title}</div>}</div>
            <div className="dropdownSeason">
                <Box sx={{minWidth: 20}}>
                <FormControl fullWidth>
                    <InputLabel id="seasonPicker" style={{color: '#FFFFFF'}}>Season</InputLabel>
                    <Select
                    value={currSeason}
                    label="seasonSelector"
                    style={{backgroundColor: '#414141', color: '#FFFFFF', width: 175}}
                    onChange={e => {setCurrSeason(e.target.value);localStorage.setItem('season', JSON.stringify(e.target.value))}}
                    >
                    {seasonList.map((season) => (
                        <MenuItem 
                            style={{backgroundColor: '#414141', color:'#FFFFFF'}}
                            value={season.seasonId}
                            key={season.seasonId}
                        >
                        {season.shortName}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </Box>
            </div>
            <div className="dropdownEpisode">
                <Box sx={{minWidth: 20}}>
                    <FormControl fullWidth>
                        <InputLabel id="episodePicker" style={{color: '#FFFFFF'}}>Episodes</InputLabel>
                        <Select
                            value={currEp}
                            label="episodeSelector"
                            style={{backgroundColor: '#414141', color: '#FFFFFF', width: 400}}
                            onChange={e =>{setCurrEp(e.target.value); localStorage.setItem('episode', JSON.stringify(e.target.value))}}
                        >
                            {/* {console.log(episodeList)} */}
                        {episodeList.map((episode) => (
                            <MenuItem 
                                style={{backgroundColor: '#414141', color:'#FFFFFF'}}
                                value={episode.summary.id}
                                key={episode.summary.id}
                            >
                                {episode.title}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div>{currEp && <div>{console.log("current episode id:", currEp)}</div>}</div>
            <div style={{color: '#FFFFFF'}}>{currEp && <div>curr episode: {currEp}</div>}</div>
            {
                (loginStatus || curr) ? 
                <div className="newpost">
                    <br></br>
                    <br></br>
                    <br></br>
                    <button className="newpost-button" onClick={() => setShow(true)}>New Post</button>
                    <Modal onClose = {() => setShow(false)} show={show}/>
                </div> : 
                // redirect to login if not logged in
                <div className="newpost">
                    <br></br>
                    <br></br>
                    <br></br>
                    <button type ="button" class = "btn success" onClick={() => navigate("/login")}>New Post</button>
                </div> 
            }
            <LikeButton />
        </div>
        </>
    )
}

export default Forum;