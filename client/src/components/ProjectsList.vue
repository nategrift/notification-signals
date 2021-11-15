<template>
  <div>

  </div>
</template>

<script>

export default {
  name: 'ProjectList',
  data () {
    return {
      items: [
        {
          id: 13,
          name: 'the first',
          locked: 0,
          created_by_id: 21,
          updated_at: '2021-11-13T21:50:22.000Z',
          created_at: '2021-11-13T21:50:22.000Z',
          deleted_at: null
        },
        {
          id: 14,
          name: 'Second',
          locked: 0,
          created_by_id: 21,
          updated_at: '2021-11-13T21:50:22.000Z',
          created_at: '2021-11-13T21:50:22.000Z',
          deleted_at: null
        }],
      isLoading: true,
      columns: [
        {
          field: 'id',
          label: 'ID'
        },
        {
          field: 'name',
          label: 'Name'
        },
        {
          field: 'locked',
          label: 'Locked'
        },
        {
          field: 'created_at',
          label: 'Created Date',
          position: 'centered'
        }
      ]
    }
  },
  methods: {
    async getProjects () {
      const response = await this.$http.get('http://localhost:5001/api/projects', {
        headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hdGVncmlmdCIsImlkIjoyMSwiaWF0IjoxNjM2ODM4MjM5LCJleHAiOjE2Mzc0NDMwMzl9.sjhJUewrp22UGsqooCXVSGNw8Yzrra0ZzFIEqE4MEp8' }
      })
      this.items = response.data.projects
      this.isLoading = false
    }
  }
}
</script>
