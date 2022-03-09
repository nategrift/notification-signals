import { Popup } from "@/lib/NSTypes";
import { createStore, Store } from "vuex";
import authModule, { AuthState } from "./modules/auth";

export type NSError = {
  errorCode: number;
  error: string;
};

export type State = {
  error: NSError | null;
  popup: Popup | null;

  // modules
  auth: AuthState;
};

export default createStore({
  state: {
    error: null,
    popup: null,
  } as State,
  getters: {},
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setPopup(state, popup) {
      state.popup = popup;
    },
  },
  actions: {
    setError({ commit }, error) {
      commit("setError", error);
    },
    setPopup({ commit }, popup: Popup) {
      commit("setPopup", popup);
    },
  },
  modules: {
    auth: authModule,
  },
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
