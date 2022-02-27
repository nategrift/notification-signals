<template>
  <div class="about">
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LoginForm from "@/components/base/forms/LoginForm.vue";

@Options({
  components: { LoginForm },
})
export default class LoginView extends Vue {}
</script>
