import './App.css';
import Login from './components/Login/Login';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignUp from './components/Login/Register';
import UserContext from "./components/AccountContext";
import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";

function App() {
  return (
    <UserContext>
      <Views />
    </UserContext>
  );
}

export default App;
