import { ModalLauncher, SearchForm } from './mapStyles.js'

export const AddModal = ({countryname, select}) => {

    /* Fetch content for this from DB, render out. Prevent user from selecting new until fetch complete? */

    return (
        <ModalLauncher>
            <h4>New experiences to add for {countryname}?</h4>
            <SearchForm onChange={(e) => select(e)}>
                <option>Get started!</option>
                <option value="person">Met someone?</option>
                <option value="visit">Visited?</option>
                <option value="book">Read a book?</option>
                <option value="dish">Tried a new dish?</option>
            </SearchForm> 
        </ModalLauncher>
    )
}