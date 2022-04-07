import { GenericModal, CloseModalButton, EntryForm, CenterContainer, SubmitButton, DarkModalFooter, DarkModalHeader } from './modalStyles.js'
import { ModalBody, Row, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

export const Adder = ({countryname, type, cancel, token, setSuccess, success}) => {

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");
    const [failureText, setFailureText] = useState(0);
    const [successText, setSuccessText] = useState(0);

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
                if(res.data === "OK!"){
                    setSuccessText(successText+1)
                    setSuccess(success+1)
                }
            })
        }
        else{setFailureText(failureText+1)}
            

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
                        <EntryForm type="date" placeholder="Date"  onChange={(e) => setDate(e.target.value)}/>
                        <EntryForm type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                        <SubmitButton type="submit">Submit</SubmitButton>
                        <SubmitButton variant="danger" onClick={() => cancel()}>Exit</SubmitButton>

                    </Form>
                </CenterContainer>
                : <p></p>
                }
                {type === "A visit to " ?
                    <CenterContainer>
                    <Form onSubmit={(e) => submitNewExperience(e)}>
                        <EntryForm type="date" placeholder="Date"  onChange={(e) => setDate(e.target.value)}/>
                        <EntryForm type="text" placeholder="Place name" onChange={(e) => setName(e.target.value)}/>
                        <SubmitButton type="submit">Submit</SubmitButton>
                        <SubmitButton variant="danger" onClick={() => cancel()}>Exit</SubmitButton>
                    </Form>
                </CenterContainer>
                : <p></p>
                }
                {type === "Read a book from " ?
                    <CenterContainer>
                    <Form onSubmit={(e) => submitNewExperience(e)}>
                        <EntryForm type="date" placeholder="Date"  onChange={(e) => setDate(e.target.value)}/>
                        <EntryForm type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                        <EntryForm type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)}/>
                        <SubmitButton type="submit">Submit</SubmitButton>
                        <SubmitButton variant="danger" onClick={() => cancel()}>Exit</SubmitButton>

                    </Form>
                </CenterContainer>
                : <p></p>
                }
                {type === "Ate a dish from " ?
                    <CenterContainer>
                    <Form onSubmit={(e) => submitNewExperience(e)}>
                    <Row><EntryForm type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/></Row>
                        <Row><EntryForm type="date" placeholder="Date"  onChange={(e) => setDate(e.target.value)}/></Row>
                        <Row><EntryForm as="textarea" type="text" placeholder="Recipe" cols={25} onChange={(e) => setText(e.target.value)}/></Row>
                        <SubmitButton type="submit">Submit</SubmitButton>
                        <SubmitButton variant="danger" onClick={() => cancel()}>Exit</SubmitButton>

                    </Form>
                </CenterContainer>
                : <p></p>
                }
                
            </ModalBody>
            <DarkModalFooter className="text-center d-flex justify-content-center">
                {failureText ? <span>Please fill in all fields!</span> : <h1></h1>}
                {successText ? <><span>Your experience was successfully added!</span><span>Add another or close the modal.</span></> : <h1></h1>}
            </DarkModalFooter>
        </GenericModal>
    )
}