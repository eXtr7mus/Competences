import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import CompetenceStore from "./competenceStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
    competenceStore: CompetenceStore,
    commonStore: CommonStore,
    modalStore: ModalStore,
    userStore: UserStore,
    profileStore: ProfileStore
}

export const store: Store = {
    competenceStore: new CompetenceStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    userStore: new UserStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}