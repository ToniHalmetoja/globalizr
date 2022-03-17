import "./mapStyles.css"
import { Container } from "react-bootstrap";

export function Sidebar({singleCountry}) {

    return (
        <Container className="sidebar">
            <h1>Welcome to GlobalizR</h1>
            {singleCountry ? <p>Currently selected: {singleCountry.properties.ADMIN} </p>: <p>Click a country to add experiences</p>}
        </Container>
    )
}