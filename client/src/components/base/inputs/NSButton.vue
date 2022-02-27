<template>
  <button @click="$emit('buttonClicked')">{{ title }}</button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

class Props {
  title!: string;
}

@Options({
  emits: ["buttonClicked"],
})
export default class NSButton extends Vue.with(Props) {}
</script>
