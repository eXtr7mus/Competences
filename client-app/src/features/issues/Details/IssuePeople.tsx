import { observer } from "mobx-react-lite";
import { Label, Segment, Image, Grid, GridColumn } from "semantic-ui-react";
import { Issue } from "../../../app/models/Issue";

interface Props {
    issue: Issue;
}

export default observer(function IssuePeople({issue}: Props) {
    return(
        <>
            <h3>People:</h3>
            <Segment.Group>
                <Segment>
                    <Grid>
                        <GridColumn width={4} verticalAlign='middle'>
                            <Label style={{marginRight:'10px'}}>Creator: </Label>
                        </GridColumn>
                        {issue.creator &&
                            <GridColumn textAlign='left' verticalAlign='middle' width={10}>
                                <Image src={issue.creator.image || '/assets/user.png'} circular size='mini' spaced='right'/>
                                {issue.creator.displayName}
                            </GridColumn>
                        }
                    </Grid>
                </Segment>
                <Segment>
                    <Grid>
                        <GridColumn width={4} verticalAlign='middle'>
                            <Label style={{marginRight:'10px'}}>Assignee: </Label>
                        </GridColumn>
                        {issue.assignee ?
                            (
                                <GridColumn textAlign='left' verticalAlign='middle' width={10}>
                                    <Image src={issue.assignee.image || '/assets/user.png'} circular size='mini' spaced='right'/>
                                    {issue.assignee.displayName}
                                </GridColumn>     
                            ) : (
                                <GridColumn textAlign='left' verticalAlign='middle' width={10}>
                                    None
                                </GridColumn>
                            )                 
                        }
                    </Grid>
                </Segment>
            </Segment.Group>
        </>
    );
})