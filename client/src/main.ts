import { createApp } from "vue";
import App from "./App.vue";
import ServerApi from "./lib/ServerApi";
import router from "./router";
import store from "./store";
import NSVuePlugin from "@/lib/NSVuePlugin";

ServerApi.init(store);
createApp(App).use(store).use(router).use(NSVuePlugin, store).mount("#app");
