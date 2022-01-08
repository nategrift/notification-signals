<template>
  <input
    :type="type"
    :name="name"
    :id="name"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script>
export default {
  name: "TextField",
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
    }
  }
};
</script>

<style scoped lang="scss">
input {
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: white;
}
</style>
