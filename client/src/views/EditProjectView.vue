<template>
  <NSDashboard>
    <div class="home">Editing Project</div>
    <div>
      Currently, you can only delete a project. Editing will come later! :D
    </div>
    <NSButton @click="deleteProject()" variant="danger">Delete</NSButton>
  </NSDashboard>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NSDashboard from "@/containers/NSDashboard.vue";
import ServerApi from "@/lib/ServerApi";
import { Project } from "@/lib/NotificationSignalTypes";
import moment from "moment";
import toastr from "toastr";
import NSButton from "@/components/base/inputs/NSButton.vue";

@Options({
  components: { NSDashboard, NSButton },
})
export default class EditProjectView extends Vue {
  project: Project | null = null;
  async deleteProject() {
    if (!this.project) return;

    const response = await ServerApi.deleteProject(this.project.id);
    if (response.ok) {
      toastr.success("Successfully Deleted Project");
      this.$router.push({ name: "home" });
    }
  }

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
