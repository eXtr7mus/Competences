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