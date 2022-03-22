import { Col, Row } from "react-bootstrap";
import { MainContent } from "../global/mapStyles";
import { DisplayMap } from "../global/leafletMap";
import { Sidebar } from "../global/sidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useMediaQuery } from 'react-responsive'

export function Main ({token}) {

    const navigate = useNavigate()

    // useEffect(()=>{
    //     console.log(token);
    //     if(!token) navigate("/");
    //   }, [])

    const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' })

    const [singleCountry, setSingleCountry] = useState(null)

    return (
        <>
        <Row>
            <Col>
                <Sidebar singleCountry={singleCountry}/>
            </Col>
            <MainContent>
                <DisplayMap setSingleCountry={setSingleCountry} isBigScreen={isBigScreen}/>
            </MainContent>
        </Row>
        </>
    )
}