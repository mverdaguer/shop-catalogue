import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import ItemService from '@/services/items';
import EditItem from '@/components/Admin/Item/EditItem';

jest.mock('@/services/items', () => ({
  getItem: jest.fn().mockResolvedValue({ data: { id: 1, name: 'item-name', image: '.png' } }),
  updateItem: jest.fn().mockResolvedValue({}),
  addItem: jest.fn().mockResolvedValue({}),
}));

const categories = [
  { id: 1, name: 'cat1' },
  { id: 11, name: 'cat11', parent_category: 'cat1' },
  { id: 111, name: 'cat111', parent_category: 'cat1 - cat11' },
  { id: 2, name: 'cat2' },
];

const suppliers = [
  { id: 1, name: 'sup1' },
  { id: 2, name: 'sup2' },
];

describe('EditItem.vue', () => {
  let getters;
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
      allCategories: jest.fn().mockReturnValue(categories),
      allSuppliers: jest.fn().mockReturnValue(suppliers),
    };

    store = new Vuex.Store({
      getters,
    });
  })

  it('Should be empty and set up to create item if there are no params in the $route.', () => {
    const wrapper = shallowMount(EditItem, { store, localVue, mocks });

    expect(wrapper.vm.title).toBe('main.create_item');
    expect(wrapper.vm.updateText).toBe('main.create_item');
  });

  it('Should have create button disabled if data isn\'t entered.', () => {
    const wrapper = shallowMount(EditItem, { store, localVue, mocks });

    const buttons = wrapper.findAll(ElementUI.Button);
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).attributes().disabled).toBe('true');
    expect(buttons.at(0).text()).toBe('main.create_item');
  });

  it('Should have create button enabled once we enter a name, category and image.', () => {
    const wrapper = shallowMount(EditItem, { store, localVue, mocks });

    const buttons = wrapper.findAll(ElementUI.Button);
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).attributes().disabled).toBe('true');

    const item = {
      name: 'test',
      category: categories[0],
      image: 'image',
      id: '1',
    };

    wrapper.setData({ item });
    expect(wrapper.vm.isDisabled).toBeFalsy();
    expect(buttons.at(0).attributes().disabled).toBeUndefined();
  });

  it('Should contain selectable categories and suppliers if they are set up.', () => {
    const wrapper = shallowMount(EditItem, { store, localVue, mocks });

    const parentCategories = wrapper.findAll(ElementUI.Option);
    expect(parentCategories.length).toBe(6);
    expect(parentCategories.at(0).attributes().value).toBe('1');
    expect(parentCategories.at(0).attributes().label).toBe('cat1');
    expect(parentCategories.at(1).attributes().value).toBe('11');
    expect(parentCategories.at(1).attributes().label).toBe('cat1 - cat11');
    expect(parentCategories.at(2).attributes().value).toBe('111');
    expect(parentCategories.at(2).attributes().label).toBe('cat1 - cat11 - cat111');
    expect(parentCategories.at(3).attributes().value).toBe('2');
    expect(parentCategories.at(3).attributes().label).toBe('cat2');

    expect(parentCategories.at(4).attributes().value).toBe('1');
    expect(parentCategories.at(4).attributes().label).toBe('sup1');
    expect(parentCategories.at(5).attributes().value).toBe('2');
    expect(parentCategories.at(5).attributes().label).toBe('sup2');
  });

  it('Should be filled when we edit an item.', (done) => {
    mocks.$route.params.id = 1;

    const wrapper = shallowMount(EditItem, { store, localVue, mocks });
    expect(ItemService.getItem).toHaveBeenCalledWith(1);

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.item).toEqual({ id: 1, name: 'item-name', image: '.png' });
      done();
    });
  });

  it('Should call the method to create item, when creating, with proper params.', (done) => {
    const wrapper = shallowMount(EditItem, { store, localVue, mocks });

    const item = {
      category: '11',
      image: '.png',
      name: 'test',
    };

    wrapper.setData({ item })
    wrapper.vm.updateItem();
    expect(ItemService.addItem).toHaveBeenCalled();
    expect(ItemService.addItem.mock.calls[0][0]).toEqual(item);

    wrapper.vm.$nextTick(() => {
      expect(mocks.$router.push).toHaveBeenCalledWith({ name: 'DisplayItem' });
      done();
    });
  });

  it('Should call the method to update item, when creating, with proper params.', (done) => {
    mocks.$route.params.id = 11;
    const wrapper = shallowMount(EditItem, { store, localVue, mocks });

    const item = {
      category: '11',
      image: '.png',
      name: 'test',
    };

    wrapper.setData({ item })
    wrapper.vm.updateItem();
    expect(ItemService.updateItem).toHaveBeenCalledWith(item);

    wrapper.vm.$nextTick(() => {
      expect(mocks.$router.push).toHaveBeenCalledWith({ name: 'DisplayItem' });
      done();
    });
  });

  it('Should autoselect category if it is passed via params.', () => {
    mocks.$route.params.category = 11;
    const wrapper = shallowMount(EditItem, { store, localVue, mocks });

    expect(wrapper.vm.item.category).toBe(11);
  });
});
