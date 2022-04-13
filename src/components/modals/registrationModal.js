import { GenericModal, CloseModalButton, DarkModalFooter, DarkModalHeader } from './modalStyles.js'
import { ModalBody, Form, Container, Row} from 'react-bootstrap';
import { LoginForm, LoginButton } from '../pages/loginStyles.js';
import { useState } from 'react';
import axios from 'axios';

export const Registerer = ({setRegSuccess, cancel}) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [fail, setFail] = useState(false);

    function login (evt) {
        evt.preventDefault();
        let regInfo = {
            "userName": userName,
            "password": password,
            "password2": password2
        }
        if(password2 === password){
        axios.post(`https://globalizrbackend.herokuapp.com/users/register`, regInfo)
            .catch(function (error) {
                if (error.response) {
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
        else{
            let error = {data:"Passwords do not match!", status:"418"}
            setFail(error);
        }
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
                        <Form.Label>
                            Confirm password
                        </Form.Label>
                        <LoginForm type="password" placeholder="Password" onChange={(e) => setPassword2(e.target.value)} />
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