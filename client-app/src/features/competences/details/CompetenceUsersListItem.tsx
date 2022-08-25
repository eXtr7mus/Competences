import { List, Segment } from "semantic-ui-react";
import { getKnowledgeLevelString, Profile } from "../../../app/models/Profile";

interface Props {
    user: Profile
}

export default function CompetenceUsersListItem({user}: Props) {
    return (
        <Segment>
            <List horizontal divided>
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