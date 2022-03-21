import styled from "styled-components";
import { Container, Col, FormSelect, Modal } from "react-bootstrap"
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