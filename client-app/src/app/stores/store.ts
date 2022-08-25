import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import CompetenceStore from "./competenceStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
    competenceStore: CompetenceStore,
    commonStore: CommonStore,
    modalStore: ModalStore,
    userStore: UserStore
}

export const store: Store = {
    competenceStore: new CompetenceStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}