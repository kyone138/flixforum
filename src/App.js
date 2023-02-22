import React, {useState} from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CategoryContext from './CategoryContext';
import Home from "./Home";
import Register from './Login/Register';
import Login from './Login/Login';
import Forum from './Forum/Forum';
import SearchResult from "./Searchbar/searchResult";
import Newpostmodal from './Newpostmodal/Newpostmodal';
import ShowCard from './ShowCard';
import './App.css';

function App() {

  const [loginStatus, setLoginStatus] = useState(false);
  const [selectedShow, setSingleShow] = useState([]);
  return (
    <>
    {/* This is the alias of BrowserRouter i.e. Router */}
    <Router>
      <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path='/' element={
            <CategoryContext.Provider value={{loginStatus, setLoginStatus, selectedShow, setSingleShow}}>
              <div className="main">
                <Home/>
                <ShowCard/>
              </div>
            </CategoryContext.Provider>}>
          </Route>
          <Route exact path='/login' element={
            <CategoryContext.Provider value={{loginStatus, setLoginStatus}}>
              <Login/>
            </CategoryContext.Provider>}>
          </Route>
          <Route exact path='/register' element={<Register/>}></Route>
          <Route exact path='/forum' element={
            <CategoryContext.Provider value={{loginStatus, setLoginStatus, selectedShow, setSingleShow}}>
              <Forum/>
            </CategoryContext.Provider>}>
          </Route>
          <Route exact path='/newpostmodal' element={<Newpostmodal/>}></Route>
          <Route exact path='/searchResult' element={<CategoryContext.Provider value ={{selectedShow, setSingleShow}}> 
            <SearchResult/>
            </CategoryContext.Provider>}>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;