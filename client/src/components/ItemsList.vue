<template>
	<div class="items-list-page">
		<h1 class="title">{{category.name}}</h1>

		<div class="item-list">
				<div class="item-list__item"
					v-for="item in filteredItems" :key="item.id">
          <div class="item-list__item__title">{{item.name}}</div>
          <div :title="item.name" class="item-list__item__image" v-lazy:background-image="baseUrl + '/images/' + item.id + item.image"></div>
				</div>
		</div>

    <div v-for="subCategory in category.subcategories" :key="subCategory.id">
      <h2 class="title">{{subCategory.name}}</h2>

      <div class="item-list">
          <div class="item-list__item"
            v-for="item2 in filteredItems2(subCategory.id)" :key="item2.id">
            <div class="item-list__item__title">{{item2.name}}</div>
            <div :title="item2.name" class="item-list__item__image" v-lazy:background-image="baseUrl + '/images/' + item2.id + item2.image"></div>
          </div>
      </div>

      <div v-for="subCategory2 in subCategory.subcategories" :key="subCategory2.id">
        <h3 class="title">{{subCategory2.name}}</h3>

        <div class="item-list">
            <div class="item-list__item"
              v-for="item3 in filteredItems2(subCategory2.id)" :key="item3.id">
              <div class="item-list__item__title">{{item3.name}}</div>
              <div :title="item3.name" class="item-list__item__image" v-lazy:background-image="baseUrl + '/images/' + item3.id + item3.image"></div>
            </div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ItemService from '@/services/items'

export default {
  data() {
    return {
      items: [],
      category: {},
    }
  },

  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL_IMAGES
    },
    filteredItems() {
      if (!this.items || this.category.id === undefined) {
        return this.items
      }
      return this.items.filter(item => item.category.id === this.category.id)
    },

    ...mapGetters({
      indexedCategories: 'indexedCategories',
    }),
  },

  watch: {
    /* eslint-disable-next-line func-names */
    '$route.params.url': function (url) {
      this.getCategory(url)
    },

    categories() {
      this.getCategory(this.$route.params.url)
    },
  },

  created() {
    this.getCategory(this.$route.params.url)
  },

  methods: {
    getCategory(url) {
      const oldCat = this.category
      this.category = this.findCategory(this.indexedCategories, url)

      if (oldCat && this.category && oldCat.id === this.category.id) {
        return
      }

      if (this.category === undefined) {
        this.category = {}
      }

      this.setCurrentCategory(this.category)

      ItemService.getItems().then((response) => {
        this.items = response.data
      })
    },

    filteredItems2(categoryId) {
      if (!this.items || categoryId === undefined) {
        return this.items
      }
      return this.items.filter(item => item.category.id === categoryId)
    },

    findCategory(categories, url) {
      for (let i = 0; i < categories.length; i += 1) {
        let cat = categories[i]
        if (cat.url === url) {
          return cat
        }

        if (cat.subcategories && cat.subcategories.length > 0) {
          cat = this.findCategory(cat.subcategories, url)
          if (cat !== undefined) {
            return cat
          }
        }
      }
      return undefined
    },

    ...mapActions([
      'setCurrentCategory',
    ]),
  },
}
</script>
