<template>
  <div class="home">HOME</div>
  <button @click="getProjects">Get Projects</button>
  {{ projects }}
</template>

<script lang="ts">
import { Project } from "@/lib/NotificationSignalTypes";
import ServerApi from "@/lib/ServerApi";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class HomeView extends Vue {
  projects: Project[] | null = null;

  async getProjects() {
    const response = await ServerApi.getProjects();
    if (response.ok) {
      let projects = response.data as Project[];
      this.projects = projects;
    }
  }
}
</script>
