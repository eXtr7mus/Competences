import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Card, Label } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CompetenceUsersList from "./CompetenceUsersList";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { knowledgeOptions } from "../../../app/common/options/knowledgeOptions";

interface FormValues {
    knowledgeLevel: number;
}

export default observer(function CompetenceDetails() {

    const {profileStore, competenceStore, userStore} = useStore();
    const {selectedCompetence: competence, openForm, cancelSelectedCompetence, loadCompetence} = competenceStore;
    const {addCompetence, removeCompetence} = profileStore;
    const {user} = userStore;

    const [editmode, setEditmode] = useState(false);

    if (!competence) return <h1>not found</h1>

    const validationSchema = Yup.object({
        knowledgeLevel: Yup.number().required('The activity title is required').min(1, "Value must be between 1 and 4").max(4, "Value must be between 1 and 4"),
    })

    const formValues: FormValues = {
        knowledgeLevel: 1
    }

    function handleFormSubmit(formValues: FormValues) {
        addCompetence(competence!.id, formValues.knowledgeLevel).then(() => loadCompetence(competence!.id));
        setEditmode(false);
    }

    const handleRemoveCompetence = () => {
        removeCompetence(competence!.id).then(() => loadCompetence(competence!.id));
    }

    function hasCompetence() : boolean {
        if (competence?.users?.find(x => x.username === user?.username))
            return true;
        return false;
    }


    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{competence.name}</Card.Header>
                <Card.Meta>
                    <span>{new Date(competence.creationDate!).toDateString()}</span>
                </Card.Meta>
                <Card.Description>
                    {competence.description}
                </Card.Description>
                { competence.users?.length > 0 ?
                    <CompetenceUsersList competence={competence} />
                    :
                    <Label content='Nobody has this competence yet' style={{marginTop:'10px'}}/>
                }
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(competence.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedCompetence} basic color='grey' content='Cancel' />
                </Button.Group>
                <>
                    { editmode ? ( 
                        <Formik 
                        validationSchema={validationSchema}
                        enableReinitialize 
                        initialValues={formValues} 
                        onSubmit={values => handleFormSubmit(values)}>
                        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                <Form style={{marginTop:'5px'}} className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                    <MySelectInput options={knowledgeOptions} name='knowledgeLevel' placeholder='Knowledge Level' />                            
                                    <Button 
                                        disabled={isSubmitting || !dirty || !isValid }
                                        loading={isSubmitting} floated='right' 
                                        positive type='submit' content='Submit'
                                        style={{marginBottom:'5px'}}
                                    />
                                    <Button onClick={() => setEditmode(false)} floated='right' type='button' content='Cancel' style={{marginBottom:'5px'}}/>
                                </Form>
                        )}
                    </Formik>
                    ) : (
                        <Button fluid style={{marginTop: '10px'}} onClick={() => setEditmode(true)} basic color='green' content={hasCompetence() ? 'Update knowledge level' : 'Add this competence to profile'} />
                    ) }
                    { hasCompetence() &&
                        <Button fluid style={{marginTop: '10px'}} onClick={handleRemoveCompetence} basic color='red' content='Remove competence from my profile' />
                    }
                </>
            </Card.Content>
        </Card>
    )
})