<template>
  <div class="list-container">
    <div class="header">
      <div v-for="header in headers" :key="header.value">
        {{ header.title }}
      </div>
      <div :style="{ flex: 1 }" v-if="$slots['actions']()"></div>
    </div>
    <div class="list">
      <div class="item" v-for="item in rows" :key="item.get('id')">
        <div class="values" v-for="key in headers" :key="key.value">
          <slot :name="`#${key.value}`" v-bind="item">
            <div>{{ item.get(key.value) }}</div>
          </slot>
        </div>
        <div
          :style="{ flex: 1 }"
          class="values actions"
          v-if="$slots['actions']()"
        >
          <slot name="actions" v-bind="item"></slot>
        </div>
      </div>
    </div>
    <div v-if="!rows || rows.length <= 0" class="empty-state">
      <slot name="empty"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export type ListHeaderItem = {
  title: string;
  value: string;
};

class Props {
  headers!: ListHeaderItem[];
  rows!: Array<Map<string, string>>;
}

export default class NSList extends Vue.with(Props) {}
</script>

<style lang="scss" scoped>
@import "@/vars.scss";
.list-container {
  display: flex;
  flex-direction: column;
  text-align: left;
  border-radius: 10px;
  height: 400px;
  @include shadow;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    text-transform: uppercase;
    background-color: $color-lighter-grey;
    padding: 0 40px;
    border-bottom: solid 1px $color-light-grey;
    & > div {
      flex: 2;
    }
  }
  .list {
    overflow-y: auto;
    .item {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      height: 40px;
      padding: 0 40px;

      & > div {
        flex: 2;
      }

      &:nth-child(even) {
        background-color: $color-lighter-grey;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .empty-state {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
