import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Sidebar from '@/components/Menu/Sidebar';
import menuTestUtils from './common-desktop-mobile-tests';
import RouterLink from '@/test/utils/router-link.mock';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

const mocks = {
  $emit: jest.fn(),
  $t: key => key,
  $auth: {
    check: jest.fn(),
    logout: jest.fn(),
  },
};

const stubs = {
  RouterLink,
};

describe('Menu - Sidebar.vue', () => {
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    mocks.$auth.check.mockReturnValue(false);
    mocks.$emit.mockReset();

    getters = {
      indexedCategories: jest.fn(),
      currentCategory: jest.fn(),
    };

    actions = {
      fetchCategories: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
      getters,
    })
  });

  it('sidebar is opened when props are correctly set up', () => {
    const propsDataOpened = {
      sidebarDisplayed: true,
    };
    const wrapper = shallowMount(Sidebar, {
      store, localVue, router, mocks, propsData: propsDataOpened,
    });

    const sidebar = wrapper.find('div.sidebar');
    expect(sidebar.exists()).toBe(true);
    expect(sidebar.classes()).toContain('open');
  });

  it('sidebar is not opened when props are not correctly set up', () => {
    const propsDataClosed = {
      sidebarDisplayed: false,
    };
    const wrapper = shallowMount(Sidebar, {
      store, localVue, router, mocks, propsData: propsDataClosed,
    });

    const sidebar = wrapper.find('div.sidebar');
    expect(sidebar.exists()).toBe(true);
    expect(sidebar.classes()).not.toContain('open');
  });

  it('contact - renders only contact page when there are no categories, and no user logged in.', () => {
    const wrapper = shallowMount(Sidebar, {
      store, localVue, router, mocks,
    });
    menuTestUtils.contactTestCorrectText(wrapper);
  });

  it('contact - navigates to contact when contact link is clicked.', () => {
    const wrapper = shallowMount(Sidebar, {
      store, localVue, router, mocks, stubs,
    });
    menuTestUtils.contactTestNavigation(wrapper);
  });

  it('logged in - renders contact + admin + logout links when there are no categories, and user is logged in.', () => {
    mocks.$auth.check.mockReturnValue(true);
    const wrapper = shallowMount(Sidebar, {
      store, localVue, router, mocks,
    });
    menuTestUtils.loggedInCorrectText(wrapper);
  });

  it('logged in - navigates to admin - items page, when admin link is clicked.', () => {
    mocks.$auth.check.mockReturnValue(true);
    const wrapper = shallowMount(Sidebar, {
      store, localVue, router, mocks, stubs,
    });
    menuTestUtils.loggedInNavigationToAdmin(wrapper);
  });

  it('logged in - calls logout on $auth when clicked.', () => {
    mocks.$auth.check.mockReturnValue(true);
    const wrapper = shallowMount(Sidebar, {
      store, localVue, router, mocks,
    });
    menuTestUtils.loggedInLogout(wrapper, mocks);
  });

  it('categories - creates a router-link for each category returned from the API.', () => {
    const testFn = menuTestUtils.categoriesCreatesRouterLinks();
    testFn.mockCategoriesGetter(getters.indexedCategories);

    const wrapper = shallowMount(Sidebar, {
      store, localVue, router, mocks, stubs,
    });
    testFn.testWrapper(wrapper);
  });

  it('categories - creates a router-link for each category and subcategory returned from the API.', () => {
    const testFn = menuTestUtils.categoriesCreatesSubcategoriesRouterLinks();
    testFn.mockCategoriesGetter(getters.indexedCategories);

    const wrapper = shallowMount(Sidebar, {
      store, localVue, router, mocks, stubs,
    });
    testFn.testWrapper(wrapper);
  });

  it('emits a hideBar event every time we click a link.', () => {
    mocks.$auth.check.mockReturnValue(true);
    const testFn = menuTestUtils.categoriesCreatesSubcategoriesRouterLinks();
    testFn.mockCategoriesGetter(getters.indexedCategories);
    const wrapper = shallowMount(Sidebar, {
      store, localVue, router, mocks, stubs,
    });

    const categoriesWrappers = wrapper.findAll(RouterLink);
    expect(categoriesWrappers.length).toBe(6);
    expect(mocks.$emit).not.toHaveBeenCalledWith('hideSidebar');

    categoriesWrappers.wrappers.forEach((link) => {
      link.trigger('click')
      expect(mocks.$emit).toHaveBeenCalledWith('hideSidebar');
      mocks.$emit.mockReset();
    });
  });
});
