<template>
  <form @submit.prevent="submit">
    <label for="username">Username</label>
    <NSTextInput name="username" v-model="username" :errors="errors" />
    <label for="password">Password</label>
    <NSTextInput
      name="password"
      type="password"
      v-model="password"
      :errors="errors"
    />

    <NSButton @buttonClicked="submit" type="submit">Login</NSButton>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NSTextInput from "@/components/base/inputs/NSTextInput.vue";
import NSButton from "@/components/base/inputs/NSButton.vue";
import ServerApi from "@/lib/ServerApi";
import { ErrorObj, AuthSuccessResponse } from "@/lib/ApiTypes";

@Options({
  components: { NSTextInput, NSButton },
})
export default class SignupForm extends Vue {
  username = "nateowl";
  password = "haha12345";

  errors: ErrorObj[] | null = null;

  async submit(): Promise<void> {
    this.errors = null;

    const body = {
      username: this.username,
      password: this.password,
    };

    const response = await ServerApi.postLogin(body);
    if (response.ok) {
      let successResponse = response.data as AuthSuccessResponse;
      this.$store.dispatch("setUser", successResponse.user);
      this.$store.dispatch("setToken", successResponse.token);
      this.$store.dispatch("setTokenExp", successResponse.expireIn);
      this.$store.dispatch("setLoggedIn", true);

      // navigate to dashboard
      if (this.$route.query.target) {
        this.$router.push({ path: this.$route.query.target as string });
      } else {
        this.$router.push({ name: "home" });
      }
    } else {
      this.errors = response.data as ErrorObj[];
    }
  }
}
</script>
