import { GenericModal, CloseModalButton, EntryForm, CenterContainer, SubmitButton, DarkModalFooter, DarkModalHeader } from './modalStyles.js'
import { GeneralButton } from '../global/mapStyles.js';
import { Container, ModalHeader, ModalFooter, ModalBody, Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

export const Adder = ({countryname, type, cancel, token}) => {

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");
    const [failure, setFailure] = useState(false);

    function submitNewExperience(evt){
        evt.preventDefault();
        
        let payload;
        let valid = false;
        if(type==="Met someone from " && name !== "" && date !== ""){
            payload = {
                "user":localStorage.getItem("usertoken"),
                "country":countryname,
                "type":"persons",
                "date":date,
                "name":name
            }
            valid=true;
        }
        else if(type==="Read a book from " && date !== "" && title !== "" && author !== ""){
            payload = {
                "user":localStorage.getItem("usertoken"),
                "country":countryname,
                "type":"books",
                "date":date,
                "title":title,
                "author":author
            }
            valid=true;
        }
        else if(type==="A visit to " && date !== "" && name !== ""){
            payload = {
                "user":localStorage.getItem("usertoken"),
                "country":countryname,
                "type":"visits",
                "date":date,
                "name":name,
            }
            valid=true;
        }
        else if(type==="Ate a dish from " && name !== "" && date !== "" && text !== ""){
            payload = {
                "user":localStorage.getItem("usertoken"),
                "country":countryname,
                "type":"dishes",
                "date":date,
                "name":name,
                "recipe":text
            }
            valid=true;
        }

        if(valid===true){
            axios.post(`http://localhost:3000/add`, payload)
            .then((res) => {
                console.log(res.data)
            })
        }
        else{setFailure(true)}
            

    }

    return (
        <GenericModal show={true}>
            <DarkModalHeader className="text-center d-flex justify-content-center">
                <span>Add an experience: {type} {countryname}!</span>
            <CloseModalButton onClick={() => cancel()}>Escape!</CloseModalButton>
            </DarkModalHeader>
            <ModalBody>
                {type === "Met someone from " ?
                    <CenterContainer>
                    <Form onSubmit={(e) => submitNewExperience(e)}>
                        <EntryForm type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                        <EntryForm type="date" placeholder="Date"  onChange={(e) => setDate(e.target.value)}/>
                        <SubmitButton type="submit">Submit</SubmitButton>
                        <SubmitButton variant="danger" onClick={() => cancel()}>Exit</SubmitButton>

                    </Form>
                </CenterContainer>
                : <p></p>
                }
            </ModalBody>
            <DarkModalFooter className="text-center d-flex justify-content-center">
                {failure ? <h1>Please fill in all fields!</h1> : <h1></h1>}
            </DarkModalFooter>
        </GenericModal>
    )
}