<template>
	<div>
		<h1>{{ $t('main.categories') }}</h1>
    <router-link class="admin-link" to="/admin">{{ $t('main.items') }}</router-link>
		<router-link class="admin-link" to="/admin_suppliers">{{ $t('main.suppliers') }}</router-link>
		<router-link class="admin-link" to="/admin_home_images">{{ $t('main.home_images') }}</router-link>

		<el-row type="flex" :gutter="10" justify="end">
			<el-col :span="4" align="right">
				<el-button size="small"
										type="primary"
										v-on:click="createCategory"
										icon="el-icon-circle-plus-outline">
					{{ $t('main.create_category') }}
				</el-button>
			</el-col>
		</el-row>

		<el-table
      :data="categories"
      style="width: 100%">
      <el-table-column
        prop="name"
        v-bind:label="$t('main.name')"
        width="200">
      </el-table-column>
      <el-table-column
				prop="parent_category"
        v-bind:label="$t('main.parent_category')"
				width="250">
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
						@click="dialogVisible = true; removingCategoryId = scope.row.id">{{$t('main.delete')}}</el-button>
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
				<el-button type="primary" @click="dialogVisible = false; deleteCategory(removingCategoryId)">{{ $t('main.accept') }}</el-button>
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
      removingCategoryId: undefined,
    }
  },

  computed: mapGetters({
    categories: 'allCategories',
  }),

  created() {
    this.$store.dispatch('fetchCategories')
  },

  methods: {
    createCategory() {
      this.$router.push({ name: 'CreateCategory' })
    },

    handleEdit(id) {
      this.$router.push({ name: 'EditCategory', params: { id } })
    },

    ...mapActions([
      'deleteCategory',
    ]),
  },
}
</script>
