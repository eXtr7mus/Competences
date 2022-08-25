import axios, { AxiosResponse } from "axios";
import { string } from "yup";
import { Competence } from "../models/Competence";
import { User, UserFormValues } from "../models/User";
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
    update: (competence: Competence) => requests.put<void>(`competences/${competence.id}`, competence),
    create: (competence: Competence) => requests.post<void>('/competences', competence),
    delete: (id: string) => requests.delete<void>(`/competences/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('account/login', user),
    register: (user: UserFormValues) => requests.post<User>('account/register', user)
}

const agent = {
    Competences,
    Account
}

export default agent;