import { Label, List, Segment, Image } from "semantic-ui-react";
import { CompetenceProfiles, getKnowledgeLevelString } from "../../../app/models/CompetenceProfiles";
import { useStore } from "../../../app/stores/store";

interface Props {
    user: CompetenceProfiles
}

export default function CompetenceUsersListItem({user}: Props) {
    const {userStore} = useStore();
    const {user: currentUser} = userStore;

    return (
        <Segment>
            {currentUser?.username === user.username &&
                <Label style={{ position: 'absolute' }} color='orange' ribbon='right'>
                    That's you
                </Label>
            }
            <List horizontal divided>
                <List.Item>
                    <Image src={user.image || '/assets/user.png'} circular size='mini' spaced='right'/>
                </List.Item>
                <List.Item>
                    {user.displayName}
                </List.Item>
                <List.Item>
                    {getKnowledgeLevelString(user.knowledgeLevel)}
                </List.Item>
            </List>
        </Segment>
    )
}