<template>
  <NSDashboard>
    <div v-if="project">
      <div class="title">{{ project.name }}</div>
    </div>
  </NSDashboard>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NSDashboard from "@/containers/NSDashboard.vue";
import ServerApi from "@/lib/ServerApi";
import { Project } from "@/lib/NotificationSignalTypes";
import moment from "moment";

@Options({
  components: { NSDashboard },
})
export default class HomeView extends Vue {
  project: Project | null = null;

  async getProject() {
    if (typeof this.$route.params.id != "string") {
      this.$ns.showDefaultError();
      return;
    }
    const response = await ServerApi.getProject(this.$route.params.id);
    if (response.ok) {
      let project = response.data as Project;
      project.created_at = moment(project.created_at);
      project.updated_at = moment(project.updated_at);
      if (project.deleted_at) {
        project.deleted_at = moment(project.deleted_at);
      }
      this.project = project;
    } else {
      this.$ns.showDefaultError();
    }
  }

  async mounted() {
    await this.getProject();
  }
}
</script>
