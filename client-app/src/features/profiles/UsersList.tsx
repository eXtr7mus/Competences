import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Item, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";

export default observer(function UsersList() {

    const {profileStore} = useStore();

    const {getProfiles, profilesRegistry, loading, profilesList} = profileStore;

    useEffect(() => {
        //basically we use 2 here because 1st value in registry may be current user, and we still need to load the rest
        if (profilesRegistry.size < 2) getProfiles();
    }, [profilesRegistry, getProfiles])

    if (loading) return <LoadingComponent/>

    return (
        <Segment>
            <Item.Group divided>
                {profilesList?.map(profile => (
                    <Item key={profile.username}>
                        <Item.Content>
                            <Image src={profile.image || '/assets/user.png'} circular size='tiny' spaced='right'/>
                            <Item.Header as={Link} to={`/profiles/${profile.username}`}>{profile.displayName}</Item.Header>
                            <Item.Description className='Item-Description'>
                                <span>{profile.bio}</span>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
})