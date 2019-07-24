<template>
	<div class="sidebar"
      :class="{ open: sidebarDisplayed }"
      v-on:click.stop>
		<div class="sidebar__inner">
			<ul class="sidebar__inner__menu">
				<li v-for="category in categories" :key="category.id"
					class="sidebar__inner__menu__item"
					v-on:click.stop="hideSidebar()">
					<h3 :class="{ 'current': currentCategoryId === category.id }">
						<router-link :to="{name: 'ItemsList', params: { url: category.url }}">{{ category.name }}</router-link>
					</h3>
					<ul v-if="category.subcategories.length > 0">
						<li v-for="subcategory in category.subcategories" :key="subcategory.id"
								v-on:click.stop="hideSidebar()">
							<p :class="{ 'current': currentCategoryId === subcategory.id }">
								<router-link :to="{name: 'ItemsList', params: { url: subcategory.url }}">{{ subcategory.name }}</router-link>
							</p>
							<ul v-if="subcategory.subcategories.length > 0">
								<li v-for="subcategory2 in subcategory.subcategories" :key="subcategory2.id"
										v-on:click.stop="hideSidebar()">
									<p :class="{ 'current': currentCategoryId === subcategory2.id }">
										<router-link :to="{name: 'ItemsList', params: { url: subcategory2.url }}">{{ subcategory2.name }}</router-link>
									</p>
								</li>
							</ul>
						</li>
					</ul>
				</li>

				<li class="sidebar__inner__menu__item"
					v-on:click.stop="hideSidebar()">
					<h3 :class="{ 'desktop-header__item--current': $route.path === '/contact'}">
						<router-link :to="{name: 'Contact'}">{{ $t('main.contact') }}</router-link>
					</h3>
				</li>

				<li class="sidebar__inner__menu__item" v-if="$auth.check()"
					v-on:click.stop="hideSidebar()">
					<h3 :class="{ 'desktop-header__item--current': isAdminPage}">
						<router-link :to="{name: 'DisplayItem'}">{{ $t('main.admin') }}</router-link>
					</h3>
				</li>

        <li class="sidebar__inner__menu__item" v-if="$auth.check()"
					v-on:click.stop="hideSidebar()">
					<h3>
						<a href="#" @click.prevent="$auth.logout()">{{ $t('main.logout') }}</a>
					</h3>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    isAdminPage() {
      const urls = ['DisplayItem', 'DisplayCategory', 'EditItem', 'EditCategory', 'CreateItem', 'CreateCategory']
      return urls.indexOf(this.$route.name) >= 0
    },

    currentCategoryId() {
      if (this.currentCategory === undefined || this.$route.path === '/contact'
        || this.isAdminPage) {
        return undefined
      }
      return this.currentCategory.id
    },

    ...mapGetters({
      categories: 'indexedCategories',
      currentCategory: 'currentCategory',
    }),
  },

  props: ['sidebarDisplayed'],

  data() {
    return {
      category: {},
    }
  },

  created() {
    this.$store.dispatch('fetchCategories')
  },

  methods: {
    hideSidebar() {
      this.$emit('hideSidebar')
    },
  },
}
</script>
