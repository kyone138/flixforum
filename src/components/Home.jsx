import { Button, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router";


const Home = () => {
    const navigate = useNavigate();
    return (
        <ButtonGroup>
            <Button onClick={() => navigate("/Login")}>Log In</Button>
            <Button onClick={() => navigate("/Register")}>Sign Up</Button>
        </ButtonGroup>
    );
};

export default Home;