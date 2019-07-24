import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Desktop from '@/components/Menu/Desktop';
import menuTestUtils from './common-desktop-mobile-tests';
import RouterLink from '@/test/utils/router-link.mock';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

const mocks = {
  $t: key => key,
  $auth: {
    check: jest.fn(),
    logout: jest.fn()
  }
};

const stubs = {
  RouterLink
};

describe('Menu - Desktop.vue', () => {
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    mocks.$auth.check.mockReturnValue(false);

    getters = {
      indexedCategories: jest.fn(),
      currentCategory: jest.fn(),
      currentCategoryRoot: jest.fn()
    };

    actions = {
      fetchCategories: jest.fn()
    };

    store = new Vuex.Store({
      actions,
      getters
    })
  })

  it('contact - renders only contact page when there are no categories, and no user logged in.', () => {
    const wrapper = shallowMount(Desktop, { store, localVue, router, mocks });
    menuTestUtils.contactTestCorrectText(wrapper);
  });

  it('contact - navigates to contact when contact link is clicked.', () => {
    const wrapper = shallowMount(Desktop, { store, localVue, router, mocks, stubs });
    menuTestUtils.contactTestNavigation(wrapper);
  });

  it('logged in - renders contact + admin + logout links when there are no categories, and user is logged in.', () => {
    mocks.$auth.check.mockReturnValue(true);
    const wrapper = shallowMount(Desktop, { store, localVue, router, mocks });
    menuTestUtils.loggedInCorrectText(wrapper);
  });

  it('logged in - navigates to admin - items page, when admin link is clicked.', () => {
    mocks.$auth.check.mockReturnValue(true);
    const wrapper = shallowMount(Desktop, { store, localVue, router, mocks, stubs });
    menuTestUtils.loggedInNavigationToAdmin(wrapper);
  });

  it('logged in - calls logout on $auth when clicked.', () => {
    mocks.$auth.check.mockReturnValue(true);
    const wrapper = shallowMount(Desktop, { store, localVue, router, mocks });
    menuTestUtils.loggedInLogout(wrapper, mocks);    
  });

  it('categories - creates a router-link for each category returned from the API.', () => {
    menuTestUtils.categoriesCreatesRouterLinks().mockCategoriesGetter(getters.indexedCategories);

    const wrapper = shallowMount(Desktop, { store, localVue, router, mocks, stubs });
    menuTestUtils.categoriesCreatesRouterLinks().testWrapper(wrapper);
  });

  it('categories - creates a router-link for each category and subcategory returned from the API.', () => {
    menuTestUtils.categoriesCreatesSubcategoriesRouterLinks().mockCategoriesGetter(getters.indexedCategories);

    const wrapper = shallowMount(Desktop, { store, localVue, router, mocks, stubs });
    menuTestUtils.categoriesCreatesSubcategoriesRouterLinks().testWrapper(wrapper);
  }); 
});
