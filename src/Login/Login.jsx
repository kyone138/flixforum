import React, { useState } from "react";
import Axios from 'axios'
import { Home } from "../Home";
import { Link } from "react-router-dom";
import App from "../App";



export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    //added
    const [loginStatus, setLoginStatus] = useState("");


    const login = () => {
        Axios.post("http://localhost:3001/login", {
          email: email,
          password: pass,
        }).then((response) => {
            if(response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].username);
            }
          //console.log(response);
        });
    }
   

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
    }
 
    return (
        <>

    <div className="App">
        
        <div className="auth-form-container">
            <h2>Login</h2>
            <form action='/Home' className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button onClick={login} type="submit" >Log In</button>
            </form>
            <Link to= "/register">Don't have an account? Register here.</Link>
            {/*<button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>*/}
            <h1>{loginStatus}</h1>
        </div>
    </div>
        </>
    )
}
export default Login;
