import { Segment } from "semantic-ui-react";
import { UserProfileCompetence } from "../../app/models/UserProfile";
import UserCompetencesListItem from "./UserCompetencesListItem";

interface Props {
    competences: UserProfileCompetence[]
}

export default function UserCompetencesList({competences}: Props) {
    return (
        <Segment>
            {competences.map((competence) => (
                <UserCompetencesListItem key={competence.id} competence={competence} />
            ))}
        </Segment>
    )
}