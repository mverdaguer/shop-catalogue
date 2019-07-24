import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import SupplierService from '@/services/suppliers';
import EditSupplier from '@/components/Admin/Supplier/EditSupplier';

jest.mock('@/services/suppliers', () => {
  return {
    getSupplier: jest.fn().mockResolvedValue({data: {}}),
    updateSupplier: jest.fn().mockResolvedValue({})
  };
});

const suppliers = [
  { id: 1, name: 'sup1' },
  { id: 2, name: 'sup2' },
]

describe('EditSupplier.vue', () => {
  let getters;
  let actions;
  let store;
  let localVue;
  let mocks;

  beforeEach(() => {
    mocks = {
      $t: key => key,
      $router: {
        push: jest.fn()
      },
      $route: {
        params: {}
      }
    };

    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);

    getters = {
      allSuppliers: jest.fn().mockReturnValue([])
    };

    actions = {
      createSupplier: jest.fn()
    };

    store = new Vuex.Store({
      actions,
      getters
    })
  })

  it('Should be empty and set up to create supplier if there are no params in the $route.', () => {
    const wrapper = shallowMount(EditSupplier, { store, localVue, mocks });

    const h1 = wrapper.find('h1');
    expect(h1.text()).toBe("main.create_supplier");

    const input = wrapper.find(ElementUI.Input);
    expect(input.props().value).toBeUndefined();
  });

  it('Should have create button disabled if data isn\'t entered.', () => {
    const wrapper = shallowMount(EditSupplier, { store, localVue, mocks });

    const buttons = wrapper.findAll(ElementUI.Button);
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).attributes().disabled).toBe('true');
    expect(buttons.at(0).text()).toBe('main.create_supplier');
  });

  it('Should have create button enabled once we enter a name.', () => {
    const wrapper = shallowMount(EditSupplier, { store, localVue, mocks });

    const buttons = wrapper.findAll(ElementUI.Button);
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).attributes().disabled).toBe('true');

    wrapper.setData({ supplier: { name: "test" } });
    expect(buttons.at(0).attributes().disabled).toBeUndefined();
  });

  it('Should be filled when we edit a supplier.', (done) => {
    mocks.$route.params.id = 1;
    const supplier = suppliers[0];
    SupplierService.getSupplier.mockResolvedValue({ data: supplier })

    getters.allSuppliers.mockReturnValue(suppliers);
    const wrapper = shallowMount(EditSupplier, { store, localVue, mocks });

    const h1 = wrapper.find('h1');
    expect(h1.text()).toBe("main.update_supplier");
    expect(SupplierService.getSupplier).toHaveBeenCalledWith(1);

    wrapper.vm.$nextTick(() => {
      const input = wrapper.find(ElementUI.Input);
      expect(input.props().value).toBe('sup1');

      const buttons = wrapper.findAll(ElementUI.Button);
      expect(buttons.at(0).attributes().disabled).toBeUndefined();
      expect(buttons.at(0).text()).toBe('main.update');
      
      done();
    });
  });

  it('Should call the method to create supplier, when creating, with proper params.', () => {
    const wrapper = shallowMount(EditSupplier, { store, localVue, mocks });

    const supplier = { name: "test" }
    wrapper.setData({ supplier })
    wrapper.vm.updateSupplier();
    expect(actions.createSupplier).toHaveBeenCalled();
    expect(actions.createSupplier.mock.calls[0][1]).toEqual(supplier);
  });

  it('Should call the method to update supplier, when creating, with proper params.', (done) => {
    mocks.$route.params.id = 1;
    const wrapper = shallowMount(EditSupplier, { store, localVue, mocks });

    const supplier = { name: "test" }
    wrapper.setData({ supplier })
    wrapper.vm.updateSupplier();
    expect(SupplierService.updateSupplier).toHaveBeenCalledWith(supplier);

    wrapper.vm.$nextTick(() => {
      expect(mocks.$router.push).toHaveBeenCalledWith({ name: 'DisplaySupplier' });
      done();
    });
  });
});
