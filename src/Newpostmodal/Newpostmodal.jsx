import React, { useState } from "react";
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import '../Newpostmodal/Newpostmodal.css'
import close from './close.svg';
//Modal: https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

export const Newpostmodal = (props) => {
    // to use to grab forum_id from DB 
    // need to grab from the actual froum page
    const show_title = "criminal minds"; 
    const season_number = 1; 
    const episode_number = 1;
    //const forum_id = "1";

    // getting user ID
    const user_id = localStorage.getItem('member');
    //console.log("user_id", user_id);

    // getting post title and content 
    const [postInput, setPostInput] = useState("");
    const [postTitleInput, setPostTitleInput] = useState("");

    if(!props.show) {
        return null
    }

    const newpostmodal = () => {
        console.log("inside new post modal and clicked submit");
        Axios.post('http://localhost:3001/newpostmodal', {
          posttitle: postTitleInput,  
          postcontent: postInput,
          userid: user_id,
          showtitle: show_title,
          season: season_number,
          episode: episode_number,
          //forum_id: forum_id,
        })
    }

    const handleChangePostTitle = (e) => {
        e.preventDefault();
        setPostTitleInput(e.target.value);
        // console.log('title:', postTitleInput);
    };

    const handleChangePost = (e) => {
        e.preventDefault();
        setPostInput(e.target.value);
        // console.log('post:', postInput);
    };

    return (
        <>
        <form>
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">New Post Forum</h4>
                    <img class="buttonclose" src={close} width="26" height="26" onClick={props.onClose}/>
                </div>
                <div className="comment-title">
                <textarea
                    class = "comment-title-box"
                    type="text"
                    maxLength = "50"
                    placeholder="Enter your post title here"
                    onChange={handleChangePostTitle}
                    value={postTitleInput} 
                    required/>
                </div>
                <div className="modal-post">
                <textarea
                    class = "post-box"
                    type="text"
                    maxLength = "256"
                    placeholder="Enter your post here"
                    onChange={handleChangePost}
                    value={postInput}
                    required/>
                </div>
                <div className="modal-footer">
                  <button onClick = {newpostmodal} className="buttonsubmit">Submit</button>
                </div>
            </div>
        </div>
        </form>
        </>
    )

}

export default Newpostmodal;