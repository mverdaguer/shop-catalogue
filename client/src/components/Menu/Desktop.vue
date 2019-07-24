<template>
	<div class="desktop-header" @mouseover="mouseOut()">
    <div class="desktop-header__logo" v-bind:style="headerLogo" v-on:click="goHome"></div>
		<div v-for="category in categories" :key="category.id"
				@mouseover.stop="mouseOver(category)"
        class="desktop-header__item"
				:class="{ 'desktop-header__item--current': currentCategoryRootId === category.id }">
			<router-link :to="{name: 'ItemsList', params: { url: category.url }}">{{ category.name }}</router-link>
			<span class="arrow" v-if="category.subcategories.length > 0"></span>
			<ul v-if="category.subcategories.length > 0"
					v-show="category.id == mouseOverCategory"
					@mouseout="mouseOut()">
				<li v-for="subcategory in category.subcategories" :key="subcategory.id"
						:class="{ 'current': currentCategoryId === subcategory.id }">
					<router-link :to="{name: 'ItemsList', params: { url: subcategory.url }}">
						{{ subcategory.name }}
					</router-link>
					<ul v-if="subcategory.subcategories.length > 0">
								<li v-for="subcategory2 in subcategory.subcategories" :key="subcategory2.id"
										:class="{ 'current': currentCategoryId === subcategory2.id }">
									<router-link :to="{name: 'ItemsList', params: { url: subcategory2.url }}">
										{{ subcategory2.name }}
									</router-link>
								</li>
							</ul>
				</li>
			</ul>
		</div>

		<div class="desktop-header__item"
				:class="{ 'desktop-header__item--current': $route.path === '/contact' }">
			<router-link :to="{name: 'Contact'}">{{ $t('main.contact') }}</router-link>
		</div>

		<div class="desktop-header__item" v-if="$auth.check()"
				:class="{ 'desktop-header__item--current': isAdminPage }">
			<router-link :to="{name: 'DisplayItem'}">{{ $t('main.admin') }}</router-link>
		</div>

    <div class="desktop-header__item" v-if="$auth.check()">
      <a href="#" @click.prevent="$auth.logout()">{{ $t('main.logout') }}</a>
		</div>
	</div>
</template>
<style scoped>
</style>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    isAdminPage() {
      const urls = ['DisplayItem', 'DisplayCategory', 'EditItem', 'EditCategory', 'CreateItem', 'CreateCategory']
      return urls.indexOf(this.$route.name) >= 0
    },

    currentCategoryRootId() {
      if (this.currentCategoryRoot === undefined || this.$route.path === '/contact'
        || this.isAdminPage) {
        return undefined
      }
      return this.currentCategoryRoot.id
    },

    currentCategoryId() {
      if (this.currentCategory !== undefined) {
        return this.currentCategory.id
      }
      return undefined
    },
    ...mapGetters({
      categories: 'indexedCategories',
      currentCategory: 'currentCategory',
      currentCategoryRoot: 'currentCategoryRoot',
    }),
  },

  data() {
    return {
      mouseOverCategory: undefined,
      headerLogo: {
        backgroundImage: `url("${process.env.VUE_APP_API_BASE_URL_IMAGES}/images/assets/header.jpg")`,
      },
    }
  },

  created() {
    this.$store.dispatch('fetchCategories')
  },

  methods: {
    mouseOver(category) {
      this.mouseOverCategory = category.id
    },

    mouseOut() {
      this.mouseOverCategory = undefined
    },

    goHome() {
      this.setCurrentCategory(undefined)
      this.$router.push({ name: 'MainPage' })
    },
    
    ...mapActions([
      'setCurrentCategory',
    ])
  },
}
</script>
