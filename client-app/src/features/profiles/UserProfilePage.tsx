import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Header, Label, Image } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import UserCompetencesList from "./UserCompetencesList";

export default observer(function UserProfilePage() {

    const {profileStore, userStore} = useStore();

    const {getProfile, userProfile, loading} = profileStore;
    const {user} = userStore;
    const { username } = useParams<{username: string}>();


    useEffect(() => {
        getProfile(username);
    }, [getProfile, username])

    if (!userProfile)
        return <LoadingComponent/>

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    <Image src={userProfile?.image || '/assets/user.png'} circular size='tiny' spaced='right'/>
                    {userProfile.displayName}
                </Card.Header>
                <Card.Description className='Item-Description'>
                    {userProfile.bio}
                </Card.Description>
                <Header content='Competences: ' />
                { userProfile.profileCompetences.length > 0 ?
                    <UserCompetencesList competences={userProfile.profileCompetences} />
                    :
                    <Label content='This person has no competences yet' style={{marginTop:'10px'}}/>
                }
            </Card.Content>
            {user?.username === userProfile.username &&
                <Button style={{width: '12%', margin: '10px'}} as={Link} to={`/profiles/${username}/edit`} basic color='blue' content='Edit profile' />
            }
        </Card>
        
    )
})