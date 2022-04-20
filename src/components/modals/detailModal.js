import { useState } from 'react';
import { Confirmer } from './confirmModal.js';
import { GenericModal, CloseModalButton, DarkModalFooter, DarkModalHeader, CustomCard, RemoveExperienceButton } from './modalStyles.js'
import { ModalBody, Row, Col} from 'react-bootstrap';

export const Detailer = ({countryname, cancel, selectedExperiences, token, success, setSuccess}) => {

    const [toDelete, setToDelete] = useState();
    const [deleteType, setDeleteType] = useState();
    const [showConfirmModal, setShowConfirmModal] = useState();

    function deleteExperience(id, prop, type){
        setToDelete(prop)
        setDeleteType(type)
        setShowConfirmModal(true);
    }

    const Persons = ({people}) => (
        <CustomCard>
            <p>You've met:</p>
            {people.map((person, index) => (
                <p key={`p${index}`} id={`p${index}`}><span className="bold">{person.name}</span> on {person.date} <RemoveExperienceButton onClick={() => deleteExperience(`p${index}`, person, "persons")}/></p>
            ))}
        </CustomCard>
    );


    const Visits = ({visitations}) => (
        <CustomCard>
            <p>You've visited:</p>
            {visitations.map((visit, index) => (
                <p key={`v${index}`} id={`v${index}`}><span className="bold">{visit.name}</span> on {visit.date} <RemoveExperienceButton onClick={() => deleteExperience(`v${index}`, visit, "visits")}/></p>
            ))}
        </CustomCard>
    );

    const Books = ({books}) => (
        <CustomCard>
            <p>You've read:</p>
            {books.map((book, index) => (
                <p key={`b${index}`} id={`b${index}`}><span className="bold">{book.title}</span> by <span className="bold">{book.author}</span> on {book.date}<RemoveExperienceButton onClick={() => deleteExperience(`b${index}`, book, "books")}/></p>
            ))}
        </CustomCard>
    );

    const Dishes = ({dishes}) => (
        <CustomCard>
            <p>You've eaten:</p>
            {dishes.map((dish, index) => (
                <div style={{textAlign:"center"}} key={`d${index}`} id={`d${index}`}><span className="bold">{dish.name} <RemoveExperienceButton onClick={() => deleteExperience(`d${index}`, dish, "dishes")}/></span>
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
                    {selectedExperiences.persons || selectedExperiences.visits ? <Col>
                        {selectedExperiences.persons ? <Persons people={selectedExperiences.persons}/> : <p></p>}
                        {selectedExperiences.visits ? <Visits visitations={selectedExperiences.visits}/> : <p></p>}
                    </Col>: <p></p>}
                    {selectedExperiences.books || selectedExperiences.dishes ? <Col>
                        {selectedExperiences.books ? <Books books={selectedExperiences.books}/> : <p></p>}
                        {selectedExperiences.dishes ? <Dishes dishes={selectedExperiences.dishes}/> : <p></p>}
                    </Col>: <p></p>}
                </Row>
            </ModalBody>
        <DarkModalFooter className="text-center d-flex justify-content-center">
            
        </DarkModalFooter>
        {showConfirmModal ? <Confirmer cancel={()=>setShowConfirmModal(false)} doubleCancel={()=>{setShowConfirmModal(false);cancel()}} toDelete={toDelete} deleteType={deleteType} countryname={countryname} token={token} success={success} setSuccess={setSuccess}/> : <span></span>}
    </GenericModal>

    )


}