import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Competence, CompetenceFormValues } from "../models/Competence";
import { v4 as uuid } from 'uuid';

export default class CompetenceStore {
    competenceRegistry = new Map<string, Competence>();
    selectedCompetence: Competence | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get competencesByDate() {
        return Array.from(this.competenceRegistry.values()).sort((a, b) => 
            new Date(a.creationDate!).getDate() - new Date(b.creationDate!).getDate());
    }

    loadCompetences = async () => {
        try {
            const competences = await agent.Competences.list();
            competences.forEach(competence => {
                runInAction(() => {
                    this.competenceRegistry.set(competence.id, competence);
                }) 
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadCompetence = async (competenceId: string) => {
        this.setLoadingInitial(true);
        try {
            const competence = await agent.Competences.details(competenceId);
            this.setCompetence(competence);
            runInAction(() => {
                this.selectedCompetence = competence;
            }) 
            this.setLoadingInitial(false);
            return competence;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        } 
     }

    private setCompetence = (competence: Competence) => {
        this.competenceRegistry.set( competence.id, competence );
    }

    private getCompetence = (id: string) => {
        return this.competenceRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectCompetence = (id: string) => {
        this.selectedCompetence = this.competenceRegistry.get(id);
    }

    cancelSelectedCompetence = () => {
        this.selectedCompetence = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectCompetence(id) : this.cancelSelectedCompetence();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createComtepence = async (competence: CompetenceFormValues) => {
        competence.id = uuid();
        competence.creationDate = new Date();
        console.log(competence);
        try {
            await agent.Competences.create(competence);
            runInAction(() => {
                const newCompetence = new Competence(competence);
                this.competenceRegistry.set(newCompetence.id, newCompetence);
                this.selectedCompetence = newCompetence;
                this.editMode = false;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateCompetence = async (competence: CompetenceFormValues) => {
        try {
            await agent.Competences.update(competence);
            runInAction(() => {
                if (competence.id) {
                    let updatedCompetence = {...this.selectedCompetence, ...competence}
                    this.competenceRegistry.set(competence.id, updatedCompetence as Competence);
                    this.selectedCompetence = updatedCompetence as Competence;
                    this.editMode = false;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteCompetence = async (id: string) => {
        this.loading = true;
        try {
            await agent.Competences.delete(id);
            runInAction(() => {
                this.competenceRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}