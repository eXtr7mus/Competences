import { CompetenceProfiles } from "./CompetenceProfiles";

export interface Competence {
    id: string,
    name: string,
    description: string, 
    category: string,
    creationDate: Date | null,
    users: CompetenceProfiles[]
}

export class Competence implements Competence {
    constructor(init?: CompetenceFormValues) {
        Object.assign(this, init);
    }
}

export class CompetenceFormValues {
    id?: string = undefined;
    name: string = '';
    description: string = '';
    category: string = '';
    creationDate: Date | null = null;

    constructor(competence? : CompetenceFormValues) {
        if (competence) {
            this.id = competence.id;
            this.name = competence.name;
            this.description = competence.description;
            this.category = competence.category;
            this.creationDate = competence.creationDate;
        }
    }
}