import { InformationBox, InfoParagraph, GeneralButton } from './mapStyles.js'
import { useState } from 'react';

export const Informer = ({countryname, selectedExperiences, setShowDetModal}) => {

    const ExperienceLister = () => {
        if(selectedExperiences && Object.keys(selectedExperiences).length !== 0){
            return (
                <>
                    {selectedExperiences.persons ? <InfoParagraph>People met: {selectedExperiences.persons.length}</InfoParagraph> : <span></span>}
                    {selectedExperiences.visits ? <InfoParagraph>Times visited: {selectedExperiences.visits.length}</InfoParagraph> : <span></span>}
                    {selectedExperiences.books ? <InfoParagraph>Books read: {selectedExperiences.books.length}</InfoParagraph> : <span></span>}
                    {selectedExperiences.dishes ? <InfoParagraph>Dishes tried: {selectedExperiences.dishes.length}</InfoParagraph> : <span></span>}
                    <GeneralButton onClick={() => setShowDetModal(true)}>Full experience details</GeneralButton>

                </>
            )
        }
        else{
            return(
                <>
                    <InfoParagraph>Nothing yet!</InfoParagraph>
                </>
            )
        }
    }

    return (
        <InformationBox>
            <h4>Your experiences so far in {countryname}...</h4>
            <ExperienceLister/>
        </InformationBox>
    )
}