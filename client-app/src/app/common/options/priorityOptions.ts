import { IssuePriority } from "../../models/Issue";

export const priorityOptions = [
    {text: 'Low', value: IssuePriority.low},
    {text: 'Medium', value: IssuePriority.medium},
    {text: 'High', value: IssuePriority.high},
    {text: 'Critical', value: IssuePriority.critical},
]