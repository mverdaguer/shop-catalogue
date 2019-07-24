import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import DisplayCategory from '@/components/Admin/Category/DisplayCategory';
import RouterLink from '@/test/utils/router-link.mock';

const router = new VueRouter();

const mocks = {
  $t: key => key,
};

const mocksRouter = {
  $t: key => key,
  $router: {
    push: jest.fn(),
  },
};

const stubs = {
  RouterLink,
};

describe('DisplayCategory.vue', () => {
  let getters;
  let actions;
  let store;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);

    getters = {
      allCategories: jest.fn().mockReturnValue([]),
    };

    actions = {
      deleteCategories: jest.fn(),
      fetchCategories: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
      getters,
    })
  })

  it('should contain links to items, suppliers and home images admin zones.', () => {
    localVue.use(VueRouter);
    const wrapper = shallowMount(DisplayCategory, {
      store, localVue, router, mocks, stubs,
    });

    const links = wrapper.findAll(RouterLink);
    expect(links.length).toBe(3);
    expect(links.at(0).props().to).toBeDefined();
    expect(links.at(0).props().to).toBe('/admin');
    expect(links.at(1).props().to).toBeDefined();
    expect(links.at(1).props().to).toBe('/admin_suppliers');
    expect(links.at(2).props().to).toBeDefined();
    expect(links.at(2).props().to).toBe('/admin_home_images');
  });

  it('should contain a button to create a category.', () => {
    localVue.use(VueRouter);
    const wrapper = shallowMount(DisplayCategory, {
      store, localVue, router, mocks,
    });

    const buttons = wrapper.findAll(ElementUI.Button);
    expect(buttons.length).toBe(3);
    expect(buttons.at(0).text()).toBe('main.create_category');
  });

  it('should contain a table containing each category (empty).', () => {
    localVue.use(VueRouter);
    const wrapper = shallowMount(DisplayCategory, {
      store, localVue, router, mocks,
    });

    const table = wrapper.find(ElementUI.Table);
    expect(table.props().data).toEqual([]);

    const tableColumns = wrapper.findAll(ElementUI.TableColumn);
    expect(tableColumns.length).toBe(3);
    expect(tableColumns.at(0).props().prop).toBe('name');
    expect(tableColumns.at(1).props().prop).toBe('parent_category');
  });

  it('should contain a table containing each category (filled).', () => {
    localVue.use(VueRouter);
    const categories = [
      { id: '1', name: 'cat1' },
      { id: '2', name: 'cat2' },
    ];

    getters.allCategories.mockReturnValue(categories);
    const wrapper = shallowMount(DisplayCategory, {
      store, localVue, router, mocks,
    });

    const table = wrapper.find(ElementUI.Table);
    expect(table.props().data).toEqual(categories);

    const tableColumns = wrapper.findAll(ElementUI.TableColumn);
    expect(tableColumns.length).toBe(3);
    expect(tableColumns.at(0).props().prop).toBe('name');
    expect(tableColumns.at(1).props().prop).toBe('parent_category');
  });

  it('should navigate to CreateCategory.', () => {
    const wrapper = shallowMount(DisplayCategory, {
      store, localVue, mocks: mocksRouter, stubs,
    });

    expect(mocksRouter.$router.push).not.toBeCalled();
    wrapper.vm.createCategory();
    expect(mocksRouter.$router.push).toBeCalledWith({ name: 'CreateCategory' });
  });

  it('should navigate to EditCategory.', () => {
    const wrapper = shallowMount(DisplayCategory, {
      store, localVue, mocks: mocksRouter, stubs,
    });

    expect(mocksRouter.$router.push).not.toBeCalled();
    wrapper.vm.handleEdit(1);
    expect(mocksRouter.$router.push).toBeCalledWith({ name: 'EditCategory', params: { id: 1 } });
  });
});
