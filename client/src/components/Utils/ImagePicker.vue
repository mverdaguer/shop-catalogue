<template>
	<el-form-item v-bind:label="$t('main.image')">
		<el-row type="flex" justify="space-between">
			<el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
					<input type="file" v-on:change="onFileChange" class="form-control">
			</el-col>
			<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
				<img v-if="image" :src="image" class="img-responsive">
			</el-col>
		</el-row>
	</el-form-item>
</template>
<style scoped>
	img {
		max-height: 150px;
	}
</style>
<script>
export default {
  props: ['imagePath'],

  data() {
    return {
      image: '',
    }
  },

  watch: {
    imagePath(newImagePath) {
      this.image = newImagePath
    },
  },

  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },

    createImage(file) {
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.image = e.target.result
        this.$emit('updateImagePath', vm.image)
      }
      reader.readAsDataURL(file)
    },
  },
}
</script>
