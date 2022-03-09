<template>
  <div class="container">
    <div class="form">
      <img src="@/assets/Logo_Light.svg" alt="logo" class="logo" />
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class FullFormFrame extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/vars.scss";

.container {
  width: 100%;
  height: 100vh;
  background-color: $color-plain-white;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    width: 80px;
    padding-bottom: 20px;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 300px;
  }
}
</style>
