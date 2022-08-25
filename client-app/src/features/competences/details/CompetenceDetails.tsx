import { observer } from "mobx-react-lite";
import { Button, Card } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

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