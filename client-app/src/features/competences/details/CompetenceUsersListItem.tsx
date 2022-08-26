import { List, Segment } from "semantic-ui-react";
import { CompetenceProfiles, getKnowledgeLevelString } from "../../../app/models/CompetenceProfiles";

interface Props {
    user: CompetenceProfiles
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