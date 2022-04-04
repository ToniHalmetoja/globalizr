import { GenericModal, CloseModalButton, EntryForm, CenterContainer, SubmitButton, DarkModalFooter, DarkModalHeader, CustomCard, RemoveExperienceButton } from './modalStyles.js'
import { ModalBody, Card, Row, Col} from 'react-bootstrap';

export const Detailer = ({countryname, cancel, selectedExperiences}) => {

    const Persons = ({people}) => (
        <CustomCard>
            <p>You've met:</p>
            {people.map((person, index) => (
                <p id={`p${index}`}><span className="bold">{person.name}</span> on {person.date} <RemoveExperienceButton/></p>
            ))}
        </CustomCard>
    );


    const Visits = ({visitations}) => (
        <CustomCard>
            <p>You've visited:</p>
            {visitations.map((visit, index) => (
                <p key={`v${index}`} id={`v${index}`}><span className="bold">{visit.name}</span> on {visit.date} <RemoveExperienceButton/></p>
            ))}
        </CustomCard>
    );

    const Books = ({books}) => (
        <CustomCard>
            <p>You've read:</p>
            {books.map((book, index) => (
                <p key={`b${index}`} id={`b${index}`}><span className="bold">{book.title}</span> by <span className="bold">{book.author}</span> on {book.date}<RemoveExperienceButton/></p>
            ))}
        </CustomCard>
    );

    const Dishes = ({dishes}) => (
        <CustomCard>
            <p>You've eaten:</p>
            {dishes.map((dish, index) => (
                <div style={{textAlign:"center"}} key={`d${index}`} id={`d${index}`}><span className="bold">{dish.name} <RemoveExperienceButton/></span>
                 <p>Recipe: {dish.recipe}</p> on {dish.date}</div>
            ))}
        </CustomCard>
    );

    return (
        <GenericModal show={true}>
            <DarkModalHeader className="text-center d-flex justify-content-center">
                <span>All your experiences for {countryname}!</span>
            <CloseModalButton onClick={() => cancel()}>Escape!</CloseModalButton>
            </DarkModalHeader>
            <ModalBody>
                <Row>
                    <Col>
                        {selectedExperiences.persons ? <Persons people={selectedExperiences.persons}/> : <p></p>}
                        {selectedExperiences.visits ? <Visits visitations={selectedExperiences.visits}/> : <p></p>}
                    </Col>
                    <Col>
                        {selectedExperiences.books ? <Books books={selectedExperiences.books}/> : <p></p>}
                        {selectedExperiences.dishes ? <Dishes dishes={selectedExperiences.dishes}/> : <p></p>}

                    </Col>
                </Row>
            </ModalBody>
        <DarkModalFooter className="text-center d-flex justify-content-center">
            
        </DarkModalFooter>
    </GenericModal>

    )


}