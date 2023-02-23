import { useNavigate } from "react-router-dom";
import "./Loginpage.css";
const AuthLogo = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="logo-button" onClick={handleNavigate}>
      <h1>FLIXFORUM</h1>
    </div>
  );
};

export default AuthLogo;
