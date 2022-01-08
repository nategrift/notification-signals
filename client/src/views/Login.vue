<template>
  <div>
    <h1>Login</h1>
    <form class="form" @submit.prevent="submit">
      <TextField v-model="username" placeholder="Username" name="username"/>
      <TextField v-model="password" placeholder="Password" name="password" type="password"/>
      <Button/>
    </form>
  </div>
</template>

<script>
import TextField from "@/components/TextField.vue";
import Button from "@/components/Button.vue";

export default {
  name: "Login",
  components: {
    TextField,
    Button
  },
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    submit() {
      console.log(this.username, this.password)
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 375px;
  margin: 0 auto;

  & > * {
    margin-bottom: 10px;
  }
}
</style>
