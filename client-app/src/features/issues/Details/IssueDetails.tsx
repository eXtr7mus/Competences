import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { SyntheticEvent } from "react-toastify/dist/utils";
import { DropdownProps, Form, Grid, GridColumn, Label, Segment } from "semantic-ui-react";
import { priorityOptions } from "../../../app/common/options/priorityOptions";
import { statusOptions } from "../../../app/common/options/statusOptions";
import { getIssuePriorityString, getIssueStatusString } from "../../../app/models/Issue";
import { useStore } from "../../../app/stores/store";


export default observer(function IssueDetails() {
    const {issueStore} = useStore();
    const {currentIssue: issue, editmode} = issueStore;

    function handleInputChange(event: SyntheticEvent, data: DropdownProps) {
        const value = data.value as number;
        runInAction(() => {
            issue!.priority = value;
        })   
    }
    
    return(
        <Segment style={{marginTop:'20px'}}>   
                <h4>Details:</h4> 
                <Grid>
                    <GridColumn width={2} verticalAlign='middle'>
                        <Label>Priority: </Label>
                    </GridColumn>
                    <GridColumn textAlign='left' verticalAlign='middle' width={13}>
                        {editmode ? (
                        <Form>
                            <Form.Select 
                                options={priorityOptions} 
                                value={issue?.priority} 
                                onChange={(e, d) => runInAction(() => issue!.priority = d.value as number)}
                            />
                        </Form>
                        ) : (
                            getIssuePriorityString(issue!.priority)
                        )}             
                    </GridColumn>
                </Grid>
                <Grid>
                    <GridColumn width={2} verticalAlign='middle'>
                        <Label>Status: </Label>
                    </GridColumn>
                    <GridColumn textAlign='left' verticalAlign='middle' width={13}>
                        {editmode ? (
                            <Form>
                                <Form.Select 
                                    options={statusOptions} 
                                    value={issue?.status} 
                                    onChange={(e, d) => runInAction(() => issue!.status = d.value as number)}
                                />
                            </Form>
                        ) : (
                            getIssueStatusString(issue!.status)
                        )}     
                    </GridColumn>
                </Grid>                        
        </Segment>
    );
})