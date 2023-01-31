import { Button, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router";


const MainPage = () => {
    const navigate = useNavigate();
    return (
        <ButtonGroup>
            <Button onClick={() => navigate("/LogIn")}>Log In</Button>
            <Button onClick={() => navigate("/Register")}>Sign Up</Button>
        </ButtonGroup>
    );
};

export default MainPage;