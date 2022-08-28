import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CompetenceDetails from "../details/CompetenceDetails";
import CompetenceForm from "../form/CompetenceForm";
import CompetenceList from "./CompetenceList";

export default observer(function CompetencesDashboard() {

    const {competenceStore} = useStore();
    const {selectedCompetence, loadCompetences, competenceRegistry, editMode} = competenceStore;

    useEffect(() => {
        if (competenceRegistry.size <= 1) loadCompetences();
    },[competenceRegistry.size, loadCompetences])

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