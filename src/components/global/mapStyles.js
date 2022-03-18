import styled from "styled-components";
import { Container, Col } from "react-bootstrap"
import { XSquareFill } from 'react-bootstrap-icons'



export const MainContent = styled(Col)`

    margin-left:1vw;
    @media (min-width: 768px) {
        margin-left: 0;
    }

    .map-container{
        .leaflet-container{
            margin-left:0;
            border:3px solid black;
            background-color: #232324;
            height:95vh;
            width:95vw;
            @media (min-width: 768px) {
                width:70vw;
            }
        }
    }

`

export const SidebarStyled = styled(Container)`
    border: 3px solid black;
    width: 95vw;
    height: 50vh;
    margin-bottom: 1vh;
    @media (min-width: 768px) {
        height:95vh;
        width:20vw;
        margin-bottom: 0;
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