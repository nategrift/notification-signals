<template>
  <div>
    <FullFormFrame>
      <div class="title">Login</div>
      <LoginForm />
      <div class="footer"><a @click="signupPage">Create Account</a></div>
    </FullFormFrame>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginForm from "@/components/base/forms/LoginForm.vue";
import FullFormFrame from "@/components/base/wrappers/FullFormFrame.vue";

@Options({
  components: { FullFormFrame, LoginForm },
})
export default class LoginView extends Vue {
  signupPage() {
    this.$router.push({ name: "signup" });
  }
}
</script>

<style lang="scss" scoped>
@import "@/vars.scss";
.title {
  @include text-section-title;
}

.footer {
  @include text-fine-print;

  a {
    color: $color-ns-light;
  }
}
</style>
