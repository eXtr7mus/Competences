import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Competence } from "../models/Competence";
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

    createComtepence = async (competence: Competence) => {
        this.loading = true;
        competence.id = uuid();
        competence.creationDate = new Date();
        console.log(competence);
        try {
            await agent.Competences.create(competence);
            runInAction(() => {
                this.competenceRegistry.set(competence.id, competence);
                this.selectedCompetence = competence;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateCompetence = async (competence: Competence) => {
        this.loading = true;
        try {
            await agent.Competences.update(competence);
            runInAction(() => {
                this.competenceRegistry.set(competence.id, competence);
                this.selectedCompetence = competence;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteCompetence = async (id: string) => {
        this.loading = true;
        try {
            await agent.Competences.delete(id);
            runInAction(() => {
                this.competenceRegistry.delete(id);
                if (this.selectedCompetence?.id === id) this.cancelSelectedCompetence();
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