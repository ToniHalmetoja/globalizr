import { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { LoginForm, LoginButton, RegisterButton } from "./loginStyles";
import { Registerer } from "../modals/registrationModal";
import axios from "axios";

export const Login = ({setToken}) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showRegModal, setShowRegModal] = useState(false);
    const [regSuccess, setRegSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    function login (evt) {
        evt.preventDefault();
        let loginInfo = {
            "userName": userName,
            "password": password
        }
        axios.post(`https://globalizrbackend.herokuapp.com/users/login`, loginInfo)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setFail(error.response);
                    setRegSuccess(false);
                }
            })
            .then((res) => {
                if(res){
                    setToken(res.data.id)
                }
            })
    }

    return (
        <>
        <Container>
            <h1>GlobalizR</h1>
            <h2>Your caleidoscope of experiences</h2>
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
                    <LoginButton type="submit">Login!</LoginButton>
                    <RegisterButton variant="success" type="button" onClick={() => setShowRegModal(true)}>Register</RegisterButton>
                    </Row> 
                </Form>
            </Container>
           
        
        </Container>
        <Container>
            {regSuccess ? <span>Registration successful! Log in with your new details!</span> : <span></span>} 
            {fail ? <span>Login failed. Code {fail.status} - {fail.data}</span> : <span></span>} 
        </Container>

        {showRegModal ? <Registerer cancel={()=>setShowRegModal(false)} setRegSuccess={setRegSuccess} setFailLogin={setFail}/> : <span></span>}

        </>
    )
}