<template>
  <div>
    <ErrorView v-if="error" :error="error" />
    <!-- Popups -->
    <NSCreateProjectPopup v-if="popup == Popup.CreateProject" />
    <router-view />
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { Vue, Options } from "vue-class-component";
import { GetUserSuccessResponse } from "./lib/ApiTypes";
import ServerApi from "./lib/ServerApi";
import ErrorView from "@/views/errors/ErrorView.vue";
import NSCreateProjectPopup from "@/components/popups/NSCreateProjectPopup.vue";
import { NSError } from "./store";
import { Popup } from "./lib/NSTypes";

@Options({
  components: { ErrorView, NSCreateProjectPopup },
})
export default class App extends Vue {
  get error(): NSError | null {
    return this.$store.state.error;
  }
  get popup(): Popup | null {
    return this.$store.state.popup;
  }
  Popup = Popup;

  async mounted() {
    if (this.$store.state.auth.token && this.$store.state.auth.tokenExp) {
      if (!moment().isBefore(this.$store.state.auth.tokenExp)) {
        this.$store.dispatch("logout");
      } else {
        ServerApi.setToken(this.$store.state.auth.token);
        const response = await ServerApi.getUser();
        if (response.ok) {
          const userData = response.data as GetUserSuccessResponse;
          this.$store.dispatch("setUser", userData.user);
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "toastr";
@import "@/vars.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  @include text-default;
}

.toast {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
}

body {
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
</style>
