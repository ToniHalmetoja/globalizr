import { useState, useEffect } from "react"

import { SidebarStyled, GeneralButton } from "./mapStyles.js"
import { AddModal } from "./modalLauncher.js"
import { Informer } from "./informer.js"
import { Recommender } from "../modals/recommenderModal.js"
import { Adder } from "../modals/addModal.js"

export function Sidebar({singleCountry}) {

    const [showRecModal, setShowRecModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [addType, setAddType] = useState("");

    /* Fetch content for this from DB, render out. Prevent user from selecting new until fetch complete? */

    
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
            {singleCountry ? <Informer countryname={singleCountry.properties.ADMIN}/> : <p></p>}
            {singleCountry ? <AddModal select={handleSelect} countryname={singleCountry.properties.ADMIN}/> : <span>...and to show previous ones!</span>}
            {singleCountry ? <GeneralButton onClick={() => setShowRecModal(true)}>Need ideas? Click here!</GeneralButton> : <span></span>}
        </SidebarStyled>
        {showRecModal ? <Recommender countryname={singleCountry.properties.ADMIN} cancel={()=>setShowRecModal(false)}/> : <span></span>}
        {showAddModal ? <Adder countryname={singleCountry.properties.ADMIN} type={addType} cancel={()=>setShowAddModal(false)}/> : <span></span>}

    </>
    )
}