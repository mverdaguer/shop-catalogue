<template>
	<div>
		<h1>{{ $t('main.items') }}</h1>
		<router-link class="admin-link" to="/admin_categories">{{ $t('main.categories') }}</router-link>
		<router-link class="admin-link" to="/admin_suppliers">{{ $t('main.suppliers') }}</router-link>
		<router-link class="admin-link" to="/admin_home_images">{{ $t('main.home_images') }}</router-link>

		<el-row type="flex" :gutter="10" justify="end">
      <el-col :span="4">
        <el-input
          size="small"
          v-bind:placeholder="$t('main.search')"
          prefix-icon="el-icon-search"
          v-model="searchText">
        </el-input>
      </el-col>
      <el-col :span="5">
				<el-select size="small" v-model="displayedSupplier" v-bind:placeholder="$t('main.select_supplier')">
					<el-option key="all"
										value="all"
										v-bind:label="$t('main.all')">
					</el-option>
					<el-option v-for="option in suppliers"
										:key="option.id"
										:value="option.id"
										v-bind:label="option.name">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="5">
				<el-select size="small" v-model="displayedCategory" v-bind:placeholder="$t('main.select_category')">
					<el-option key="all"
										value="all"
										v-bind:label="$t('main.all')">
					</el-option>
					<el-option v-for="option in categories"
										:key="option.id"
										:value="option.id"
										v-bind:label="(option.parent_category ? option.parent_category + ' - ' : '') + option.name">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-button size="small"
										type="primary"
										v-on:click="createItem"
										icon="el-icon-circle-plus-outline">
					{{ $t('main.create_item') }}
				</el-button>
			</el-col>
		</el-row>

		<el-table
      :data="filteredItems"
      style="width: 100%">
      <el-table-column
        prop="name"
        v-bind:label="$t('main.name')"
        width="180">
      </el-table-column>
      <el-table-column
        v-bind:label="$t('main.image')"
        width="300">
				<template slot-scope="scope">
          <div v-if="scope.row.image" :title="scope.row.name" class="item-image" v-lazy:background-image="baseUrl + '/images/' + scope.row.id + scope.row.image + '?' + Math.random()"></div>
				</template>
      </el-table-column>
      <el-table-column
				prop="supplier.name"
        v-bind:label="$t('main.supplier')"
				width="180">
      </el-table-column>
      <el-table-column
				prop="category.name"
        v-bind:label="$t('main.category')"
				width="180">
      </el-table-column>
			<el-table-column
				align="right">
				<template slot-scope="scope">
					<el-button
						size="mini"
						@click="handleEdit(scope.row.id)">{{$t('main.edit')}}</el-button>
					<el-button
						size="mini"
						type="danger"
						@click="dialogVisible = true; removingItemId = scope.row.id">{{$t('main.delete')}}</el-button>
				</template>
			</el-table-column>
    </el-table>

		<el-dialog
			v-bind:title="$t('main.warning')"
			:visible.sync="dialogVisible"
			width="30%"
			>
			<span>{{ $t('main.delete_message') }}</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">{{ $t('main.cancel') }}</el-button>
				<el-button type="primary" @click="dialogVisible = false; deleteItem()">{{ $t('main.accept') }}</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<style scoped>
	.item-image	{
    height: 150px;

    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
	}
</style>
<script>
import { mapGetters } from 'vuex'
import ItemService from '@/services/items'

export default {
  data() {
    return {
      items: [],
      displayedCategory: 'all',
      displayedSupplier: 'all',
      dialogVisible: false,
      removingItemId: undefined,
      searchText: '',
    }
  },

  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL_IMAGES
    },

    filteredItems() {
      const validCategories = []
      const displayedCategoryData = this.findCategory(this.displayedCategory, this.indexedCategories)
      if (displayedCategoryData) {
        this.getValidCategories(validCategories, displayedCategoryData)
      }

      return this.items.filter(item => this.displayedCategory === 'all' || (item.category !== null && validCategories.includes(item.category.id)))
        .filter(item => this.displayedSupplier === 'all' || (item.supplier !== null && item.supplier.id === this.displayedSupplier))
        .filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()))
    },

    ...mapGetters({
      categories: 'allCategories',
      indexedCategories: 'indexedCategories',
      suppliers: 'allSuppliers',
    }),
  },

  created() {
    this.$store.dispatch('fetchCategories')
    if (this.suppliers && this.suppliers.length > 0) {
      this.displayedSupplier = this.suppliers[0].id
    }

    if (this.categories && this.categories.length > 0) {
      this.displayedCategory = this.categories[0].id
    }

    this.fetchItems()
  },

  methods: {
    fetchItems() {
      ItemService.getItems().then((response) => {
        this.items = response.data
      })
    },

    deleteItem() {
      if (this.removingItemId !== undefined) {
        ItemService.deleteItem(this.removingItemId).then(() => {
          this.items = this.items.filter(element => element.id !== this.removingItemId)
          this.removingItemId = undefined
        })
      }
    },

    findCategory(categoryToFind, categories) {
      /* eslint-disable-next-line no-restricted-syntax */
      for (const category of categories) {
        if (category.id === categoryToFind) {
          return category
        } if (category.subcategories) {
          const cat = this.findCategory(categoryToFind, category.subcategories)
          if (cat) {
            return cat
          }
        }
      }
      return undefined
    },

    getValidCategories(result, category) {
      result.push(category.id)

      if (category.subcategories) {
        category.subcategories.forEach((subcategory) => {
          this.getValidCategories(result, subcategory)
        })
      }
    },

    handleEdit(id) {
      this.$router.push({ name: 'EditItem', params: { id, category: this.displayedCategory } })
    },

    createItem() {
      this.$router.push({ name: 'EditItem', params: { category: this.displayedCategory } })
    },
  },
}
</script>
