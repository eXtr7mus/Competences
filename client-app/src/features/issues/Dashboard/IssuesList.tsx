import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function CompetenceList() {

    const {issueStore} = useStore();

    const {issuesList} = issueStore;

    function truncate(str: string | undefined) {
        if (str) {
            return str.length > 300 ? str.substring(0, 300) + '...' : str;
        }
    }

    return (
        <Segment>
            <Item.Group divided>
                {issuesList.map(issue => (
                    <Item key={issue.id}>
                        <Item.Content>
                            <Item.Header as='a'>{issue.title}</Item.Header>
                            <Item.Meta>{new Date(issue.creationDate!).toDateString()}</Item.Meta>
                            <Item.Description>
                                <div>{truncate(issue.description)}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/issue/${issue.id}`} floated='right' content='View' color='green' />
                                <Label basic content={issue.creator?.displayName} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
})