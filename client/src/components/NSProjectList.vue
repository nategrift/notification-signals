<template>
  <div class="title-con">
    <div class="title">Projects</div>
    <NSButton @click="createProjectHandler()">Create</NSButton>
  </div>
  <NSList :headers="headers" :rows="rows" @valueClicked="handleRowClicked">
    <template v-slot:actions="row">
      <router-link
        :to="{ name: 'edit-project', params: { id: getRowId(row) } }"
        class="link"
        >edit</router-link
      >
    </template>
    <template v-slot:#name="item">
      <div @click="handleRowClicked(item.get('id'))" class="project-name">
        {{ item.get("name") }}
      </div>
    </template>
    <template v-slot:empty>
      <div class="empty-state">
        <div>No Projects</div>
        <div>Get Started by creating a project</div>
        <NSButton>Create New</NSButton>
      </div>
    </template>
  </NSList>
</template>

<script lang="ts">
import { Project } from "@/lib/NotificationSignalTypes";
import ServerApi from "@/lib/ServerApi";
import { Vue, Options } from "vue-class-component";
import NSList, { ListHeaderItem } from "@/components/base/NSList.vue";
import NSButton from "@/components/base/inputs/NSButton.vue";
import moment, { isMoment, Moment } from "moment";
import { Popup } from "@/lib/NSTypes";

class Props {
  projects!: Project[] | null;
}

@Options({
  components: { NSList, NSButton },
})
export default class NSProjectList extends Vue.with(Props) {
  projects: Project[] | null = null;

  async getProjects() {
    const response = await ServerApi.getProjects();
    if (response.ok) {
      let projects = response.data as Project[];
      for (let project of projects) {
        project.created_at = moment(project.created_at);
        project.updated_at = moment(project.updated_at);
        if (project.deleted_at) {
          project.deleted_at = moment(project.deleted_at);
        }
      }
      this.projects = projects;
    }
  }

  getRowId(row: Map<string, string>): string | undefined {
    if (row && row.get("id")) {
      return row.get("id");
    }
    return undefined;
  }

  mounted() {
    this.getProjects();
  }

  handleRowClicked(id: string) {
    this.$router.push({
      name: "project",
      params: { id: id },
    });
  }

  get headers(): ListHeaderItem[] {
    return [
      {
        title: "Name",
        value: "name",
      },
      {
        title: "Last Updated At",
        value: "updated_at",
      },
      {
        title: "Created At",
        value: "created_at",
      },
      {
        title: "Sent Notifications",
        value: "notification_count",
      },
    ];
  }

  get rows(): Array<Map<string, string>> {
    if (this.projects && this.projects.length > 0) {
      return this.projects.map(
        (p) =>
          new Map(
            Object.entries(p).map(([key, value]) => {
              return [key, this.parseValue(value)];
            })
          )
      );
    } else {
      return [];
    }
  }

  parseValue(item: string | number | Moment | null): string {
    if (isMoment(item)) {
      return item.format("YYYY-MM-DD kk:mm");
    }

    if (!item) {
      return "";
    }

    return String(item);
  }

  createProjectHandler() {
    this.$store.dispatch("setPopup", Popup.CreateProject);
  }
}
</script>

<style lang="scss" scoped>
@import "@/vars.scss";
.link {
  @include text-link;
}

.title-con {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  .title {
    @include text-section-title;
    text-align: left;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  button {
    height: 40px;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.project-name {
  font-weight: 600;
  cursor: pointer;
}
</style>
