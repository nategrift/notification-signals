import { createApp } from "vue";
import App from "./App.vue";
import ServerApi from "./lib/ServerApi";
import router from "./router";
import store from "./store";

ServerApi.init(store);
createApp(App).use(store).use(router).mount("#app");
