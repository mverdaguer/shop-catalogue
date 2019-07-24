import CategoryService from '@/services/categories'
import categoriesStore from '@/store/modules/categories';
import * as types from '@/store/mutation-types'

jest.mock('@/services/categories', () => {
  return {
    getCategories: jest.fn(),
    createCategory: jest.fn(),
    deleteCategory: jest.fn()
  };
});

describe('categories store', () => {
  describe('mutations', () => {
    it(types.FETCH_CATEGORIES, () => {
      const state = { all: [], allIndexed: [] };
      const mutation = categoriesStore.mutations[types.FETCH_CATEGORIES];
      
      mutation(state, {categories: [1, 2], indexedCategories: [1]});
      expect(state.all).toEqual([1, 2]);
      expect(state.allIndexed).toEqual([1]);
    });

    it(types.CREATE_CATEGORY, () => {
      const state = { all: [1] };
      const mutation = categoriesStore.mutations[types.CREATE_CATEGORY];
      
      mutation(state, {category: 2});
      expect(state.all).toEqual([1, 2]);
    });

    it(types.DELETE_CATEGORY, () => {
      const state = { all: [{id: 1}, {id: 2}] };
      const mutation = categoriesStore.mutations[types.DELETE_CATEGORY];
      
      mutation(state, {id: 1});
      expect(state.all).toEqual([{id: 2}]);
    });

    it(types.SET_CURRENT_CATEGORY, () => {
      const state = { currentCategory: '' };
      const mutation = categoriesStore.mutations[types.SET_CURRENT_CATEGORY];
      
      mutation(state, {category: 2});
      expect(state.currentCategory).toBe(2);
    });

    it(types.SET_CURRENT_CATEGORY_ROOT, () => {
      const state = { currentCategoryRoot: '' };
      const mutation = categoriesStore.mutations[types.SET_CURRENT_CATEGORY_ROOT];
      
      mutation(state, {rootCategory: 2});
      expect(state.currentCategoryRoot).toBe(2);
    });
  });

  describe('actions', () => {
    it('fetchCategories', async () => {
      const commit = jest.fn();
      const fetchedCategories = [
        {id: 1, name: 'cat1' },
        {id: 11, name: 'cat11', parent_category: 1 },
        {id: 111, name: 'cat111', parent_category: 11 },
        {id: 112, name: 'cat112', parent_category: 11 },
        {id: 2, name: 'cat2' }
      ];
      CategoryService.getCategories.mockResolvedValueOnce({data: fetchedCategories});

      categoriesStore.actions.fetchCategories({ commit });
      await CategoryService.getCategories();

      const categories = [
        {id: 1, name: 'cat1', parent_id: undefined, url: 'cat1', parent_category: '' },
        {id: 11, name: 'cat11', parent_id: 1, url: 'cat11', parent_category: 'cat1' },
        {id: 111, name: 'cat111', parent_id: 11, url: 'cat111', parent_category: 'cat1 - cat11' },
        {id: 112, name: 'cat112', parent_id: 11, url: 'cat112', parent_category: 'cat1 - cat11' },
        {id: 2, name: 'cat2', parent_id: undefined, url: 'cat2', parent_category: '' }
      ];
      const indexedCategories = [
        {id: 1, name: 'cat1', url: 'cat1', parent_category: '', subcategories: [
          {id: 11, name: 'cat11', parent_id: 1, url: 'cat11', parent_category: 'cat1', subcategories: [
            {id: 111, name: 'cat111', parent_id: 11, url: 'cat111', parent_category: 'cat1 - cat11', subcategories: [] },
            {id: 112, name: 'cat112', parent_id: 11, url: 'cat112', parent_category: 'cat1 - cat11', subcategories: [] }
          ] }
        ] },
        {id: 2, name: 'cat2', url: 'cat2', parent_category: '', subcategories: [] }
      ];

      expect(CategoryService.getCategories).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith(types.FETCH_CATEGORIES, { categories, indexedCategories });
    });

    it('createCategory', async () => {
      const commit = jest.fn();
      CategoryService.createCategory.mockResolvedValueOnce({});
      const category = {id: 1};
      global.router = {
        push: jest.fn()
      };

      categoriesStore.actions.createCategory({ commit }, category);
      await CategoryService.createCategory();

      expect(CategoryService.createCategory).toHaveBeenCalledWith(category);
      expect(commit).toHaveBeenCalledWith(types.CREATE_CATEGORY, { category });
      expect(global.router.push).toHaveBeenCalledWith({ name: 'DisplayCategory' });
    });

    it('deleteCategory', async () => {
      const commit = jest.fn();
      const categoryId = 1;
      CategoryService.deleteCategory.mockResolvedValueOnce({});

      categoriesStore.actions.deleteCategory({ commit }, categoryId);
      await CategoryService.deleteCategory();

      expect(CategoryService.deleteCategory).toHaveBeenCalledWith(categoryId);
      expect(commit).toHaveBeenCalledWith(types.DELETE_CATEGORY, { id: categoryId });
    });

    it('setCurrentCategory', () => {
      const commit = jest.fn();
      const state = {
        all: [
          {id: 1 },
          {id: 11, parent_id: 1 },
          {id: 111, parent_id: 11 },
          {id: 112, parent_id: 11 },
          {id: 2, }
        ]
      };
      const category = {id: 111, parent_id: 11};

      categoriesStore.actions.setCurrentCategory({ commit, state }, category);

      expect(commit).toHaveBeenNthCalledWith(1, types.SET_CURRENT_CATEGORY_ROOT, { rootCategory: {id: 1 } });
      expect(commit).toHaveBeenNthCalledWith(2, types.SET_CURRENT_CATEGORY, { category });
    });

    it('setCurrentCategory - when undefined only updates current one.', () => {
      const commit = jest.fn();
      const state = {};

      categoriesStore.actions.setCurrentCategory({ commit, state }, undefined);

      expect(commit).toHaveBeenCalledWith(types.SET_CURRENT_CATEGORY, { category: undefined });
      expect(commit).toHaveBeenCalledWith(types.SET_CURRENT_CATEGORY_ROOT, { rootCategory: undefined });
    });
  });

  describe('getters', () => {
    it('allCategories', () => {
      const state = {
        all: [1, 2, 3]
      };
        
      const result = categoriesStore.getters.allCategories(state);
      expect(result).toEqual(state.all);
    });

    it('indexedCategories', () => {
      const state = {
        allIndexed: [1, 2, 3]
      };
        
      const result = categoriesStore.getters.indexedCategories(state);
      expect(result).toEqual(state.allIndexed);
    });

    it('currentCategory', () => {
      const state = {
        currentCategory: 1
      };
        
      const result = categoriesStore.getters.currentCategory(state);
      expect(result).toEqual(1);
    });

    it('currentCategoryRoot', () => {
      const state = {
        currentCategoryRoot: 1
      };
        
      const result = categoriesStore.getters.currentCategoryRoot(state);
      expect(result).toEqual(1);
    });
  });
});
