import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { string } from "yup";
import { Competence, CompetenceFormValues } from "../models/Competence";
import { User, UserFormValues } from "../models/User";
import { Photo, ProfileFormValues, UserProfile, UserProfileCompetence } from "../models/UserProfile";
import { store } from "../stores/store";
import {history} from "../.."

axios.defaults.baseURL = 'http://localhost:5000/api';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.interceptors.request.use((config) => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(100);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } 
            break;
        case 401:
            toast.error('Unauthorised');
            break;
        case 404: 
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
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
    list: () => requests.get<UserProfile[]>('/Profiles'),
    details: (username: string) => requests.get<UserProfile>(`/Profiles/${username}`),
    getCompetences: (username: string) => requests.get<UserProfileCompetence[]>(`/Profiles/${username}/competences`),
    addCompetence: (competenceId: string, knowledgeLevel: number) => requests.post<void>(`/competences/${competenceId}/adduser?knowledgeLevel=${knowledgeLevel}`, ''),
    removeCompetence: (competenceId: string) => requests.post<void>(`/competences/${competenceId}/adduser`, ''),
    update: (profile: ProfileFormValues) => requests.post<void>(`/Profiles/${profile.username}/edit`, profile),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('photos', formData, {
            headers: {'Content-type': 'multipart/form-data'}
        })
    },
    deletePhoto: () => requests.delete(`/photos/`)
}

const agent = {
    Competences,
    Account,
    Profile
}

export default agent;