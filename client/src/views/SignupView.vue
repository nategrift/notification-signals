<template>
  <div class="signup-view">
    <SignupForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SignupForm from "@/components/base/forms/SignupForm.vue";

@Options({
  components: { SignupForm },
})
export default class SignupView extends Vue {}
</script>
