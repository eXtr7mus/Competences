import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { CompetenceFormValues } from "../../../app/models/Competence";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import {v4 as uuid} from 'uuid';
import MyTextInput from "../../../app/common/form/MyTextInput";

export default observer(function CompetenceForm() {

    const {competenceStore} = useStore();
    const {selectedCompetence, updateCompetence, createComtepence, loading, closeForm} = competenceStore;

    const validationSchema = Yup.object({
        name: Yup.string().required('The competence title is required'),
        description: Yup.string().required('The description field is required'),
        category: Yup.string().required('The category field is required')
    })

    const [competence, setCompetence] = useState<CompetenceFormValues>(new CompetenceFormValues());


    function handleFormSubmit(competence: CompetenceFormValues) {
        if (!competence.id) {
            let newCompetence = {
                ...competence,
                id: uuid()
            };
            createComtepence(newCompetence);
        } else {
            updateCompetence(competence);
        }
    }

    useEffect(() => {
        if (selectedCompetence?.id) setCompetence(new CompetenceFormValues(selectedCompetence));
    }, [selectedCompetence?.id])

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
                            { <Button onClick={closeForm} to='/activities' floated='right' type='button' content='Cancel'/> }
                        </Form>
                )}
            </Formik>

        </Segment>
    )
})