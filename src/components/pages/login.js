import { useNavigate } from "react-router";
import { Container, Button } from "react-bootstrap";

export const Login = () => {

    const navigate = useNavigate()

    const handleLogin = (evt) => {
        navigate("/main")
    }

    return (
        <Container>
            <h1>GlobalizR</h1>
            <h2>Your caleidoscope of experiences</h2>
            <Button onClick={(evt) => handleLogin(evt)}>Log into GLOBALIZR!</Button>
        </Container>

    )
}