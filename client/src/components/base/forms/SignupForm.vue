<template>
  <form @submit.prevent="submit" class="signup-form">
    <label for="username">Username</label>
    <NSTextInput name="username" v-model="username" :errors="errors" />
    <label for="email">Email</label>
    <NSTextInput name="email" v-model="email" :errors="errors" />
    <label for="password">Password</label>
    <NSTextInput
      name="password"
      type="password"
      v-model="password"
      :errors="errors"
    />
    <label for="verifyPassword">Repeat Password</label>
    <NSTextInput
      name="verifyPassword"
      type="password"
      v-model="verifyPassword"
      :errors="errors"
    />

    <NSButton @buttonClicked="submit" type="submit">Signup</NSButton>
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
  email = "nate@gam.ccc";
  password = "haha12345";
  verifyPassword = "haha12345";

  errors: ErrorObj[] | null = null;

  resultsValid(): boolean {
    if (this.password != this.verifyPassword) {
      this.errors = [
        {
          param: "verifyPassword",
          msg: "passwords do not match",
        },
      ];
      return false;
    }

    return true;
  }

  async submit(): Promise<void> {
    this.errors = null;

    if (!this.resultsValid()) {
      return;
    }

    const body = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    const response = await ServerApi.postSignup(body);
    if (response.ok) {
      let successResponse = response.data as AuthSuccessResponse;
      this.$store.dispatch("setUser", successResponse.user);
      this.$store.dispatch("setToken", successResponse.token);
      this.$store.dispatch("setTokenExp", successResponse.expireIn);
      this.$store.dispatch("setLoggedIn", true);

      // navigate to dashboard
      this.$router.push({ name: "home" });
    } else {
      this.errors = response.data as ErrorObj[];
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/vars.scss";
.signup-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  label {
    padding-bottom: 2px;
    text-align: start;
  }

  .input {
    @include text-default;
  }
}
</style>
