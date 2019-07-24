<template>
	<div>
		<h1>{{ $t('main.home_images') }}</h1>
		<router-link class="admin-link" to="/admin">{{ $t('main.items') }}</router-link>
		<router-link class="admin-link" to="/admin_suppliers">{{ $t('main.suppliers') }}</router-link>
		<router-link class="admin-link" to="/admin_categories">{{ $t('main.categories') }}</router-link>

		<el-row type="flex" :gutter="10" justify="end">
			<el-col :span="4" align="right">
				<el-button size="small"
										type="primary"
										@click="dialogFormVisible = true"
										icon="el-icon-circle-plus-outline">
					{{ $t('main.home_add_image') }}
				</el-button>
			</el-col>
		</el-row>

		<el-table
      :data="images"
      style="width: 100%">
      <el-table-column
        v-bind:label="$t('main.image')"
        width="300">
				<template slot-scope="scope">
					<img :src="baseUrl + '/images/home/' + scope.row + '?' + Math.random()" class="img-responsive">
				</template>
      </el-table-column>
			<el-table-column
				align="right">
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="danger"
						@click="dialogVisible = true; removingImage = scope.row">{{$t('main.delete')}}</el-button>
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
				<el-button type="primary" @click="dialogVisible = false; deleteImage()">{{ $t('main.accept') }}</el-button>
			</span>
		</el-dialog>

		<el-dialog v-bind:title="$t('main.image')" :visible.sync="dialogFormVisible">
			<el-form :model="newImageForm">
				<image-picker
						@updateImagePath="updateImagePath"
						:image-path="''"
					/>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">{{ $t('main.cancel') }}</el-button>
				<el-button type="primary" @click="dialogFormVisible = false; createImage()">{{ $t('main.accept') }}</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<style scoped>
	img	{
		max-height: 150px;
	}
</style>
<script>
import HomeService from '@/services/home'
import ImagePicker from '@/components/Utils/ImagePicker'

export default {
  components: {
    ImagePicker,
  },

  data() {
    return {
      images: [],
      dialogVisible: false,
      dialogFormVisible: false,
      newImageForm: {
        path: '',
      },
      removingImage: undefined,
    }
  },

  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
  },

  created() {
    this.fetchImages()
  },

  methods: {
    fetchImages() {
      HomeService.getImages().then((response) => {
        this.images = response.data
      })
    },

    deleteImage() {
      if (this.removingImage !== undefined) {
        HomeService.deleteImage(this.removingImage).then(() => {
          this.images = this.images.filter(element => element !== this.removingImage)
          this.removingImage = undefined
        })
      }
    },

    createImage() {
      HomeService.addImage(this.newImageForm).then((response) => {
        this.images.unshift(response.data)
      })
    },

    updateImagePath(newPath) {
      this.newImageForm.path = newPath
    },
  },
}
</script>
