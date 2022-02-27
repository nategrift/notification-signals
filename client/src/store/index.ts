import { createStore, Store } from "vuex";
import authModule, { AuthState } from "./modules/auth";

export type State = {
  error: string | null;

  // modules
  auth: AuthState;
};

export default createStore({
  state: {
    error: null,
  } as State,
  getters: {},
  mutations: {
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    setError({ commit }, error: string) {
      commit("setError", error);
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
