import { useNavigate } from "react-router";
import { Container, Button } from "react-bootstrap";
import { DisplayMap } from "../global/leafletMap";



export const Main = () => {
    return (
        <Container>
            <DisplayMap/>
        </Container>

    )
}