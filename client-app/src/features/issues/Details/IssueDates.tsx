import { observer } from "mobx-react-lite";
import { Grid, GridColumn, Label, Segment } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import { useStore } from "../../../app/stores/store";
import { runInAction } from "mobx";



export default observer(function IssueDates() {
    
    const {issueStore} = useStore();
    const {currentIssue: issue, editmode} = issueStore;
    return(
        <>
            <h3 style={{marginTop:'36px'}}>Dates:</h3>
            <Segment.Group>
                <Segment>
                    <Grid>
                        <GridColumn width={4} verticalAlign='middle'>
                            <Label>Creation date: </Label>
                        </GridColumn>
                        <GridColumn textAlign='left' verticalAlign='middle' width={10}>
                            {new Date(issue?.creationDate!).toDateString()}
                        </GridColumn>
                    </Grid>                
                </Segment>
                <Segment>
                    <Grid>
                        <GridColumn width={4} verticalAlign='middle'>
                            <Label>Deadline: </Label>
                        </GridColumn>
                        <GridColumn textAlign='left' verticalAlign='middle' width={10}>
                            {editmode ? 
                                (<DatePicker selected={new Date(issue?.deadline!)} onChange={(date) => {runInAction(() => issue!.deadline = date)}}/>) 
                                : 
                                (issue?.deadline && new Date(issue.deadline!).toDateString())
                            }
                            
                        </GridColumn>
                    </Grid>              
                </Segment>
            </Segment.Group>
        </>
    );
})