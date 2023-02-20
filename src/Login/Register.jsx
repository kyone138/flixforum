import React, { useState } from "react";
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/logo";

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const register = () => {
        Axios.post('http://localhost:3001/register', {
          username: name,  
          email: email,
          password: pass,
        })
        if (name !== '' && email !== '' && pass !== '') {
            navigate('/login');
        }
    }

    return (
    <>
    <div className = "logo-button"><Logo/></div>
    <div className="App2">
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" >
            <label htmlFor="name">username</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="username" required />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" required />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required />
            <button onClick = {register} type="submit">Sign Up</button>

        </form>
        <br></br>
        <Link to= "/login">Already have an account? Log In here.</Link>
    </div>
    </div>
    </>
    )
}

export default Register;