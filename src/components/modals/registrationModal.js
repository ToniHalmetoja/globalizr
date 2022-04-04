import { GenericModal, CloseModalButton, DarkModalFooter, DarkModalHeader, CustomCard, RemoveExperienceButton } from './modalStyles.js'
import { ModalBody, Form, Container} from 'react-bootstrap';
import { LoginForm, LoginButton } from '../pages/loginStyles.js';
import { useState } from 'react';
import axios from 'axios';

export const Registerer = ({setRegSuccess, cancel}) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function login (evt) {
        evt.preventDefault();
        let regInfo = {
            "userName": userName,
            "password": password
        }
        axios.post(`http://localhost:3000/users/register`, regInfo)
            .then((res) => {
                setRegSuccess(true)
            })
    }


    const Dishes = ({dishes}) => (
        <CustomCard>
            <p>You've eaten:</p>
            {dishes.map((dish, index) => (
                <div style={{textAlign:"center"}} key={`d${index}`} id={`d${index}`}><span className="bold">{dish.name} <RemoveExperienceButton/></span>
                 <p>Recipe: {dish.recipe}</p> on {dish.date}</div>
            ))}
        </CustomCard>
    );

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

                        <LoginButton type="submit">Login!</LoginButton>
                    </Form>
                </Container>
            </ModalBody>
        <DarkModalFooter className="text-center d-flex justify-content-center">
            
        </DarkModalFooter>
    </GenericModal>

    )


}