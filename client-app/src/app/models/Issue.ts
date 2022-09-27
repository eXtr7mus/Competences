import { UserProfile } from "./UserProfile";

export enum IssuePriority {
    low,
    medium,
    high,
    critical
}

export enum IssueStatus {
    new,
    assigned,
    inProgress,
    done,
    closed,
    cancelled
}

export interface IssueCompetence {
    competenceId: string,
    name: string,
    category: string,
    knowledgePriority: number;
}

export interface Issue {
    id: string;
    title: string;
    description: string;
    creator: UserProfile;
    assignee: UserProfile;
    status: number;
    creationDate: Date | null;
    deadline: Date | null;
    priority: number;
    competences: IssueCompetence[];
}

export class Issue implements Issue {
    constructor(init?: IssueFormValues) {
        Object.assign(this, init);
    }
}

export class IssueCompetence implements IssueCompetence {
    constructor(id: string, knowledgePriority: number) {
        this.competenceId = id;
        this.knowledgePriority = knowledgePriority;
    }
}

export class IssueFormValues {
    id?: string = undefined;
    title: string = '';
    description: string = '';
    status: number = 0;
    deadline: Date | null = null;
    priority: number = 0;

    constructor(issue?:IssueFormValues) {
        if (issue) {
            this.id = issue.id;
            this.title = issue.title;
            this.priority = issue.priority;
            this.deadline = issue.deadline;
            this.status = issue.status;
            this.description = issue.description;            
        }

    }

}

export function getIssuePriorityString(key: IssuePriority): string {
    switch (key) {
        case IssuePriority.low:
            return 'Low'
        case IssuePriority.medium:
            return 'Medium'
        case IssuePriority.high:
            return 'High'
        case IssuePriority.critical:
            return 'Critical'
        default:
            return 'Unknown'
    }
}

export function getIssueStatusString(key: IssueStatus): string {
    switch (key) {
        case IssueStatus.new:
            return 'New'
        case IssueStatus.assigned:
            return 'Assigned'
        case IssueStatus.inProgress:
            return 'In Progress'
        case IssueStatus.done:
            return 'Done'
        case IssueStatus.closed:
            return 'Closed'
        case IssueStatus.cancelled:
            return 'Cancelled'
        default:
            return 'Unknown'
    }
}