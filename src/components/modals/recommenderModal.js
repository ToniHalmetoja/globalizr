import { RecommendationModal, CloseModalButton, CustomCard } from './modalStyles.js'
import { GeneralButton } from '../global/mapStyles.js';
import { ModalHeader, ModalFooter, ModalBody } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Recommender = ({countryname, cancel}) => {

    const [foodRec, setFoodRec] = useState([])

    useEffect(() => {

        let country = "";

        if(countryname === "United Kingdom"){
           country = "British";
        }  
        else if(countryname === "United States of America"){
            country = "American";
        }
        else if(countryname === "China"){
            country = "Chinese";
        }
        else if(countryname === "France"){
            country = "French";
        }
        else if(countryname === "Germany"){
            country = "German";
        }
        else if(countryname === "Greece"){
            country = "Greek";
        }
        else if(countryname === "India"){
            country = "Indian";
        }
        else if(countryname === "Ireland"){
            country = "Irish";
        }
        else if(countryname === "Italy"){
            country = "Italian";
        }
        else if(countryname === "Japan"){
            country = "Japanese";
        }
        else if(countryname === "China"){
            country = "Chinese";
        }
        else if(countryname === "South Korea" || countryname === "North Korea"){
            country = "Korean";
        }
        else if(countryname === "Spain"){
            country = "Spanish";
        }
        else if(countryname === "Thailand"){
            country = "Thai ";
        }
        else if(countryname === "Vietnam"){
            country = "Vietnamese";
        }

        if(country !== ""){
            axios.post(`https://globalizrbackend.herokuapp.com/recommendations/getdish`, {cuisine:country})
            .then((res) => {
                if(res.data.recipes){
                setFoodRec([res.data.recipes[0].title, res.data.recipes[0].summary,res.data.recipes[0].image, res.data.recipes[0].spoonacularSourceUrl])
                }
            })
        }






    }, [countryname])

    /* Fetch content for this from DB, render out. Prevent user from selecting new until fetch complete? */

    return (
        <RecommendationModal show={true}>
            <ModalHeader className="text-center d-flex justify-content-center">
                <span>A dish from {countryname}!</span>
            <CloseModalButton onClick={() => cancel()}>Escape!</CloseModalButton>
            </ModalHeader>
            <ModalBody>
                <CustomCard>
                {foodRec[2] ? <img src={foodRec[2]} alt={foodRec[0]}></img> : <p>No image provided.</p>}
                </CustomCard>
                <CustomCard>
                    {foodRec[0] ? <p dangerouslySetInnerHTML={{ __html: foodRec[0]}}></p> : <p>No recommendations for this country yet. :(</p>}
                    {foodRec[1] ? <p dangerouslySetInnerHTML={{ __html: foodRec[1]}}></p> : <p></p>}
                    {foodRec[3] ? <a href={foodRec[3]}>Click to see the recipe on Spoonacular!</a> : <p></p>}
                </CustomCard>

            </ModalBody>
            <ModalFooter className="text-center d-flex justify-content-center">
                <GeneralButton onClick={() => cancel()}>Exit</GeneralButton>
            </ModalFooter>
        </RecommendationModal>
    )
}