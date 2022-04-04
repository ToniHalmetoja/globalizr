import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Container, Button, Form } from "react-bootstrap";
import { LoginForm, LoginButton } from "./loginStyles";
import { Registerer } from "../modals/registrationModal";
import axios from "axios";

export const Login = ({setToken}) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showRegModal, setShowRegModal] = useState(false);
    const [regSuccess, setRegSuccess] = useState(false);

    function login (evt) {
        evt.preventDefault();
        let loginInfo = {
            "userName": userName,
            "password": password
        }
        axios.post(`http://localhost:3000/users/login`, loginInfo)
            .then((res) => {
                setToken(res.data.id)
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

                    <LoginButton type="submit">Login!</LoginButton>
                </Form>
            </Container>
            <Button variant="success" onClick={() => setShowRegModal(true)}>Register</Button>
            {regSuccess ? <span>Registration successful! Log in with your new details!</span> : <span></span>}
        </Container>
        {showRegModal ? <Registerer cancel={()=>setShowRegModal(false)} setRegSuccess={setRegSuccess}/> : <span></span>}

        </>
    )
}