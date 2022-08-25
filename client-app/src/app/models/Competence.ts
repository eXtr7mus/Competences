import { Profile } from "./Profile";

export interface Competence {
    id: string,
    name: string,
    description: string, 
    category: string,
    creationDate: Date | null,
    users: Profile[]
}