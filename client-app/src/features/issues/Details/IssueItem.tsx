import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect } from "react";
import { Button, Form, Grid, GridColumn, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import IssueDates from "./IssueDates";
import IssuePeople from "./IssuePeople";
import { IssueFormValues } from "../../../app/models/Issue";
import IssueComments from "./IssueComments";
import IssueDetails from "./IssueDetails";
import IssueDescription from "./IssueDescription";
import { runInAction } from "mobx";
import IssueCompetences from "./IssueCompetences";

interface FormValues {
    knowledgeLevel: number;
}

export default observer(function IssueItem() {

    const {profileStore, userStore, issueStore} = useStore();
    const {currentIssue: issue, loading, getIssue, editmode, setEditmode, updateIssue} = issueStore;
    const {addCompetence, removeCompetence} = profileStore;
    const {user} = userStore;
    const {id} = useParams<{id: string}>();
    
    

    useEffect (() => {
        if (id) getIssue(id);
        setEditmode(false);
    }, [id, getIssue])
    
    if (loading) 
    {
        return <LoadingComponent/>;
    }

    if (!issue) 
    {
        return <LoadingComponent/>;
    }

    const handleFormSubmit = () => {
        if (issue && issue.id)
        {
            updateIssue(issue.id, new IssueFormValues(issue));
        }
        setEditmode(false);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        runInAction(() => {
            issue!.title = value;
        })   
    }

    return (
        <Grid>
            <GridColumn width={10}>
                    <Segment>   
                        {!editmode ? (
                                <h2>{issue.title}</h2>
                        ) : (
                            <Form>
                                <Form.Input placeholder='Title' value={issue?.title} name='title' onChange={handleInputChange} />
                            </Form>     
                        )} 
                    </Segment>
                    <IssueDetails/>
                    <IssueDescription/>
                    <Segment style={{marginTop:'20px'}}>
                        <IssueComments/>
                    </Segment>
            </GridColumn>
            <GridColumn width={6}>
                <IssueDates/>
                <IssuePeople issue={issue}/>
                <IssueCompetences/>
                <Segment style={{marginTop:'20px'}}>
                        <Button.Group widths='2'>
                            {!editmode ? 
                                (<Button onClick={() => setEditmode(true)} color='blue' content='Edit'/>)
                                :
                                (<Button onClick={() => handleFormSubmit()} color='green' content='Save'/>)
                            }
                            <Button as={Link} to={'/issues'} basic color='grey' content='Back'/>
                        </Button.Group>
                    </Segment>
            </GridColumn>
        </Grid>

    )
})