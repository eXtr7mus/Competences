import { Label, List, Segment } from "semantic-ui-react"
import { getKnowledgeLevelString } from "../../app/models/CompetenceProfiles"
import { UserProfileCompetence } from "../../app/models/UserProfile"

interface Props {
    competence: UserProfileCompetence
}

export default function UserCompetencesListItem({competence}: Props) {
    return (
        <Segment>
            <List horizontal divided>
                <List.Item>
                    {competence.name}
                </List.Item>
                <List.Item>
                    {getKnowledgeLevelString(competence.knowledgeLevel)}
                </List.Item>
                <List.Item>
                    <Label content={competence.category}/>
                </List.Item>
            </List>
        </Segment>
    )
}