import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Issue, IssueCompetence, IssueFormValues } from "../models/Issue";
import { v4 as uuid } from 'uuid';

export default class IssueStore {

    currentIssue: Issue | undefined = undefined;
    issuesRegistry = new Map<string, Issue>();
    issueAdded = false;
    loading = false;
    editmode = false;

    constructor() {
        makeAutoObservable(this);
    }

    get issuesList() {
        return Array.from(this.issuesRegistry.values());
    }

    setEditmode = (editmode: boolean) => {
        this.editmode = editmode;
    }

    setIssueAdded = (issueAdded: boolean ) => {
        this.issueAdded = issueAdded;
    }

    getIssues = async () => {
        this.loading = true;
        try {
            const issuesList = await agent.Issues.list();
            issuesList.forEach(issue => {
                runInAction(() => {
                    this.issuesRegistry.set(issue.id, issue);
                })
            });

        } catch (error) {
            runInAction(() => {
                console.log(error)
            })
        } finally {
            runInAction(() => {
                this.loading = false;
            })
            
        }
    }

    getIssue = async (id: string) => {
        this.loading = true;
        try {
            const issue = await agent.Issues.details(id);
            runInAction(() => {
                issue.competences = issue.competences.sort((a, b) => (a.knowledgePriority < b.knowledgePriority ? 1 : (b.knowledgePriority < a.knowledgePriority ? -1 : 0)));
                this.currentIssue = issue;
            })

        } catch (error) {
            runInAction(() => {
                console.log(error)
            })
        } finally {
            runInAction(() => {
                this.loading = false;
            })
            
        }
    }

    updateAssignee =async (issueId: string, username: string) => {
        try {
            await agent.Issues.updateAssignee(issueId, username);
        } catch (error) {
            console.log(error);
        }
    }

    createIssue = async (issue: IssueFormValues) => {
        issue.id = uuid();
        try {
            await agent.Issues.create(issue);
            runInAction(() => {
                this.issueAdded = true;
                const newIssue = new Issue(issue);
                this.issuesRegistry.set(newIssue.id, newIssue);
                this.currentIssue = newIssue;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateIssue = async (id: string, issue: IssueFormValues) => {
        try {
            console.log(issue);
            await agent.Issues.edit(id, issue);
            let updatedIssue = {...this.currentIssue, ...issue};
            this.issuesRegistry.set(id, updatedIssue as Issue);
        } catch (error) {
            console.log(error);
        }
    }

    addCompetence = async (issueId: string, competenceId: string, knowledgePriority: number) => {
        try {
            await agent.Issues.addCompetence(issueId, new IssueCompetence(competenceId, knowledgePriority));
        } catch (error) {
            console.log(error);
        }
    }

    deleteCompetence = async (issueId: string, competenceId: string) => {
        try {
            await agent.Issues.deleteCompetence(issueId, competenceId);
            runInAction(() => {
                if (this.currentIssue)
                    this.currentIssue.competences = this.currentIssue.competences.filter((c) => c.competenceId !== competenceId)
            })
        } catch (error) {
            console.log(error);
        }
    }
    
}