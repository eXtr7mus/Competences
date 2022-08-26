import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import UserCompetencesList from "./UserCompetencesList";

export default observer(function UserProfilePage() {

    const {profileStore} = useStore();

    const {getProfile, userProfile, loading} = profileStore;
    const { username } = useParams<{username: string}>();


    useEffect(() => {
        getProfile(username);
    }, [getProfile, username])

    if (!userProfile)
        return<h1>Not found</h1>

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{userProfile.displayName}</Card.Header>
                <Card.Description>
                    Bio goes here
                </Card.Description>
                <Header content='Competences: ' />
                { userProfile.profileCompetences.length > 0 ?
                    <UserCompetencesList competences={userProfile.profileCompetences} />
                    :
                    <Label content='This person has no competences yet' style={{marginTop:'10px'}}/>
                }
            </Card.Content>
            {/* <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(competence.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedCompetence} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content> */}
        </Card>
    )
})