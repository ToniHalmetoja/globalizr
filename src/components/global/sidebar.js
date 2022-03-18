import { SidebarStyled } from "./mapStyles.js"

export function Sidebar({singleCountry}) {

    /* Fetch content for this from DB, render out. Prevent user from selecting new until fetch complete? */

    return (
        <SidebarStyled>
            <h1>Welcome to GlobalizR</h1>
            {singleCountry ? <p>Currently selected: {singleCountry.properties.ADMIN} </p>: <p>Click a country to add experiences</p>}
        </SidebarStyled>
    )
}