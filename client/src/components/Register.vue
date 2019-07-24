<template>
  <div>
    <div class="alert alert-danger" v-if="error && !success">
      <p>{{ $t('main.register_error') }}</p>
    </div>
    <div class="alert alert-success" v-if="success">
      <p>{{ $t('main.register_success') }} <router-link :to="{name:'Login'}">{{ $t('main.login') }}</router-link></p>
    </div>

    <el-form label-position="top" label-width="100px">
      <el-form-item v-bind:label='$t("main.name")' v-bind:class="{ 'has-error': error && errors.name }">
        <el-input type="text" v-model="name" required></el-input>
        <span class="help-block" v-if="error && errors.name">{{ errors.name }}</span>
      </el-form-item>
      <el-form-item v-bind:label='$t("main.email")' v-bind:class="{ 'has-error': error && errors.email }">
        <el-input type="email" v-model="email" required></el-input>
        <span class="help-block" v-if="error && errors.email">{{ errors.email }}</span>
      </el-form-item>
      <el-form-item v-bind:label='$t("main.password")' v-bind:class="{ 'has-error': error && errors.password }">
        <el-input type="password" v-model="password"></el-input>
        <span class="help-block" v-if="error && errors.password">{{ errors.password }}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">{{ $t("main.register") }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: false,
      errors: {},
      success: false,
    }
  },

  methods: {
    register() {
      const app = this
      this.$auth.register({
        params: {
          name: app.name,
          email: app.email,
          password: app.password,
        },
        success() {
          app.success = true
        },
        error(resp) {
          app.error = true
          app.errors = resp.response.data.errors || {}
          setTimeout(() => {
            this.error = false
          }, 5000)
        },
        redirect: null,
      })
    },
  },
}
</script>
