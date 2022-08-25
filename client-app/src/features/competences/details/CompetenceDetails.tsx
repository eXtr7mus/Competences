import { observer } from "mobx-react-lite";
import { Button, Card, Label } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CompetenceUsersList from "./CompetenceUsersList";

export default observer(function CompetenceDetails() {

    const {competenceStore} = useStore();
    const {selectedCompetence: competence, openForm, cancelSelectedCompetence} = competenceStore;

    if (!competence) return <h1>not found</h1>


    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{competence.name}</Card.Header>
                <Card.Meta>
                    <span>{new Date(competence.creationDate!).toDateString()}</span>
                </Card.Meta>
                <Card.Description>
                    {competence.description}
                </Card.Description>
                { competence.users.length > 0 ?
                    <CompetenceUsersList competence={competence} />
                    :
                    <Label content='Nobody has this competence yet' style={{marginTop:'10px'}}/>
                }
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(competence.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedCompetence} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})