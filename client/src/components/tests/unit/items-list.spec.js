import { shallowMount, createLocalVue } from '@vue/test-utils';
import ItemService from '@/services/items';
import ItemsList from '@/components/ItemsList';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.directive('lazy', {});

jest.mock('@/services/items', () => {
  return {
      getItems: jest.fn().mockResolvedValue([])
  };
});

const mocks = {
  $route: {
    params: {}
  }
};

const indexedCategories = [
  { id: 1, name: 'name-1', url: 'url-1', subcategories: [
    { id: 11, name: 'name-11', url: 'url-11', subcategories: []},
    { id: 12, name: 'name-12', url: 'url-12', subcategories: [
      { id: 121, name: 'name-121', url: 'url-121' }
    ]}
  ]}
];

const categories = [
  { id: 1, name: 'name-1', url: 'url-1' },
  { id: 11, name: 'name-11', url: 'url-11' },
  { id: 12, name: 'name-12', url: 'url-12' },
  { id: 121, name: 'name-121', url: 'url-121' }
];

describe('ItemsList.vue', () => {
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    mocks.$route.params = {};

    getters = {
      indexedCategories: jest.fn()
    };

    actions = {
      setCurrentCategory: jest.fn()
    };

    store = new Vuex.Store({
      actions,
      getters
    })
  });
  
  it('should be empty if there is no category selected.', () => {
    getters.indexedCategories.mockReturnValue([{}]);

    const wrapper = shallowMount(ItemsList, { store, localVue, mocks });
    expect(wrapper.text()).toBe('');
  });

  it('should have a title and correct category structure if there is a category selected.', () => {
    getters.indexedCategories.mockReturnValue(indexedCategories);
    mocks.$route.params = { url: 'url-1' };

    const wrapper = shallowMount(ItemsList, { store, localVue, mocks });

    const title = wrapper.find('h1.title');
    expect(title.text().replace(/\s/g,'')).toBe('name-1');

    const firstLevelCategories = wrapper.findAll('h2.title');
    expect(firstLevelCategories.length).toBe(2);
    expect(firstLevelCategories.at(0).text().replace(/\s/g,'')).toEqual('name-11');
    expect(firstLevelCategories.at(1).text().replace(/\s/g,'')).toEqual('name-12');
    
    const secondLevelCategories = wrapper.findAll('h3.title');
    expect(secondLevelCategories.length).toBe(1);
    expect(secondLevelCategories.at(0).text().replace(/\s/g,'')).toEqual('name-121');
  });

  it('should have a correct items inside each category.', (done) => {
    getters.indexedCategories.mockReturnValue(indexedCategories);
    mocks.$route.params = { url: 'url-1' };

    const items = {
      data: [
        { id: 1, name: 'item-1', category: { id: 1}},
        { id: 12, name: 'item-12', category: { id: 12}},
        { id: 121, name: 'item-121', category: { id: 121}},
        { id: 122, name: 'item-122', category: { id: 121}}
      ]
    };

    ItemService.getItems.mockResolvedValue(items);

    const wrapper = shallowMount(ItemsList, { store, localVue, mocks });
    wrapper.vm.$nextTick(() => {
      const itemList1 = wrapper.findAll('div.items-list-page > div.item-list > div.item-list__item');
      expect(itemList1.length).toBe(1);
      expect(itemList1.at(0).text().replace(/\s/g,'')).toBe('item-1');

      const itemList2 = wrapper.findAll('div.items-list-page > div > div.item-list > div.item-list__item');
      expect(itemList2.length).toBe(1);
      expect(itemList2.at(0).text().replace(/\s/g,'')).toBe('item-12');

      const itemList3 = wrapper.findAll('div.items-list-page > div > div > div.item-list > div.item-list__item');
      expect(itemList3.length).toBe(2);
      expect(itemList3.at(0).text().replace(/\s/g,'')).toBe('item-121');
      expect(itemList3.at(1).text().replace(/\s/g,'')).toBe('item-122');

      done();
    });
  });
});
