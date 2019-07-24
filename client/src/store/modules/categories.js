import * as types from '../mutation-types'
import CategoryService from '@/services/categories'

const getters = {
  allCategories: state => state.all,
  indexedCategories: state => state.allIndexed,
  currentCategory: state => state.currentCategory,
  currentCategoryRoot: state => state.currentCategoryRoot,
}

const findHigherAncestor = (state, category) => {
  if (!category.parent_id) {
    return category
  }
  const parent = state.all.find(item => item.id === category.parent_id)
  return findHigherAncestor(state, parent)
}

const findParent = (data, id) => {
  if (!id) {
    return ''
  }
  const parent = data.find(i => i.id === id)
  let result = findParent(data, parent.parent_category)

  if (result.length > 0) {
    result += ' - '
  }
  return result + parent.name
}

const actions = {
  fetchCategories({ commit }) {
    CategoryService.getCategories().then((response) => {
      const categories = response.data.map(item => ({
        id: item.id,
        name: item.name,
        url: item.name.replace(/ /g, '-'),
        parent_id: item.parent_category,
        parent_category: findParent(response.data, item.parent_category),
      }))

      const categoriesCp = JSON.parse(JSON.stringify(categories))
      const indexedCategories = []

      categoriesCp.forEach((category) => {
        category.subcategories = []

        if (!category.parent_id) {
          indexedCategories.push(category)
        } else {
          const parent = categoriesCp.find(iCat => iCat.id === category.parent_id)

          if (parent.subcategories === undefined) {
            parent.subcategories = []
          }
          parent.subcategories.push(category)
        }
      })
      commit(types.FETCH_CATEGORIES, { categories, indexedCategories })
    })
  },

  createCategory({ commit }, category) {
    CategoryService.createCategory(category).then(() => {
      commit(types.CREATE_CATEGORY, { category })
      router.push({ name: 'DisplayCategory' })
    })
  },

  deleteCategory({ commit }, id) {
    CategoryService.deleteCategory(id).then(() => {
      commit(types.DELETE_CATEGORY, { id })
    })
  },

  setCurrentCategory({ commit, state }, category) {
    if (category !== undefined) {
      const rootCategory = findHigherAncestor(state, category)
      commit(types.SET_CURRENT_CATEGORY_ROOT, { rootCategory })
    } else {
      commit(types.SET_CURRENT_CATEGORY_ROOT, { rootCategory: undefined })
    }

    commit(types.SET_CURRENT_CATEGORY, { category })
  },
}

const mutations = {
  [types.FETCH_CATEGORIES](state, { categories, indexedCategories }) {
    state.all = categories
    state.allIndexed = indexedCategories
  },

  [types.CREATE_CATEGORY](state, { category }) {
    state.all.push(category)
  },

  [types.DELETE_CATEGORY](state, { id }) {
    state.all = state.all.filter(element => element.id !== id)
  },

  [types.SET_CURRENT_CATEGORY](state, { category }) {
    state.currentCategory = category
  },

  [types.SET_CURRENT_CATEGORY_ROOT](state, { rootCategory }) {
    state.currentCategoryRoot = rootCategory
  },
}

const state = {
  all: [],
  allIndexed: [],
  currentCategory: undefined,
  currentCategoryRoot: undefined,
}

export default {
  state,
  getters,
  actions,
  mutations,
}
