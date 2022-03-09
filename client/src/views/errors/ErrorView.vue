<template>
  <div class="error">
    <img src="@/assets/Logo_Light.svg" alt="logo" class="logo" />
    <h3>{{ error ? error.errorCode : 404 }}</h3>
    <p>{{ error ? error.error : "Page Not Found" }}</p>
  </div>
</template>

<script lang="ts">
import { NSError } from "@/store";
import { Options, Vue } from "vue-class-component";

class Props {
  error?: NSError;
}

@Options({
  components: {},
})
export default class ErrorView extends Vue.with(Props) {}
</script>

<style lang="scss" scoped>
@import "@/vars.scss";
.error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background-color: $color-plain-white;
}
</style>
