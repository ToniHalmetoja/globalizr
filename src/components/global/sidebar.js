import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import { SidebarStyled, GeneralButton, LogoutButton } from "./mapStyles.js"
import { AddModal } from "./modalLauncher.js"
import { Informer } from "./informer.js"
import { Recommender } from "../modals/recommenderModal.js"
import { Adder } from "../modals/addModal.js"
import { Detailer } from "../modals/detailModal.js"

export function Sidebar({singleCountry, logout, token, selectedExperiences, setSuccess, success}) {

    const [showRecModal, setShowRecModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetModal, setShowDetModal] = useState(false);
    const [addType, setAddType] = useState("");
    
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
            <Container>
            <h1>Welcome to GlobalizR</h1>
            {singleCountry ? <span>Currently selected: {singleCountry.properties.name} </span>: <span>Click a country to add experiences...</span>}
            {singleCountry ? <Informer countryname={singleCountry.properties.name} token={token} selectedExperiences={selectedExperiences} setShowDetModal={setShowDetModal}/> : <p></p>}
            {singleCountry ? <AddModal select={handleSelect} countryname={singleCountry.properties.name} /> : <span>...and to show previous ones!</span>}
            {singleCountry ? <GeneralButton onClick={() => setShowRecModal(true)}>Need recipe ideas? Click here!</GeneralButton> : <span></span>}
            </Container>
            <Container>
                <p style={{fontSize:"0.5em"}}>Recipe recommendations available for a selection of countries, including Thailand, the USA and more!</p>
                <p style={{fontSize:"0.5em"}}>Get three experiences of each kind to gild a country!</p>
            </Container>
            <Container>
                <LogoutButton variant="danger" onClick={() => logout()}>Log Out!</LogoutButton>
            </Container>
        </SidebarStyled>
        {showRecModal ? <Recommender countryname={singleCountry.properties.name} cancel={()=>setShowRecModal(false)}/> : <span></span>}
        {showAddModal ? <Adder countryname={singleCountry.properties.name} type={addType} cancel={()=>setShowAddModal(false)} setSuccess={setSuccess} success={success}/> : <span></span>}
        {showDetModal ? <Detailer countryname={singleCountry.properties.name} selectedExperiences={selectedExperiences} token={token} success={success} setSuccess={setSuccess} cancel={()=>setShowDetModal(false)}/> : <span></span>}

    </>
    )
}