import { GenericModal, CloseModalButton, DarkModalFooter, DarkModalHeader } from './modalStyles.js'
import { ModalBody, Form, Container, Row} from 'react-bootstrap';
import { LoginForm, LoginButton } from '../pages/loginStyles.js';
import { useState } from 'react';
import axios from 'axios';

export const Registerer = ({setRegSuccess, cancel}) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [fail, setFail] = useState(false);

    function login (evt) {
        evt.preventDefault();
        let regInfo = {
            "userName": userName,
            "password": password
        }
        axios.post(`http://localhost:3000/users/register`, regInfo)
            .catch(function (error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                setFail(error.response);
                }
            })
            .then((res) => {
                if(res){
                    setRegSuccess(true)
                    cancel();
                }
            })
    }

    return (
        <GenericModal show={true}>
            <DarkModalHeader className="text-center d-flex justify-content-center">
                <span>Welcome to your caleidoscope of experiences!</span>
            <CloseModalButton onClick={() => cancel()}>Escape!</CloseModalButton>
            </DarkModalHeader>
            <ModalBody>
                <Container className="d-flex justify-content-center">
                    <Form onSubmit={(e) => login(e)}>
                        <Form.Label>
                            Email address
                        </Form.Label>
                        <LoginForm type="email" placeholder="email" onChange={(e) => setUserName(e.target.value)}/>

                        <Form.Label>
                            Password
                        </Form.Label>
                        <LoginForm type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <Row className="d-flex justify-content-around">
                            <LoginButton variant="success" type="submit">Register!</LoginButton>
                        </Row>
                    </Form>
                </Container>
                <Container>
                {fail ? <span>Registration failed. Code {fail.status} - {fail.data}</span> : <span></span>} 
                </Container>    
            </ModalBody>
        <DarkModalFooter className="text-center d-flex justify-content-center">
            
        </DarkModalFooter>
    </GenericModal>

    )


}