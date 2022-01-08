<template>
  <button @click="$emit('click')">Login</button>
</template>

<script>
export default {
  name: "Button",
  emits: ['click'],
  props: {
    modelValue: String,
    name: String
  }
};
</script>

<style scoped lang="scss">
button {
  color: white;
  background-color: #374685;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 10px 14px;
  font-weight: 900;
  cursor: pointer;
}
</style>
