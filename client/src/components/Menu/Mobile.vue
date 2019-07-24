<template>
	<div class="mobile-header">
		<div class="menu-button" v-on:click.stop="showMenu()">
			<div class="menu-button__line"/>
			<div class="menu-button__line"/>
			<div class="menu-button__line"/>
		</div>
		<div class="menu-logo" v-on:click="goHome"/>
	</div>
</template>
<script>
export default {
  methods: {
    showMenu() {
      this.$emit('showSidebar')
    },

    goHome() {
      this.$router.push({ name: 'MainPage' })
    },
  },
}
</script>
