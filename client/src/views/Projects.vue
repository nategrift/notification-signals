<template>
  <div>
    <h3>Projects</h3>
    <ProjectsList />
  </div>
</template>

<script>
import ProjectsList from '@/components/ProjectsList.vue'

export default {
  name: 'Projects',
  components: {
    ProjectsList
  }
}
</script>
