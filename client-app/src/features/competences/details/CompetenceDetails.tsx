import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Card, Label } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CompetenceUsersList from "./CompetenceUsersList";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { knowledgeOptions } from "../../../app/common/options/knowledgeOptions";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface FormValues {
    knowledgeLevel: number;
}

export default observer(function CompetenceDetails() {

    const {profileStore, competenceStore, userStore} = useStore();
    const {selectedCompetence: competence, loadCompetence, loadingInitial} = competenceStore;
    const {addCompetence, removeCompetence} = profileStore;
    const {user} = userStore;
    const {id} = useParams<{id: string}>();

    const [editmode, setEditmode] = useState(false);
    
    

    useEffect (() => {
        if (id) loadCompetence(id)
    }, [id, loadCompetence])
    
    if (loadingInitial) 
    {
        return <LoadingComponent/>;
    }

    if (!competence) 
    {
        return <LoadingComponent/>;
    }
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
                    <Button as={Link} to={`/competence/${id}/edit`} basic color='blue' content='Edit' />
                    <Button as={Link} to={'/competences'} basic color='grey' content='Back' />
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
                                        disabled={isSubmitting || !isValid }
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