import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function CompetenceForm() {

    const {competenceStore} = useStore();
    const {selectedCompetence, updateCompetence, createComtepence, loading, closeForm} = competenceStore;

    const initialState = selectedCompetence ?? {
        id: '',
        name: '',
        description: '', 
        category: '',
        creationDate: new Date()
    }

    const [competence, setCompetence] = useState(initialState);

    function handleSubmit() {
        competence.id ? updateCompetence(competence) : createComtepence(competence);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setCompetence({...competence, [name]: value});
    }

    return (
        <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input placeholder='Title' value={competence.name} name='name' onChange={handleInputChange} />
            <Form.TextArea placeholder='Description' value={competence.description} name='description' onChange={handleInputChange} />
            <Form.Input placeholder='Category' value={competence.category} name='category' onChange={handleInputChange} />
            <Button loading={loading} floated='right' positive type='submit' content='Submit' />
            <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
        </Form>
    </Segment>
    )
})