<template>
  <div>
    <FullFormFrame>
      <div class="title">Signup</div>
      <SignupForm />
      <div class="footer">Have an Account?<a @click="loginPage">Login</a></div>
    </FullFormFrame>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SignupForm from "@/components/base/forms/SignupForm.vue";
import FullFormFrame from "@/components/base/wrappers/FullFormFrame.vue";

@Options({
  components: { FullFormFrame, SignupForm },
})
export default class SignupView extends Vue {
  loginPage() {
    this.$router.push({ name: "login" });
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
