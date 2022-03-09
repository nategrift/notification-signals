<template>
  <NSDashboard>
    <NSProjectList />
  </NSDashboard>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NSDashboard from "@/containers/NSDashboard.vue";
import NSProjectList from "@/components/NSProjectList.vue";

@Options({
  components: { NSDashboard, NSProjectList },
})
export default class HomeView extends Vue {}
</script>
