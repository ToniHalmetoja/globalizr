import { useNavigate } from "react-router";
import { Container, Button, Col, Row } from "react-bootstrap";
import { DisplayMap } from "../global/leafletMap";
import { Sidebar } from "../global/sidebar";
import { useState, useEffect } from "react";



export const Main = () => {

    const [singleCountry, setSingleCountry] = useState(null)

    return (
        <Row>
            <Col>
                <Sidebar singleCountry={singleCountry}/>
            </Col>
            <Col>
                <DisplayMap setSingleCountry={setSingleCountry}/>
            </Col>
        </Row>

    )
}