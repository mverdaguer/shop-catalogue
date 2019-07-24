<template>
	<div>
		<h1>{{ title }}</h1>

		<el-form label-position="top" :model="supplier">
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="9">
					<el-form-item v-bind:label="$t('main.name')">
            <el-input v-model="supplier.name"></el-input>
          </el-form-item>
        </el-col>
			</el-row>
			<el-form-item size="large">
				<el-button v-bind:disabled="isDisabled" type="primary" @click="updateSupplier(supplier)">{{ updateText }}</el-button>
				<el-button @click="cancel">{{ $t('main.cancel') }}</el-button>
			</el-form-item>
    </el-form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SupplierService from '@/services/suppliers'

export default {
  computed: {
    isDisabled() {
      return !this.supplier.name
    },

    title() {
      return this.$route.params.id !== undefined
        ? this.$t('main.update_supplier')
        : this.$t('main.create_supplier')
    },

    updateText() {
      return this.$route.params.id !== undefined
        ? this.$t('main.update')
        : this.$t('main.create_supplier')
    },

    ...mapGetters({
      suppliers: 'allSuppliers',
    }),
  },

  data() {
    return {
      supplier: {},
    }
  },

  created() {
    this.getSupplier()
  },

  methods: {
    cancel() {
      this.$router.push({ name: 'DisplaySupplier' })
    },

    getSupplier() {
      SupplierService.getSupplier(this.$route.params.id).then((response) => {
        this.supplier = response.data
      })
    },

    updateSupplier() {
      if (this.$route.params.id !== undefined) {
        SupplierService.updateSupplier(this.supplier).then(() => {
          this.$router.push({ name: 'DisplaySupplier' })
        })
      } else {
        this.createSupplier(this.supplier)
      }
    },

    ...mapActions([
      'createSupplier',
    ]),
  },
}
</script>
