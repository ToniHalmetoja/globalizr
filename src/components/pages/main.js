import { Col, Row } from "react-bootstrap";
import { MainContent } from "../global/mapStyles";
import { DisplayMap } from "../global/leafletMap";
import { Sidebar } from "../global/sidebar";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive'

export function Main ({token, logout}) {

    const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' })

    const [singleCountry, setSingleCountry] = useState(null)
    const [allExperiences, setAllExperiences] = useState(null)
    const [selectedExperiences, setSelectedExperiences] = useState(null)
    const [success, setSuccess] = useState(0)

    return (
        <>
        <Row>
            <Col>
                <Sidebar singleCountry={singleCountry} logout={logout} token={token} selectedExperiences={selectedExperiences} allExperiences={allExperiences} setSuccess={setSuccess} success={success}/>
            </Col>
            <MainContent>
                <DisplayMap 
                setSingleCountry={setSingleCountry} 
                setAllExperiences={setAllExperiences} 
                setSelectedExperiences={setSelectedExperiences} 
                allExperiences={allExperiences} 
                isBigScreen={isBigScreen} 
                success={success}
                />
            </MainContent>
        </Row>

        </>
    )
}