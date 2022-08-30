import { KnowledgeLevel } from "./CompetenceProfiles";

export interface UserProfileCompetence {
    id: string,
    name: string,
    category: string,
    knowledgeLevel: KnowledgeLevel
}

export interface UserProfile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string; 
    profileCompetences: UserProfileCompetence[];
}

export class UserProfile implements UserProfile {
    constructor(init?: ProfileFormValues) {
        Object.assign(this, init);
    }
}

export class ProfileFormValues {
    username: string = '';
    displayName: string = '';
    bio?: string = '';
    image?: string;

    constructor(profile? : ProfileFormValues) {
        if (profile) {
            this.username = profile.username;
            this.displayName = profile.displayName;
            this.bio = profile.bio;
            this.image = profile.image;
        }
    }
}

export interface Photo {
    id: string;
    url: string;
}