<template>
  <div class="container">
    <div class="popup">
      <div class="header">
        <div class="title">{{ title }}</div>
        <div class="close" @click="$store.dispatch('setPopup', null)">
          <img src="@/assets/icons/Icon_Close.svg" alt="X" />
        </div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
class Props {
  title?: string;
}

export default class NSPopupWrapper extends Vue.with(Props) {}
</script>

<style lang="scss" scoped>
@import "@/vars.scss";

.container {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: $color-transparent-dark;
  display: flex;
  justify-content: center;
  align-items: center;

  .popup {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-width: 300px;
    min-height: 200px;
    background-color: $color-plain-white;
    border-radius: 5px;
    padding: 20px 30px;
    box-sizing: border-box;

    .header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;

      .title {
        @include text-section-title;
        line-height: 32px;
      }

      .close {
        width: 20px;
        height: 20px;
        transition: background-color 0.2s;
        padding: 6px;
        border-radius: 5px;
        &:hover {
          background-color: $color-lighter-grey;
        }

        & > img {
          width: 20px;
        }
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
