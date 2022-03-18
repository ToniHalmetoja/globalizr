import { Col, Row } from "react-bootstrap";
import { MainContent } from "../global/mapStyles";
import { DisplayMap } from "../global/leafletMap";
import { Sidebar } from "../global/sidebar";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive'

export const Main = () => {

    const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' })

    const [singleCountry, setSingleCountry] = useState(null)

    return (
        <Row>
            <Col>
                <Sidebar singleCountry={singleCountry}/>
            </Col>
            <MainContent>
                <DisplayMap setSingleCountry={setSingleCountry} isBigScreen={isBigScreen}/>
            </MainContent>
        </Row>

    )
}