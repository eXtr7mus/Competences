import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import CompetenceDetails from "../details/CompetenceDetails";
import CompetenceList from "./CompetenceList";

export default observer(function CompetencesDashboard() {

    const {competenceStore} = useStore();
    const {loadCompetences, competenceRegistry} = competenceStore;

    useEffect(() => {
        if (competenceRegistry.size <= 1) loadCompetences();
    },[competenceRegistry.size, loadCompetences])

    if (competenceStore.loadingInitial) return (<LoadingComponent content='Loading competences...'/>)

    return (
        <Grid>
            <GridColumn width={10}>
                <CompetenceList />
            </GridColumn>
            <GridColumn width={6}>
            </GridColumn>
        </Grid>
        
    );
})