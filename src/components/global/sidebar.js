import { useState, useEffect } from "react"
import axios from "axios"

import { Container } from "react-bootstrap"
import { SidebarStyled, GeneralButton, LogoutButton } from "./mapStyles.js"
import { AddModal } from "./modalLauncher.js"
import { Informer } from "./informer.js"
import { Recommender } from "../modals/recommenderModal.js"
import { Adder } from "../modals/addModal.js"

const fetchURL = "localhost:3000";

export function Sidebar({singleCountry, logout, token}) {

    const [showRecModal, setShowRecModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [addType, setAddType] = useState("");

    /* Fetch content for this from DB, render out. Prevent user from selecting new until fetch complete? */

    useEffect(() => {
        axios.post('http://localhost:3000/ping', {
            firstName: 'Finn',
            lastName: 'Williams'
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
    },[])
    
    function handleSelect(e){
        switch(e.target.value){
            case "book":
                setAddType("Read a book from ");
                break;
            case "visit":
                setAddType("A visit to ");
                break;
            case "person":
                setAddType("Met someone from ");
                break;
            case "dish":
                setAddType("Ate a dish from ");
                break;
            default:
                setAddType("");
        }
    }   

    useEffect(() => {
        if (addType !== "") {
          setShowAddModal(true);
        }
      }, [addType]);
    

    return (
    <>
        <SidebarStyled>
            <h1>Welcome to GlobalizR</h1>
            {singleCountry ? <span>Currently selected: {singleCountry.properties.ADMIN} </span>: <span>Click a country to add experiences...</span>}
            {singleCountry ? <Informer countryname={singleCountry.properties.ADMIN} token={token}/> : <p></p>}
            {singleCountry ? <AddModal select={handleSelect} countryname={singleCountry.properties.ADMIN} token={token}/> : <span>...and to show previous ones!</span>}
            {singleCountry ? <GeneralButton onClick={() => setShowRecModal(true)}>Need ideas? Click here!</GeneralButton> : <span></span>}
            <Container>
                <LogoutButton variant="danger" onClick={() => logout()}>Log Out!</LogoutButton>
            </Container>
        </SidebarStyled>
        {showRecModal ? <Recommender countryname={singleCountry.properties.ADMIN} cancel={()=>setShowRecModal(false)}/> : <span></span>}
        {showAddModal ? <Adder countryname={singleCountry.properties.ADMIN} type={addType} cancel={()=>setShowAddModal(false)}/> : <span></span>}

    </>
    )
}