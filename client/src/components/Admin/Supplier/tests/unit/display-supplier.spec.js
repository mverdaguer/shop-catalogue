import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import DisplaySupplier from '@/components/Admin/Supplier/DisplaySupplier';
import RouterLink from '@/test/utils/router-link.mock';

const router = new VueRouter();

const mocks = {
  $t: key => key
};

const mocksRouter = {
  $t: key => key,
  $router: {
    push: jest.fn()
  }
};

const stubs = {
  RouterLink
};

describe('DisplaySupplier.vue', () => {
  let getters;
  let actions;
  let store;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);

    getters = {
      allSuppliers: jest.fn().mockReturnValue([])
    };

    actions = {
      deleteSupplier: jest.fn(),
      fetchSuppliers: jest.fn()
    };

    store = new Vuex.Store({
      actions,
      getters
    })
  })

  it('should contain links to items, categories and home images admin zones.', () => {
    localVue.use(VueRouter);
    const wrapper = shallowMount(DisplaySupplier, { store, localVue, router, mocks, stubs });

    const links = wrapper.findAll(RouterLink);
    expect(links.length).toBe(3);
    expect(links.at(0).props().to).toBeDefined();
    expect(links.at(0).props().to).toBe("/admin");
    expect(links.at(1).props().to).toBeDefined();
    expect(links.at(1).props().to).toBe("/admin_categories");
    expect(links.at(2).props().to).toBeDefined();
    expect(links.at(2).props().to).toBe("/admin_home_images");
  });

  it('should contain a button to create a supplier.', () => {
    localVue.use(VueRouter);
    const wrapper = shallowMount(DisplaySupplier, { store, localVue, router, mocks });

    const buttons = wrapper.findAll(ElementUI.Button);
    expect(buttons.length).toBe(3);
    expect(buttons.at(0).text()).toBe('main.create_supplier');
  });

  it('should contain a table containing each supplier (empty).', () => {
    localVue.use(VueRouter);
    const wrapper = shallowMount(DisplaySupplier, { store, localVue, router, mocks });

    const table = wrapper.find(ElementUI.Table);
    expect(table.props().data).toEqual([]);

    const tableColumns = wrapper.findAll(ElementUI.TableColumn);
    expect(tableColumns.length).toBe(2);
    expect(tableColumns.at(0).props().prop).toBe('name');
  });

  it('should contain a table containing each supplier (filled).', () => {
    localVue.use(VueRouter);
    const suppliers = [
      { id: '1', name: 'sup1' },
      { id: '2', name: 'sup2' }
    ];
    
    getters.allSuppliers.mockReturnValue(suppliers);
    const wrapper = shallowMount(DisplaySupplier, { store, localVue, router, mocks });

    const table = wrapper.find(ElementUI.Table);
    expect(table.props().data).toEqual(suppliers);

    const tableColumns = wrapper.findAll(ElementUI.TableColumn);
    expect(tableColumns.length).toBe(2);
    expect(tableColumns.at(0).props().prop).toBe('name');
  });

  it('should navigate to CreateSupplier.', () => {
    const wrapper = shallowMount(DisplaySupplier, { store, localVue, mocks: mocksRouter, stubs });

    expect(mocksRouter.$router.push).not.toBeCalled();
    wrapper.vm.createSupplier();
    expect(mocksRouter.$router.push).toBeCalledWith({ name: 'CreateSupplier' });
  });

  it('should navigate to EditSupplier.', () => {
    const wrapper = shallowMount(DisplaySupplier, { store, localVue, mocks: mocksRouter, stubs });

    expect(mocksRouter.$router.push).not.toBeCalled();
    wrapper.vm.handleEdit(1);
    expect(mocksRouter.$router.push).toBeCalledWith({ name: 'EditSupplier', params: { id: 1 } });
  });
});
