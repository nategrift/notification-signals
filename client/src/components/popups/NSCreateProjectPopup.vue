<template>
  <NSPopupWrapper title="Create Project">
    <div class="container">
      <label for="projectname" class="label">Name:</label>
      <NSTextInput v-model="name" :compressed="true" name="projectname" />
      <div class="buttons">
        <NSButton @click="createHandler">Create</NSButton>
        <NSButton @click="closePopup" variant="neutral">Cancel</NSButton>
      </div>
    </div>
  </NSPopupWrapper>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import NSButton from "@/components/base/inputs/NSButton.vue";
import NSTextInput from "@/components/base/inputs/NSTextInput.vue";
import NSPopupWrapper from "@/components/base/wrappers/NSPopupWrapper.vue";
import ServerApi from "@/lib/ServerApi";
import toastr from "toastr";

class Props {}

@Options({
  components: { NSButton, NSPopupWrapper, NSTextInput },
})
export default class NSCreateProjectPopup extends Vue.with(Props) {
  name = "";

  closePopup() {
    this.$store.dispatch("setPopup", null);
  }

  async createHandler() {
    if (!this.name) {
      return; // add error message
    }
    const response = await ServerApi.postCreateProject({ name: this.name });
    if (response.ok) {
      toastr.success(this.name, "Project Created");
      this.$store.dispatch("setPopup", null);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/vars.scss";
.container {
  display: flex;
  flex-direction: column;
  width: 100%;

  .label {
    text-align: left;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
</style>
