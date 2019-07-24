<template>
  <div class="login-page">
    <div class="alert alert-danger" v-if="error">
      <p>{{ $t("main.login_error") }}</p>
    </div>
    <el-form label-position="top" label-width="100px">
      <el-form-item v-bind:label='$t("main.email")'>
        <el-input type="email" v-model="email" required></el-input>
      </el-form-item>
      <el-form-item v-bind:label='$t("main.password")'>
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">{{ $t("main.login") }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      error: false,
    }
  },

  methods: {
    login() {
      const app = this
      this.$auth.login({
        data: {
          email: app.email,
          password: app.password,
        },
        success() {},
        error() {
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 5000)
        },
        rememberMe: true,
        redirect: '/admin',
        fetchUser: true,
      })
    },
  },
}
</script>
