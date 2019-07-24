<template>
	<div>
		<h1>{{ title }}</h1>

		<el-form label-position="top" :model="category">
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="9">
					<el-form-item v-bind:label="$t('main.name')">
            <el-input v-model="category.name"></el-input>
          </el-form-item>
        </el-col>
			</el-row>
			<el-row>
				<el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="9">
					<el-form-item v-bind:label="$t('main.parent_category')">
						<el-select size="large" v-model="category.parent_category" v-bind:placeholder="$t('main.select_category')">
							<el-option v-for="option in notCurrentCategories"
												:key="option.id"
												:value="option.id"
												v-bind:label="(option.parent_category ? option.parent_category + ' - ' : '') + option.name">
							</el-option>
						</el-select>
          </el-form-item>
				</el-col>
			</el-row>
			<el-form-item size="large">
				<el-button v-bind:disabled="isDisabled" type="primary" @click="updateCategory(category)">{{ updateText }}</el-button>
				<el-button @click="cancel">{{ $t('main.cancel') }}</el-button>
			</el-form-item>
    </el-form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CategoryService from '@/services/categories'

export default {
  computed: {
    isDisabled() {
      return !this.category.name
    },

    title() {
      return this.$route.params.id !== undefined
        ? this.$t('main.update_category')
        : this.$t('main.create_category')
    },

    notCurrentCategories() {
      return this.categories.filter(cat => cat.id !== this.category.id)
    },

    updateText() {
      return this.$route.params.id !== undefined
        ? this.$t('main.update')
        : this.$t('main.create_category')
    },

    ...mapGetters({
      categories: 'allCategories',
    }),
  },

  data() {
    return {
      category: {},
    }
  },

  created() {
    this.getCategory()
  },

  methods: {
    cancel() {
      this.$router.push({ name: 'DisplayCategory' })
    },

    getCategory() {
      CategoryService.getCategory(this.$route.params.id).then((response) => {
        this.category = response.data
      })
    },

    updateCategory() {
      if (this.$route.params.id !== undefined) {
        CategoryService.updateCategory(this.category).then(() => {
          this.$router.push({ name: 'DisplayCategory' })
        })
      } else {
        this.createCategory(this.category)
      }
    },

    ...mapActions([
      'createCategory',
    ]),
  },
}
</script>
