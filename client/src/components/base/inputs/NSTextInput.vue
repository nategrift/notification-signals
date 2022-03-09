<template>
  <div class="input" :class="{ 'error-input': error, compressed }">
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
  compressed?: boolean;
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
@import "@/vars.scss";
.input {
  width: 100%;
  padding-bottom: 18px;
  .error {
    font-size: 10px;
    color: red;
    text-align: left;
  }
  input {
    width: 100%;
    box-sizing: border-box;
    border: solid 1px $color-dark-grey;
    border-radius: 7px;
    padding: 8px 12px;
    @include text-default;
    font-size: 14px;
    outline: none;

    &:focus {
      border: solid 1px $color-ns-light;
    }
  }
}
.error-input {
  padding-bottom: 4px;
}

.compressed {
  input {
    padding: 4px 6px;
  }
}
</style>
