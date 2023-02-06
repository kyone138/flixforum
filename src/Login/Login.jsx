import React, { useState } from "react";
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import "./Loginpage.css";



export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

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
                navigate('/');
            }
        });
    }
   

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
    }
 
    return (
    <>
        <div className="App2">
            <div className="auth-form-container">
                <h2>Login</h2>
                <form action='/Home' className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="password">password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    <button onClick={login} type="submit" >Log In</button>
                </form>
                <br></br>
                <Link to= "/register">Don't have an account? Register here.</Link> 
                <h1>{loginStatus}</h1>
            </div>
        </div>
    </>
    )
}
export default Login;
