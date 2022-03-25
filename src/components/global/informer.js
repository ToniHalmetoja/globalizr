import { InformationBox, InfoParagraph } from './mapStyles.js'
import { useState } from 'react';

export const Informer = ({countryname, selectedExperiences}) => {

    const ExperienceLister = () => {
        if(selectedExperiences && Object.keys(selectedExperiences).length !== 0){
            return (
                <>
                    {selectedExperiences.persons ? <InfoParagraph>People met: {selectedExperiences.persons.length}</InfoParagraph> : <span></span>}
                    {selectedExperiences.visits ? <InfoParagraph>Times visited: {selectedExperiences.persons.length}</InfoParagraph> : <span></span>}
                    {selectedExperiences.books ? <InfoParagraph>Books read: {selectedExperiences.persons.length}</InfoParagraph> : <span></span>}
                    {selectedExperiences.dishes ? <InfoParagraph>Dishes tried: {selectedExperiences.persons.length}</InfoParagraph> : <span></span>}
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