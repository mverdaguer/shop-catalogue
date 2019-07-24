<template>
	<div>
		<h1>{{ $t('main.suppliers') }}</h1>
    <router-link class="admin-link" to="/admin">{{ $t('main.items') }}</router-link>
		<router-link class="admin-link" to="/admin_categories">{{ $t('main.categories') }}</router-link>
		<router-link class="admin-link" to="/admin_home_images">{{ $t('main.home_images') }}</router-link>

		<el-row type="flex" :gutter="10" justify="end">
			<el-col :span="4">
				<el-button size="small"
										type="primary"
										v-on:click="createSupplier"
										icon="el-icon-circle-plus-outline">
					{{ $t('main.create_supplier') }}
				</el-button>
			</el-col>
		</el-row>

		<el-table
      :data="suppliers"
      style="width: 100%">
      <el-table-column
        prop="name"
        v-bind:label="$t('main.name')"
        width="200">
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
						@click="dialogVisible = true; removingSupplierId = scope.row.id">{{$t('main.delete')}}</el-button>
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
				<el-button type="primary" @click="dialogVisible = false; deleteSupplier(removingSupplierId)">{{ $t('main.accept') }}</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      dialogVisible: false,
      removingSupplierId: undefined,
    }
  },

  computed: mapGetters({
    suppliers: 'allSuppliers',
  }),

  created() {
    this.$store.dispatch('fetchSuppliers')
  },

  methods: {
    createSupplier() {
      this.$router.push({ name: 'CreateSupplier' })
    },

    handleEdit(id) {
      this.$router.push({ name: 'EditSupplier', params: { id } })
    },

    ...mapActions([
      'deleteSupplier',
    ]),
  },
}
</script>
