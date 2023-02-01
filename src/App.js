import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
//import logo from './logo.svg';
//import { Login } from "./Login";
//import { Register } from "./Register";
import { Link } from "react-router-dom";


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Axios from 'axios';
// import Home component
import Home from "./Home";
import  Login  from "./Login";
import Register  from "./Register";



function App() {
  //const [currentForm, setCurrentForm] = useState('/login');


  /*
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }*/
  
  

    //npx kill-port 3000
  /*
        <div className="App">
    {
      currentForm === "/Home" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      
    }
    
  </div>
    <div className="App">
    {
      currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      
    }
    
  </div>
     
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        
      }
    </div>
             <Route exact path='/Login' element={<Login/>}></Route>
          <Route exact path='/register' element={<Register/>}></Route>
  */
    //<Route exact path='/Login' element={<Login/>}></Route>
    //<Route exact path='/register' element={<Register/>}></Route>

  return (
    
    <>
    {/* This is the alias of BrowserRouter i.e. Router */}
    <Router>
      <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/register' element={<Register/>}></Route>
        </Routes>
      </Router>
    

    
                  
      
    </>
    

  );
}

export default App;
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
		  Flix Forum Website Current Homepage
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default App;
*/