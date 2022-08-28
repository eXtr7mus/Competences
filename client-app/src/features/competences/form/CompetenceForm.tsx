import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CompetenceFormValues } from "../../../app/models/Competence";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import {v4 as uuid} from 'uuid';
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Link, useHistory, useParams } from "react-router-dom";

export default observer(function CompetenceForm() {

    const history = useHistory();
    const {competenceStore} = useStore();
    const { updateCompetence, createComtepence, loadCompetence} = competenceStore;
    const {id} = useParams<{id: string}>();

    const [competence, setCompetence] = useState<CompetenceFormValues>(new CompetenceFormValues());

    const validationSchema = Yup.object({
        name: Yup.string().required('The competence title is required'),
        description: Yup.string().required('The description field is required'),
        category: Yup.string().required('The category field is required')
    })

    useEffect(() => {
        if (id) loadCompetence(id).then(competence => setCompetence(new CompetenceFormValues(competence)));
    }, [id, loadCompetence])




    function handleFormSubmit(competence: CompetenceFormValues) {
        if (!competence.id) {
            let newCompetence = {
                ...competence,
                id: uuid()
            };
            createComtepence(newCompetence).then(() => history.push(`/competence/${newCompetence.id}`));
        } else {
            updateCompetence(competence).then(() => history.push(`/competence/${competence.id}`));
        }
    }



    return(
        <Segment clearing>
            <Header content='Competence Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={competence} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput name='name' placeholder='Name' />                            
                            <MyTextInput placeholder='Description' name='description' />
                            <MyTextInput placeholder='Category' name='category' />
                            <Button 
                                disabled={isSubmitting || !dirty || !isValid }
                                loading={isSubmitting} floated='right' 
                                positive type='submit' content='Submit'
                            />
                            { <Button as={Link} to={`/competences`} floated='right' type='button' content='Cancel'/> }
                        </Form>
                )}
            </Formik>

        </Segment>
    )
})