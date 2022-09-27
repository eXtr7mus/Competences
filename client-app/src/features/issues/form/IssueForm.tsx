import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import {v4 as uuid} from 'uuid';
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Link, useHistory } from "react-router-dom";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { IssueFormValues } from "../../../app/models/Issue";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { priorityOptions } from "../../../app/common/options/priorityOptions";

export default observer(function IssueForm() {

    const history = useHistory();
    const {issueStore} = useStore();
    const { createIssue } = issueStore;

    const validationSchema = Yup.object({
        title: Yup.string().required('The issue title is required'),
        description: Yup.string().required('The description field is required'),
        deadline: Yup.string().required('The deadline field is required').nullable(),
        priority: Yup.string().required('The priority field is required'),
    });


    function handleFormSubmit(issue: IssueFormValues) {
        let newIssue = {...issue, id: uuid()};
        // console.log(newIssue);
        createIssue(newIssue).then(() => history.push(`/issue/${newIssue.id}`));
    }



    return(
        <Segment clearing>
            <Header content='Issue Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={new IssueFormValues()} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput name='title' placeholder='Title' />                            
                            <MyTextArea placeholder='Description' name='description' rows={3} />
                            <MyDateInput 
                                placeholderText='Deadline' 
                                name='deadline' 
                                dateFormat='MMMM d, yyyy'
                            />
                            <MySelectInput options={priorityOptions} placeholder='Priority' name='priority' />
                            <Button 
                                disabled={!dirty || !isValid }
                                loading={isSubmitting} floated='right' 
                                positive type='submit' content='Submit'
                            />
                            { <Button as={Link} to={`/issues`} floated='right' type='button' content='Cancel'/> }
                        </Form>
                )}
            </Formik>

        </Segment>
    )
})