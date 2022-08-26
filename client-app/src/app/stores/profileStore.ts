import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import {ServerError} from "../models/ServerError"
import { UserProfile, UserProfileCompetence } from "../models/UserProfile";

export default class ProfileStore {

    userProfile: UserProfile | undefined = undefined;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    getProfile = async (username: string) => {
        this.loading = true;
        try {
            const userProfile = await agent.Profile.details(username);
            runInAction(() => {
                this.userProfile = userProfile;
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

    addCompetence = async (competenceId: string, knowledgeLevel: number) => {
        try {
            await agent.Profile.addCompetence(competenceId, knowledgeLevel);
        } catch (error) {
            console.log(error);
        }
    }

    removeCompetence = async (competenceId: string) => {
        try {
            await agent.Profile.removeCompetence(competenceId);
        } catch (error) {
            console.log(error);
        }
    }
    
}