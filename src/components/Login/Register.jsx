import React, { useState } from "react";
import Axios from 'axios'

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    //const [name, setName] = useState('');

    const register = () => {
        Axios.post('http://localhost:3001/register', {
          username: email,
          password: pass,
        }).then((response) => {
          console.log(response);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
    }

    // <label htmlFor="name">Full name</label>
    //<input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
                //onClick={register}
                //onSubmit={handleSubmit}

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" >
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button onClick = {register} type="submit">Sign Up</button>

        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}

export default Register;