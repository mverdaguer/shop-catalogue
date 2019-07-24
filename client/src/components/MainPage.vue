<template>
	<div class="main-page">
		<h1>{{ $t('main.brand_name') }}</h1>

		<div class="main-page__container">
			<el-carousel indicator-position="none"  :interval="500000" :autoplay="false">
				<el-carousel-item v-for="item in images" :key="item">
					<span class="image-helper"></span>
					<img v-bind:src="baseUrl + '/images/home/' + item" class="img-responsive"/>
				</el-carousel-item>
			</el-carousel>
			<div class="main-page__container__info">
				<p>{{ $t('main.main1') }}</p>
				<p>{{ $t('main.main2') }}</p>
				<p>{{ $t('main.main3') }}</p>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import HomeService from '@/services/home'

export default {
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_BASE_URL
    },
    ...mapGetters({
      categories: 'allCategories',
    }),
  },

  data() {
    return {
      category: {},
      images: [],
    }
  },

  created() {
    this.setCurrentCategory(undefined)
    this.fetchImages()

    setTimeout(() => {
      this.$forceUpdate()
    })
  },

  methods: {
    fetchImages() {
      HomeService.getImages().then((response) => {
        this.images = response.data
      })
    },

    ...mapActions(['setCurrentCategory']),
  },
}
</script>
