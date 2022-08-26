import axios, { AxiosResponse } from "axios";
import { string } from "yup";
import { Competence, CompetenceFormValues } from "../models/Competence";
import { User, UserFormValues } from "../models/User";
import { UserProfile, UserProfileCompetence } from "../models/UserProfile";
import { store } from "../stores/store";

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use((config) => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Competences = {
    list: () => requests.get<Competence[]>('/competences'),
    details: (id: string) => requests.get<Competence>(`/competences/${id}`),
    update: (competence: CompetenceFormValues) => requests.put<void>(`competences/${competence.id}`, competence),
    create: (competence: CompetenceFormValues) => requests.post<void>('/competences', competence),
    delete: (id: string) => requests.delete<void>(`/competences/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('account/login', user),
    register: (user: UserFormValues) => requests.post<User>('account/register', user)
}

const Profile = {
    details: (username: string) => requests.get<UserProfile>(`/Profile/${username}`),
    getCompetences: (username: string) => requests.get<UserProfileCompetence[]>(`/Profile/${username}/competences`),
    addCompetence: (competenceId: string, knowledgeLevel: number) => requests.post<void>(`/competences/${competenceId}/adduser?knowledgeLevel=${knowledgeLevel}`, ''),
    removeCompetence: (competenceId: string) => requests.post<void>(`/competences/${competenceId}/adduser`, '')
}

const agent = {
    Competences,
    Account,
    Profile
}

export default agent;