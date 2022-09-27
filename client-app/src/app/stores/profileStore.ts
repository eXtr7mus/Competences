import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { ProfileFormValues, UserProfile, UserProfileCompetence } from "../models/UserProfile";
import { store } from "./store";
import { toast } from "react-toastify";

export default class ProfileStore {

    userProfile: UserProfile | undefined = undefined;
    profilesRegistry = new Map<string, UserProfile>();
    loading = false;
    uploading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get profilesList() {
        return Array.from(this.profilesRegistry.values());
    }

    getProfiles = async () => {
        this.loading = true;
        try {
            const profilesList = await agent.Profile.list();
            profilesList.forEach(profile => {
                runInAction(() => {
                    this.profilesRegistry.set(profile.username, profile);
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

    updateProfile = async (profile: ProfileFormValues) => {
        try {
            await agent.Profile.update(profile);
            let updatedProfile = {...this.userProfile, ...profile}
            this.profilesRegistry.set(profile.username, updatedProfile as UserProfile);
        } catch (error) {
            console.log(error);
        }
    }

    uploadPhoto = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.Profile.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if (this.userProfile) {
                    this.userProfile.image = photo.url;
                    console.log(this.userProfile.image);
                    let updatedProfile = {...this.userProfile, ...this.userProfile}
                    this.profilesRegistry.set(this.userProfile.username, updatedProfile as UserProfile);
                    if (store.userStore.user) {
                        store.userStore.setImage(photo.url);
                    }
                    toast.info('User photo updated successfully');
                }
                this.uploading = false;
            })
        } catch (error) {   
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    deletePhoto = async () => {
        this.uploading = true;
        try {
            await agent.Profile.deletePhoto();
            runInAction(() => {
                if (this.userProfile) {
                    this.userProfile.image = undefined;
                    let updatedProfile = {...this.userProfile, ...this.userProfile}
                    this.profilesRegistry.set(this.userProfile.username, updatedProfile as UserProfile);
                    if (store.userStore.user) {
                        store.userStore.setImage();
                    }
                    toast.info('User photo deleted successfully');
                }
                
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.uploading = false);
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