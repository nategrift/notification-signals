<template>
  <div class="dashboard">
    <div class="sidepanel">
      <div class="profile">{{ username }}</div>
      <nav class="nav">
        <router-link to="/">Account</router-link>
        <router-link to="/">Projects</router-link>
        <router-link to="/">Stats</router-link>
      </nav>
      <div class="footer"><a @click="logout">Logout</a></div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class NSDashboard extends Vue {
  get username(): string {
    return this.$store.state.auth.user?.username ?? "";
  }

  logout() {
    this.$store.dispatch("logout");
    this.$router.push("login");
  }
}
</script>

<style lang="scss" scoped>
@import "@/vars.scss";
.dashboard {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-areas: "nav content";
  grid-template-columns: 250px auto;
  .sidepanel {
    background-color: $color-dark-grey;
    grid-area: nav;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    @include text-focus;
    color: $color-plain-white;
    text-transform: uppercase;

    .profile {
      @include text-section-title;
      color: $color-plain-white;
    }
    .nav {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 30%;

      a:hover {
        text-decoration: underline;
      }
    }
    .footer {
      @include text-default;
      color: $color-plain-white;
    }
  }
  .content {
    background-color: $color-plain-white;
    grid: content;
    padding: 20px 30px;
  }
}
</style>
