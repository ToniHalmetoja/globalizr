import { RecommendationModal, CloseModalButton } from './modalStyles.js'
import { GeneralButton } from '../global/mapStyles.js';
import { Container, ModalHeader, ModalFooter, ModalBody, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

export const Recommender = ({countryname, cancel}) => {

    const [experiences, setExperiences] = useState([]);

    /* Fetch content for this from DB, render out. Prevent user from selecting new until fetch complete? */

    return (
        <RecommendationModal show={true}>
            <ModalHeader className="text-center d-flex justify-content-center">
                <span>Recommendations for {countryname}</span>
            <CloseModalButton onClick={() => cancel()}>Escape!</CloseModalButton>
            </ModalHeader>
            <ModalBody>
                <Row>
                <Col className="d-flex justify-content-center"> <p>Trips</p></Col>
                <Col className="d-flex justify-content-center"> <p>Books</p></Col>
                <Col className="d-flex justify-content-center"> <p>Dishes</p></Col>
               

                </Row>
            </ModalBody>
            <ModalFooter className="text-center d-flex justify-content-center">
                <GeneralButton onClick={() => cancel()}>Exit</GeneralButton>
            </ModalFooter>
        </RecommendationModal>
    )
}