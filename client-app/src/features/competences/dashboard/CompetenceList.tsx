import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function CompetenceList() {

    const {competenceStore} = useStore();

    const {competencesByDate, loading, deleteCompetence} = competenceStore;

    const [target, setTarget] = useState('');

    function handleCompetenceDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteCompetence(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {competencesByDate.map(competence => (
                    <Item key={competence.id}>
                        <Item.Content>
                            <Item.Header as='a'>{competence.name}</Item.Header>
                            <Item.Meta>{new Date(competence.creationDate!).toDateString()}</Item.Meta>
                            <Item.Description>
                                <div>{competence.description}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => competenceStore.selectCompetence(competence.id)} floated='right' content='View' color='green' />
                                <Button 
                                    name={competence.id}
                                    loading={loading && target === competence.id} 
                                    onClick={(e) => handleCompetenceDelete(e, competence.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                <Label basic content={competence.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
})