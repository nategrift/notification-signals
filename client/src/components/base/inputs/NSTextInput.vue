<template>
  <div class="input">
    <input
      type="text"
      :name="name"
      :id="name"
      :value="modelValue"
      :autocomplete="autocomplete ? 'on' : 'off'"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('valueChanged', $event.target.value)"
    />
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { ErrorObj } from "@/lib/ApiTypes";
import { Options, Vue } from "vue-class-component";

class Props {
  name!: string;
  modelValue!: string;
  autocomplete?: string;
  errors?: ErrorObj[];
}

@Options({
  emits: ["update:modelValue", "valueChanged"],
})
export default class NSTextInput extends Vue.with(Props) {
  get error(): string | null {
    if (this.errors) {
      let error = this.errors.find((e) => {
        return e.param == this.name;
      });
      if (error) {
        return error.msg;
      }
    }

    return null;
  }
}
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  .error {
    font-size: 10px;
    color: red;
  }
  input {
    width: 100%;
  }
}
</style>
