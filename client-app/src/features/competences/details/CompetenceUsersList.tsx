import { Segment } from "semantic-ui-react";
import { Competence } from "../../../app/models/Competence";
import CompetenceUsersListItem from "./CompetenceUsersListItem";

interface Props {
    competence: Competence
}

export default function CompetenceUsersList({competence}: Props) {
    return (
        <Segment>
            {competence.users.map((user) => (
                <CompetenceUsersListItem user={user} />
            ))}
        </Segment>
    )
}