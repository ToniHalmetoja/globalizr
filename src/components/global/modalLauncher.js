import { ModalLauncher, SearchForm } from './mapStyles.js'

export const AddModal = ({countryName}) => {

    /* Fetch content for this from DB, render out. Prevent user from selecting new until fetch complete? */

    return (
        <ModalLauncher>
            <h4>New experiences to add for {countryName}?</h4>
            <SearchForm>
                <option>Get started!</option>
                <option value="person">Met someone?</option>
                <option value="visit">Visited?</option>
                <option value="book">Read a book?</option>
                <option value="dish">Tried a new dish?</option>
            </SearchForm>
        </ModalLauncher>
    )
}