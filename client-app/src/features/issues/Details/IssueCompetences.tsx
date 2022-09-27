import { observer } from "mobx-react-lite";
import { Button, Grid, GridColumn, Segment } from "semantic-ui-react";
import { getIssuePriorityString } from "../../../app/models/Issue";
import { useStore } from "../../../app/stores/store";
import CompetenceSelect from "../../competences/modals/CompetenceSelect";



export default observer(function IssueCompetences() {
   
    const {issueStore, modalStore} = useStore();
    const {currentIssue: issue, deleteCompetence} = issueStore;

    const handleDeleteButton = (competenceId: string) => {
        if (issue)
            deleteCompetence(issue.id, competenceId);
    }

    return(
        <>
            <h3>Competences: </h3> 
            <Segment style={{marginTop:'20px'}}>  
                    {issue?.competences?.map((competence) => ( 
                        <Grid key={competence.competenceId}>
                            <GridColumn width={8} verticalAlign='middle'>
                                {competence.name}
                            </GridColumn>
                            <GridColumn width={3} verticalAlign='middle' textAlign='right'>
                                {getIssuePriorityString(competence.knowledgePriority)}
                            </GridColumn>
                            <GridColumn width={5}>
                                <Button fluid onClick={() => {handleDeleteButton(competence.competenceId)}} color='red' content='Delete'/>
                            </GridColumn>
                        </Grid>
                    ))}
                
                <Button fluid style={{marginTop:'30px'}} onClick={() => modalStore.openModal(<CompetenceSelect />)} color='green' content='Add competence'/>

            </Segment>
        </>
    );
})