import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import { Form, Grid, GridColumn, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function IssueDescription() {
   
    const {issueStore} = useStore();
    const {currentIssue: issue, editmode} = issueStore;


    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        runInAction(() => {
            issue!.description = value;
        })   
    }

    return(
        <Segment style={{marginTop:'20px'}}>   
            <Grid>
                <GridColumn width={16} verticalAlign='middle'>
                    {!editmode ? (
                        <>
                            <h4>Description:</h4> 
                            {issue?.description}
                        </>
                    ) : (
                        <>
                            <h4>Description:</h4>
                            <Form>
                                <Form.TextArea placeholder='Description' value={issue?.description} name='description' onChange={handleInputChange} />
                            </Form>
                            
                        </>
                    )}

                </GridColumn>
            </Grid>

        </Segment>
    );
})