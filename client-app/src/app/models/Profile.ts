export enum KnowledgeLevel {
    beginner = 1,
    intermediate,
    advanced,
    expert
}

export interface Profile {
    username: string;
    displayName: string;
    image: string;
    bio: string;
    knowledgeLevel: KnowledgeLevel
}

export function getKnowledgeLevelString(key: KnowledgeLevel): string {
    switch (key) {
        case KnowledgeLevel.beginner:
            return 'Beginner'
        case KnowledgeLevel.intermediate:
            return 'Intermediate'
        case KnowledgeLevel.advanced:
            return 'Advanced'
        case KnowledgeLevel.expert:
            return 'Expert'
        default:
            return 'Unknown'
    }
}