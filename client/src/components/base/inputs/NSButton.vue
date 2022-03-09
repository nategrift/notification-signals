<template>
  <button
    class="button"
    :class="{
      danger: variant == 'danger',
      warning: variant == 'warning',
      neutral: variant == 'neutral',
    }"
    :type="type"
    @click="$emit('buttonClicked')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

class Props {
  variant?: string;
  type?: string;
}

@Options({
  emits: ["buttonClicked"],
})
export default class NSButton extends Vue.with(Props) {}
</script>

<style lang="scss" scoped>
@import "@/vars.scss";

.button {
  @include text-default;
  font-size: 14px;
  outline: none;
  border: none;
  background-color: $color-ns-light;
  padding: 8px 14px;
  border-radius: 4px;
  transition: background-color 0.1s;
  cursor: pointer;
  color: $color-plain-white;
  &:hover {
    background-color: $color-ns-dark;
  }
}

.danger {
  background-color: $color-danger-light;
  &:hover {
    background-color: $color-danger-dark;
  }
}

.warning {
  background-color: $color-warning-light;
  &:hover {
    background-color: $color-warning-dark;
  }
}

.neutral {
  background-color: $color-medium-grey;
  &:hover {
    background-color: $color-mediumer-grey;
  }
}
</style>
