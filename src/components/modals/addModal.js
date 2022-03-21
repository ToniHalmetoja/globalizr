import { GenericModal, CloseModalButton } from './modalStyles.js'
import { GeneralButton } from '../global/mapStyles.js';
import { Container, ModalHeader, ModalFooter, ModalBody, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

export const Adder = ({countryname, type, cancel}) => {

    /* Fetch content for this from DB, render out. Prevent user from selecting new until fetch complete? */

    return (
        <GenericModal show={true}>
            <ModalHeader className="text-center d-flex justify-content-center">
                <span>Add an experience: {type} {countryname}!</span>
            <CloseModalButton onClick={() => cancel()}>Escape!</CloseModalButton>
            </ModalHeader>
            <ModalBody>
                <p>Details will be entered here</p>
            </ModalBody>
            <ModalFooter className="text-center d-flex justify-content-center">
                <GeneralButton onClick={() => cancel()}>Exit</GeneralButton>
            </ModalFooter>
        </GenericModal>
    )
}