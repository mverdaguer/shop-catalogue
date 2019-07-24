import RouterLink from '@/test/utils/router-link.mock';

const createCategoryProp = (id) => {
  return {
    to: {
      name: 'ItemsList',
      params: {
        url: `url-${id}`
      }
    }
  };
}

export default {
  contactTestCorrectText(wrapper) {
    const result = 'main.contact';
    expect(wrapper.text().replace(/\s/g,'')).toBe(result);
  },

  contactTestNavigation(wrapper) {
    const props = wrapper.find(RouterLink).props();
    expect(props.to.name).toBeDefined();
    expect(props.to.name).toBe("Contact");
  },

  loggedInCorrectText(wrapper) {
    const result = 'main.contactmain.adminmain.logout';
    expect(wrapper.text().replace(/\s/g,'')).toBe(result);
  },

  loggedInNavigationToAdmin(wrapper) {
    const props = wrapper.findAll(RouterLink).at(1).props();
    expect(props.to.name).toBeDefined();
    expect(props.to.name).toBe("DisplayItem");
  },

  loggedInLogout(wrapper, mocks) {
    const aLinks = wrapper.findAll('a');
    expect(aLinks.length).toBe(1);
    
    expect(mocks.$auth.logout).not.toBeCalled();
    aLinks.at(aLinks.length - 1).trigger('click');
    expect(mocks.$auth.logout).toBeCalled();
  },

  categoriesCreatesRouterLinks() {
    return {
      mockCategoriesGetter(categoriesGetter) {
        const categories = [
          { id: 1, name: 'name-1', url: 'url-1', subcategories: [] },
          { id: 2, name: 'name-2', url: 'url-2', subcategories: [] }
        ];
    
        categoriesGetter.mockReturnValue(categories);
      },

      testWrapper(wrapper) {
        const categoriesWrappers = wrapper.findAll(RouterLink);

        expect(categoriesWrappers.length).toBe(3);
        expect(categoriesWrappers.at(0).props()).toEqual(createCategoryProp(1));
        expect(categoriesWrappers.at(1).props()).toEqual(createCategoryProp(2));
        const result = 'name-1name-2main.contact';
        expect(wrapper.text().replace(/\s/g,'')).toBe(result);
      }
    }
  },

  categoriesCreatesSubcategoriesRouterLinks() {
    return {
      mockCategoriesGetter(categoriesGetter) {
        const categories = [
          { id: 1, name: 'name-1', url: 'url-1', subcategories: [
            { id: 11, name: 'name-11', url: 'url-11', subcategories: []},
            { id: 12, name: 'name-12', url: 'url-12', subcategories: [
              { id: 121, name: 'name-121', url: 'url-121'}
            ]}
          ]}
        ];
    
        categoriesGetter.mockReturnValue(categories);
      },

      testWrapper(wrapper) {
        const categoriesWrappers = wrapper.findAll(RouterLink);
    
        expect(categoriesWrappers.length).toBe(5);
        expect(categoriesWrappers.at(0).props()).toEqual(createCategoryProp(1));
        expect(categoriesWrappers.at(1).props()).toEqual(createCategoryProp(11));
        expect(categoriesWrappers.at(2).props()).toEqual(createCategoryProp(12));
        expect(categoriesWrappers.at(3).props()).toEqual(createCategoryProp(121));
        const result = 'name-1name-11name-12name-121main.contact';
        expect(wrapper.text().replace(/\s/g,'')).toBe(result);
      }
    }
  }
};