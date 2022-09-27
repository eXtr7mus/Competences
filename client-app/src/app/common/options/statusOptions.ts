import { IssueStatus } from "../../models/Issue";

export const statusOptions = [
    {text: 'New', value: IssueStatus.new},
    {text: 'Assigned', value: IssueStatus.assigned},
    {text: 'In Progress', value: IssueStatus.inProgress},
    {text: 'Done', value: IssueStatus.done},
    {text: 'Closed', value: IssueStatus.closed},
    {text: 'Cancelled', value: IssueStatus.cancelled},
]