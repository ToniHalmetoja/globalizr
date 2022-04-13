import styled from "styled-components";
import { Container, Col, FormSelect, Button } from "react-bootstrap"
import { XSquareFill, Printer } from 'react-bootstrap-icons'



export const MainContent = styled(Col)`

    margin-left:1vw;

    .map-container{
        height:100%;
        .leaflet-container{
            border:3px solid black;
            background-color: #232324;
            height:95vh;
            width:95vw;
            @media (min-width: 1200px) {
                width:70vw;
                height:95vh;
            }
        }
    }

`

export const SidebarStyled = styled(Container)`
    border: 3px solid black;
    width: 95vw;
    margin-bottom: 1vh;
    margin-top: 1vh;
    @media (min-width: 1200px) {
        margin-left:0;
        max-width:25vw;
        margin-bottom: 0;
        margin-top:0;
      }
    `

export const ResetButton = styled(XSquareFill)`
    position:absolute;
    cursor:pointer;
    width:30px;
    height:30px;
    font-size:22px;
    top: 100px;
    left: 30px;
    z-index:1010;
`
export const PrinterButton = styled(Printer)`
    position:absolute;
    cursor:pointer;
    width:30px;
    height:30px;
    font-size:22px;
    top: 150px;
    left: 30px;
    z-index:1010;
`

export const ModalLauncher = styled(Container)`
    border: 1px solid black;    
    padding:1em;
    margin-top:1em;
`

export const SearchForm = styled(FormSelect)`
    border: 1px solid black;    
    background-color: black;
    color: #aaaaaa;
    font-size: 0.8em;
    max-width:90%;
`

export const InformationBox = styled(Container)`
    border: 1px solid black;    
    margin-top:1em;
    padding:1em;
`

export const InfoContainer = styled(Container)`
    
`
export const GeneralButton = styled(Button)`
margin-top:1em;
    
`

export const LogoutButton = styled(Button)`
margin-top:1em;
position: relative;
bottom:1em;  
`

export const InfoParagraph = styled.p`
margin-bottom: 0;
margin-top: 0;
font-size: 0.8em;
`

