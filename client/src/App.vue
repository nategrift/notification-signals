<template>
  <div>
    <div>{{ username ?? "Not logged in" }}</div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/signup">Signup</router-link>
      <router-link to="/login">Login</router-link>
      <a @click="logout">Logout</a>
    </nav>
    <div v-if="error">{{ error }}</div>
    <router-view />
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { Vue } from "vue-class-component";
import { GetUserSuccessResponse } from "./lib/ApiTypes";
import ServerApi from "./lib/ServerApi";

export default class App extends Vue {
  get error(): string | null {
    return this.$store.state.error;
  }
  get username(): string | null {
    return this.$store.state.auth.user?.username ?? null;
  }

  logout() {
    this.$store.dispatch("logout");
  }

  async mounted() {
    console.log("INIT");
    if (this.$store.state.auth.token && this.$store.state.auth.tokenExp) {
      console.log(this.$store.state.auth.tokenExp);
      console.log(moment());
      console.log(!moment().isBefore(this.$store.state.auth.tokenExp));
      if (!moment().isBefore(this.$store.state.auth.tokenExp)) {
        this.$store.dispatch("logout");
      } else {
        ServerApi.setToken(this.$store.state.auth.token);
        const response = await ServerApi.getUser();
        if (response.ok) {
          const userData = response.data as GetUserSuccessResponse;
          this.$store.dispatch("setUser", userData.user);
          this.$store.dispatch("setLoggedIn", true);
        }
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  * {
    padding: 10px;
  }
}
</style>
