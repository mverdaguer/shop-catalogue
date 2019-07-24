import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import ItemService from '@/services/items';
import DisplayItem from '@/components/Admin/Item/DisplayItem';
import RouterLink from '@/test/utils/router-link.mock';

jest.mock('@/services/items', () => {
  return {
    getItems: jest.fn().mockResolvedValue({data: []}),
    deleteItem: jest.fn().mockResolvedValue({})
  };
});

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

describe('DisplayItem.vue', () => {
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
      indexedCategories: jest.fn().mockReturnValue([]),
      allSuppliers: jest.fn().mockReturnValue([])
    };

    actions = {
      fetchCategories: jest.fn()
    };

    store = new Vuex.Store({
      getters,
      actions
    })
  })

  it('should contain links to categories, suppliers and home images admin zones.', () => {
    localVue.use(VueRouter);
    const wrapper = shallowMount(DisplayItem, { store, localVue, router, mocks, stubs });

    const links = wrapper.findAll(RouterLink);
    expect(links.length).toBe(3);
    expect(links.at(0).props().to).toBeDefined();
    expect(links.at(0).props().to).toBe("/admin_categories");
    expect(links.at(1).props().to).toBeDefined();
    expect(links.at(1).props().to).toBe("/admin_suppliers");
    expect(links.at(2).props().to).toBeDefined();
    expect(links.at(2).props().to).toBe("/admin_home_images");
  });

  it('should contain a button to create an item.', () => {
    localVue.use(VueRouter);
    const wrapper = shallowMount(DisplayItem, { store, localVue, router, mocks });

    const buttons = wrapper.findAll(ElementUI.Button);
    expect(buttons.length).toBe(3);
    expect(buttons.at(0).text()).toBe('main.create_item');
  });

  it('should contain a table containing each item (empty).', () => {
    localVue.use(VueRouter);
    const wrapper = shallowMount(DisplayItem, { store, localVue, router, mocks });

    const table = wrapper.find(ElementUI.Table);
    expect(table.props().data).toEqual([]);

    const tableColumns = wrapper.findAll(ElementUI.TableColumn);
    expect(tableColumns.length).toBe(5);
    expect(tableColumns.at(0).props().prop).toBe('name');
    expect(tableColumns.at(1).props().label).toBe('main.image');
    expect(tableColumns.at(2).props().prop).toBe('supplier.name');
    expect(tableColumns.at(3).props().prop).toBe('category.name');
  });

  it('should contain a table containing each item (filled).', () => {
    localVue.use(VueRouter);
    const items = [
      { id: '1', name: 'item1' },
      { id: '2', name: 'item2' }
    ];
   
    const wrapper = shallowMount(DisplayItem, { store, localVue, router, mocks });
    
    wrapper.setData({items});
    const table = wrapper.find(ElementUI.Table);
    expect(table.props().data).toEqual(items);
  });

  it('should navigate to EditItem when creating.', () => {
    const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });

    expect(mocksRouter.$router.push).not.toBeCalled();
    wrapper.vm.createItem();

    const pushParams = {
      name: 'EditItem',
      params: { category: 'all' }
    };
    expect(mocksRouter.$router.push).toBeCalledWith(pushParams);
  });

  it('should navigate to EditItem when editing.', () => {
    const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });

    expect(mocksRouter.$router.push).not.toBeCalled();
    wrapper.vm.handleEdit(1);

    const pushParams = {
      name: 'EditItem',
      params: { id: 1, category: 'all' }
    };
    expect(mocksRouter.$router.push).toBeCalledWith(pushParams);
  });

  it('getValidCategories - should fill the first parameter with all the subcategories of the passed category.', () => {
    const category = {
      id: 1, 
      subcategories: [
        {id: 11, subcategories: [
          {id: 112}
        ]},
        {id: 12}
      ]
    };

    const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });
    let list = [];
    wrapper.vm.getValidCategories(list, category);
    expect(list).toEqual([1, 11, 112, 12]);
  });

  it('findCategory - should find a category by its id in an indexed structure.', () => {
    const categories = [
      {id: 1, subcategories: [
        {id: 11, subcategories: [
          {id: 111}
        ]}
      ]},
      {id: 2}
    ];

    const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });
    expect(wrapper.vm.findCategory(111, categories)).toEqual({id: 111});
    expect(wrapper.vm.findCategory(11, categories)).toEqual(categories[0].subcategories[0]);
    expect(wrapper.vm.findCategory(2, categories)).toEqual({id: 2});
    expect(wrapper.vm.findCategory(21, categories)).toBeUndefined();
  });

  describe('deleteItem', () => { 
    it('should do nothing if removing item id is not defined.', () => {
      const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });
    
      wrapper.vm.deleteItem();
      expect(ItemService.deleteItem).not.toHaveBeenCalled();
    });

    it('should remove the selected item.', () => {
      const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });
      wrapper.setData({
        removingItemId: 2,
        items: [
          {id: 1, name: "item1"},
          {id: 2, name: "item2"}
        ]
      });
    
      wrapper.vm.deleteItem();
      expect(ItemService.deleteItem).toHaveBeenCalledWith(2);
    });
  });

  describe('created', () => { 
    it('should leave displayed supplier as it is if there are no suppliers.', () => {
      const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });
      expect(wrapper.vm.displayedSupplier).toBe('all');
    });

    it('should autoselect first supplier if there are suppliers.', () => {
      const suppliers = [
        {id: 23},
        {id: 1}
      ];

      getters.allSuppliers.mockReturnValueOnce(suppliers);
      const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });
      expect(wrapper.vm.displayedSupplier).toBe(23);
    });

    it('should leave displayed category as it is if there are no categories.', () => {
      const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });
      expect(wrapper.vm.displayedCategory).toBe('all');
    });

    it('should autoselect first category if there are category.', () => {
      const categories = [
        {id: 23},
        {id: 1}
      ];

      getters.allCategories.mockReturnValueOnce(categories);
      const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });
      expect(wrapper.vm.displayedCategory).toBe(23);
    });
  });

  describe('filteredItems', () => { 
    const items = [
      {id: 1, name: 'item1', supplier: {id: 1}, category: {id: 1}},
      {id: 2, name: 'item2', supplier: {id: 1}, category: {id: 2}},
      {id: 3, name: 'item3', supplier: {id: 2}, category: {id: 1}},
      {id: 4, name: 'item4', supplier: {id: 2}, category: {id: 2}},
    ];
    const categories = [
      {id: 1},
      {id: 2}
    ];

    it('by default it should display all the items.', () => {
      const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });
      wrapper.setData({items});

      expect(wrapper.vm.filteredItems).toEqual(items);
    });

    it('should filter by supplier if it is selected.', () => {
      const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });
      wrapper.setData({
        items,
        displayedSupplier: 1
      });
      
      expect(wrapper.vm.filteredItems).toEqual([items[0], items[1]]);
    });

    it('should filter by category if it is selected.', () => {
      getters.indexedCategories.mockReturnValueOnce(categories);
      
      const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });
      wrapper.setData({
        items,
        displayedCategory: 1
      });
      
      expect(wrapper.vm.filteredItems).toEqual([items[0], items[2]]);
    });

    it('should filter by name.', () => {
      const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });
      wrapper.setData({
        items,
        searchText: 'item2'
      });
      
      expect(wrapper.vm.filteredItems).toEqual([items[1]]);
    });

    it('should filter by supplier, category and name.', () => {
      getters.indexedCategories.mockReturnValueOnce(categories);
      const wrapper = shallowMount(DisplayItem, { store, localVue, mocks: mocksRouter, stubs });
      wrapper.setData({
        items,
        displayedCategory: 2,
        displayedSupplier: 2,
        searchText: 'item'
      });
      
      expect(wrapper.vm.filteredItems).toEqual([items[3]]);
    });

  });
});
