import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import CategoryService from '@/services/categories';
import EditCategory from '@/components/Admin/Category/EditCategory';

jest.mock('@/services/categories', () => ({
  getCategory: jest.fn().mockResolvedValue({ data: {} }),
  updateCategory: jest.fn().mockResolvedValue({}),
}));

const categories = [
  { id: 1, name: 'cat1' },
  { id: 11, name: 'cat11', parent_category: 'cat1' },
  { id: 111, name: 'cat111', parent_category: 'cat1 - cat11' },
  { id: 2, name: 'cat2' },
]

describe('EditCategory.vue', () => {
  let getters;
  let actions;
  let store;
  let localVue;
  let mocks;

  beforeEach(() => {
    mocks = {
      $t: key => key,
      $router: {
        push: jest.fn(),
      },
      $route: {
        params: {},
      },
    };

    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);

    getters = {
      allCategories: jest.fn().mockReturnValue([]),
    };

    actions = {
      createCategory: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
      getters,
    })
  })

  it('Should be empty and set up to create category if there are no params in the $route.', () => {
    const wrapper = shallowMount(EditCategory, { store, localVue, mocks });

    const h1 = wrapper.find('h1');
    expect(h1.text()).toBe('main.create_category');

    const input = wrapper.find(ElementUI.Input);
    expect(input.props().value).toBeUndefined();

    // No categories -> no selectable options.
    const parentCategories = wrapper.findAll(ElementUI.Option);
    expect(parentCategories.length).toBe(0);
  });

  it('Should have create button disabled if data isn\'t entered.', () => {
    const wrapper = shallowMount(EditCategory, { store, localVue, mocks });

    const buttons = wrapper.findAll(ElementUI.Button);
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).attributes().disabled).toBe('true');
    expect(buttons.at(0).text()).toBe('main.create_category');
  });

  it('Should have create button enabled once we enter a name.', () => {
    const wrapper = shallowMount(EditCategory, { store, localVue, mocks });

    const buttons = wrapper.findAll(ElementUI.Button);
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).attributes().disabled).toBe('true');

    wrapper.setData({ category: { name: 'test' } });
    expect(buttons.at(0).attributes().disabled).toBeUndefined();
  });

  it('Should contain selectable categories if there are categories.', () => {
    getters.allCategories.mockReturnValue(categories);
    const wrapper = shallowMount(EditCategory, { store, localVue, mocks });

    // No categories -> no selectable options.
    const parentCategories = wrapper.findAll(ElementUI.Option);
    expect(parentCategories.length).toBe(4);
    expect(parentCategories.at(0).attributes().value).toBe('1');
    expect(parentCategories.at(0).attributes().label).toBe('cat1');
    expect(parentCategories.at(1).attributes().value).toBe('11');
    expect(parentCategories.at(1).attributes().label).toBe('cat1 - cat11');
    expect(parentCategories.at(2).attributes().value).toBe('111');
    expect(parentCategories.at(2).attributes().label).toBe('cat1 - cat11 - cat111');
    expect(parentCategories.at(3).attributes().value).toBe('2');
    expect(parentCategories.at(3).attributes().label).toBe('cat2');
  });

  it('Should be filled when we edit a category.', (done) => {
    mocks.$route.params.id = 11;
    const category = categories[1];
    CategoryService.getCategory.mockResolvedValue({ data: category })

    getters.allCategories.mockReturnValue(categories);
    const wrapper = shallowMount(EditCategory, { store, localVue, mocks });

    const h1 = wrapper.find('h1');
    expect(h1.text()).toBe('main.update_category');
    expect(CategoryService.getCategory).toHaveBeenCalledWith(11);

    wrapper.vm.$nextTick(() => {
      const input = wrapper.find(ElementUI.Input);
      expect(input.props().value).toBe('cat11');

      // Edited category must not be displayed as possible parent category.
      const parentCategories = wrapper.findAll(ElementUI.Option);
      expect(parentCategories.length).toBe(3);
      expect(parentCategories.at(0).attributes().value).toBe('1');
      expect(parentCategories.at(1).attributes().value).toBe('111');
      expect(parentCategories.at(2).attributes().value).toBe('2');

      const buttons = wrapper.findAll(ElementUI.Button);
      expect(buttons.at(0).attributes().disabled).toBeUndefined();
      expect(buttons.at(0).text()).toBe('main.update');

      done();
    });
  });

  it('Should call the method to create category, when creating, with proper params.', () => {
    const wrapper = shallowMount(EditCategory, { store, localVue, mocks });

    const category = { name: 'test' }
    wrapper.setData({ category })
    wrapper.vm.updateCategory();
    expect(actions.createCategory).toHaveBeenCalled();
    expect(actions.createCategory.mock.calls[0][1]).toEqual(category);
  });

  it('Should call the method to update category, when creating, with proper params.', (done) => {
    mocks.$route.params.id = 11;
    const wrapper = shallowMount(EditCategory, { store, localVue, mocks });

    const category = { name: 'test' }
    wrapper.setData({ category })
    wrapper.vm.updateCategory();
    expect(CategoryService.updateCategory).toHaveBeenCalledWith(category);

    wrapper.vm.$nextTick(() => {
      expect(mocks.$router.push).toHaveBeenCalledWith({ name: 'DisplayCategory' });
      done();
    });
  });
});
