import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import IssuesList from "./IssuesList";

export default observer(function IssuesDashboard() {

    const {issueStore} = useStore();
    const {getIssues, issuesRegistry, loading, issueAdded, setIssueAdded} = issueStore;

    useEffect(() => {
        if (issuesRegistry.size < 2 || issueAdded) {
            getIssues();
            setIssueAdded(false);
        }
    },[issuesRegistry.size, getIssues, issueAdded, setIssueAdded])

    if (loading) return (<LoadingComponent content='Loading competences...'/>)

    return (
        <Grid>
            <GridColumn width={10}>
                <IssuesList />
            </GridColumn>
            <GridColumn width={6}>
                <Button as={Link} to={'createIssue'}  color='green' content='Create new issue'/>
            </GridColumn>
        </Grid>
        
    );
})