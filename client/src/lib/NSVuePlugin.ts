import { App } from "@vue/runtime-core";
import { State } from "@/store";
import { Store } from "vuex";

type NSVuePlugin = {
  showError(error: string, errorCode: number): void;
  showDefaultError(): void;
  clearError(): void;
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $ns: NSVuePlugin;
  }
}

export default {
  install: (Vue: App, store: Store<State>): void => {
    Vue.config.globalProperties.$ns = {
      showError(error: string, errorCode: number): void {
        store.dispatch("setError", {
          error: error,
          errorCode: errorCode,
        });
      },
      showDefaultError(): void {
        store.dispatch("setError", {
          error: "Page Not Found",
          errorCode: 404,
        });
      },
      clearError(): void {
        store.dispatch("setError", null);
      },
    };
  },
};
