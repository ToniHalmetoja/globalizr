import styled from "styled-components";
import { Container, Col, FormSelect, Modal, Form, Button } from "react-bootstrap"
import { XSquareFill, XLg } from 'react-bootstrap-icons'

export const RecommendationModal = styled(Modal)`
    margin-top:1em;
    width:100vw;
    height:100vh;
    .modal-dialog{
        max-width: 50vw;
        max-height: 95vh;       
        .modal-content{
            background-color:#282c34;
            color:white;
            min-width:25vw;
            min-height:50vh !important;
            .container{
                display:flex;
                justify-content:center;
            }
        }
    }
`

export const GenericModal = styled(Modal)`
    margin-top:1em;
    width:100vw;
    height:100vh;
    .modal-dialog{
        max-width: 50vw;
        max-height: 95vh;       
        .modal-content{
            background-color:#282c34;
            color:white;
            min-width:25vw;
            min-height:25vh !important;
            .container{
                display:flex;
                justify-content:center;
            }
        }
    }
`

export const DarkModalFooter = styled(Modal.Footer)`
background-color:#1d2026;
`

export const DarkModalHeader = styled(Modal.Header)`
background-color:#1d2026;
`

export const CloseModalButton = styled(XLg)`
    position: absolute;
    top:10px;
    left:10px;
    color:#aaaaaa;
    font-size:2em;
    cursor:pointer;
    &:hover{
        font-weight:bolder;
        color:white;
    }

`

export const EntryForm = styled(Form.Control)`
    margin-bottom:1em;
    border: 1px solid black;    
    background-color: black;
    color: #aaaaaa;
    font-size: 0.8em;
`

export const CenterContainer = styled(Container)`
    display:flex;
    justify-content:center;
`


export const SubmitButton = styled(Button)`
    align-self:center;
    margin-right:1em;
`