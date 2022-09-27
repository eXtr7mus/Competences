import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import CompetenceStore from "./competenceStore";
import IssueStore from "./issueStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
    competenceStore: CompetenceStore,
    commonStore: CommonStore,
    modalStore: ModalStore,
    userStore: UserStore,
    profileStore: ProfileStore,
    issueStore: IssueStore
}

export const store: Store = {
    competenceStore: new CompetenceStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    userStore: new UserStore(),
    profileStore: new ProfileStore(),
    issueStore: new IssueStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}