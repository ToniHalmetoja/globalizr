import { InformationBox } from './mapStyles.js'
import { useState } from 'react';

export const Informer = ({countryname}) => {

    const [experiences, setExperiences] = useState([]);

    /* Fetch content for this from DB, render out. Prevent user from selecting new until fetch complete? */

    return (
        <InformationBox>
            <h4>Your experiences so far in {countryname}...</h4>
            <p></p>
        </InformationBox>
    )
}