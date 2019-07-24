<template>
	<div class="main" v-on:click="hideSidebar()">
		<desktop-header />
		<mobile-header v-on:showSidebar="showSidebar()"/>
		<sidebar :sidebar-displayed="sidebarDisplayed"
              v-on:hideSidebar="hideSidebar"
		/>
		<div class="main__page">
			<transition name="fade">
				<router-view keep-alive></router-view>
			</transition>
		</div>
	</div>
</template>

<style lang="scss">
   @import 'styles/app.scss'
</style>
<style>
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
		opacity: 0
	}
</style>

<script>
import Desktop from './components/Menu/Desktop.vue'
import Mobile from './components/Menu/Mobile.vue'
import Sidebar from './components/Menu/Sidebar.vue'

export default {
  components: {
    'desktop-header': Desktop,
    'mobile-header': Mobile,
    sidebar: Sidebar,
  },

  data() {
    return {
      sidebarDisplayed: false,
    }
  },

  created() {
    this.$store.dispatch('fetchCategories')
    document.title =  this.$t('main.brand_name')
  },

  methods: {
    showSidebar() {
      this.sidebarDisplayed = !this.sidebarDisplayed
    },

    hideSidebar() {
      this.sidebarDisplayed = false
    },
  },
}
</script>
