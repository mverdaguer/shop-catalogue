<template>
	<div>
		<h1>{{ title }}</h1>

		<el-form label-position="top" :model="item">
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="9">
					<el-form-item v-bind:label="$t('main.name')">
            <el-input v-model="item.name"></el-input>
          </el-form-item>
        </el-col>
			</el-row>
			<el-row>
				<el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="9">
					<image-picker
						@updateImagePath="updateImagePath"
						:image-path="imagePath"
					/>
				</el-col>
			</el-row>
			<el-row>
				<el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="9">
					<el-form-item v-bind:label="$t('main.category')">
						<el-select size="large" v-model="item.category" v-bind:placeholder="$t('main.select_category')">
							<el-option v-for="option in categories"
												:key="option.id"
												:value="option.id"
												v-bind:label="(option.parent_category ? option.parent_category + ' - ' : '') + option.name">
							</el-option>
						</el-select>
          </el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="9">
					<el-form-item v-bind:label="$t('main.supplier')">
						<el-select size="large" v-model="item.supplier" v-bind:placeholder="$t('main.select_supplier')">
							<el-option v-for="option in suppliers"
												:key="option.id"
												:value="option.id"
												v-bind:label="option.name">
							</el-option>
						</el-select>
          </el-form-item>
				</el-col>
			</el-row>
			<el-form-item size="large">
				<el-button v-bind:disabled="isDisabled" type="primary" @click="updateItem">{{ updateText }}</el-button>
				<el-button @click="cancel">{{ $t('main.cancel') }}</el-button>
			</el-form-item>
    </el-form>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import ItemService from '@/services/items'
import ImagePicker from '@/components/Utils/ImagePicker'

export default {
  components: {
    ImagePicker,
  },

  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL_IMAGES
    },

    imagePath() {
      const { image } = this.item
      if (image.length > 0 && image[0] === '.') {
        return `${this.baseUrl}/images/${this.item.id}${image}?${Math.random()}`
      } if (image.length > 0) {
        return image
      }
      return ''
    },

    isDisabled() {
      return !this.item.name || !this.item.category || !this.item.image
    },

    title() {
      return this.$route.params.id !== undefined
        ? this.$t('main.update_item')
        : this.$t('main.create_item')
    },

    updateText() {
      return this.$route.params.id !== undefined
        ? this.$t('main.update')
        : this.$t('main.create_item')
    },

    ...mapGetters({
      categories: 'allCategories',
      suppliers: 'allSuppliers',
    }),
  },

  data() {
    return {
      item: {
        image: '',
      },
    }
  },

  created() {
    if (this.$route.params.id !== undefined) {
      this.getItem()
    } else if (this.$route.params.category !== 'all') {
      this.item.category = this.$route.params.category
    }
  },

  methods: {
    getItem() {
      ItemService.getItem(this.$route.params.id).then((response) => {
        this.item = response.data
      })
    },

    cancel() {
      this.$router.push({ name: 'DisplayItem' })
    },

    updateItem() {
      if (this.$route.params.id !== undefined) {
        ItemService.updateItem(this.item).then(() => {
          this.$router.push({ name: 'DisplayItem' })
        })
      } else {
        ItemService.addItem(this.item).then(() => {
          this.$router.push({ name: 'DisplayItem' })
        })
      }
    },

    updateImagePath(newPath) {
      this.item.image = newPath
    },
  },
}
</script>
