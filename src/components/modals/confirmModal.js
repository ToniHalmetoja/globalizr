import { CloseModalButton, DarkModalFooter, DarkModalHeader, LargeModal, CustomCard } from './modalStyles.js'
import { ModalBody, Form, Container } from 'react-bootstrap';
import { LoginButton } from '../pages/loginStyles.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Confirmer = ({cancel, toDelete, deleteType, databaseId, countryname, token, success, setSuccess, doubleCancel}) => {

    const [fail, setFail] = useState(false);
    const [elaborateMessage, setElaborateMessage] = useState("");

    useEffect(() => {
    if(deleteType==="persons"){
        setElaborateMessage("Meeting " + toDelete.name + " on the " + toDelete.date)
    }
    },[]);  

    function deleteExperience (evt) {
        evt.preventDefault();
        let delInfo = {
            "id": token,
            "type": deleteType,
            "toDelete": toDelete,
            "country": countryname
        }
        axios.post(`http://localhost:3000/delete`, delInfo)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setFail(true);
                }
            })
        setSuccess(success-1)
        doubleCancel();
    }

    return (
        <LargeModal show={true}>
            <DarkModalHeader className="text-center d-flex justify-content-center">
                <span>Are you sure you want to remove this experience?</span>
            <CloseModalButton onClick={() => cancel()}>Escape!</CloseModalButton>
            </DarkModalHeader>
            <ModalBody>
                <CustomCard>
                <p>{elaborateMessage}</p>
                <p>Deleted experiences cannot be recovered!</p>
                </CustomCard>
                <Container className="d-flex justify-content-center">
                    <Form onSubmit={(e) => deleteExperience(e)}>
                        <LoginButton variant="success" type="submit">Yes, delete it</LoginButton>
                        <LoginButton variant="danger" type="submit" onClick={() => deleteExperience()}>No, I changed my mind</LoginButton>
                    </Form>
                </Container>
                <Container>
                </Container>    
            </ModalBody>
        <DarkModalFooter className="text-center d-flex justify-content-center">
            
        </DarkModalFooter>
    </LargeModal>

    )


}