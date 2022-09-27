import { runInAction } from "mobx";
import { observer } from "mobx-react-lite"
import { useEffect } from "react";
import { Button, DropdownItemProps, Form, Grid, GridColumn } from "semantic-ui-react";
import { history } from "../../..";
import agent from "../../../app/api/agent";
import { priorityOptions } from "../../../app/common/options/priorityOptions";
import { Competence } from "../../../app/models/Competence";
import { IssuePriority } from "../../../app/models/Issue";
import { useStore } from "../../../app/stores/store"

export default observer(function CompetenceSelect(){
    const {competenceStore, issueStore, modalStore} = useStore();
    const {loadCompetences, competenceRegistry} = competenceStore;
    const {addCompetence, currentIssue} = issueStore;
    const {closeModal} = modalStore;
    

    let competenceOptions : {text: string, value: string}[] = [];
    let selectedCompetenceId: string;
    let selectedPriority: IssuePriority;

    useEffect(() => {
        loadCompetences().then(() => {
            competenceRegistry.forEach((c, id) => {
                competenceOptions.push({text: c.name, value: id})
            })
        });
    })

    const handleAddButton = () => {
        if (currentIssue && selectedCompetenceId)
            addCompetence(currentIssue.id, selectedCompetenceId, selectedPriority).then(() => {closeModal()}).then(() => history.push(`/issue/${currentIssue.id}`))
    }
    
    return (
        <>
        <Grid>
            <GridColumn width={10}>
                <Form>
                    <Form.Select 
                        fluid
                        placeholder='Select a competence'
                        options={competenceOptions} 
                        onChange={(e, d) => runInAction(() => selectedCompetenceId = d.value as string)}
                    />
                </Form>
            </GridColumn>
            <GridColumn width={6}>
            <Form>
                    <Form.Select 
                        fluid
                        placeholder='Priority'
                        options={priorityOptions} 
                        onChange={(e, d) => runInAction(() => selectedPriority = d.value as number)}
                    />
                </Form>
            </GridColumn>
        </Grid>
        <Button fluid style={{marginTop:'10px'}} onClick={() => handleAddButton()} color='green' content='Add'/>
        </>
    )
})