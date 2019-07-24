import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import HomeService from '@/services/home';
import HomeImages from '@/components/Admin/HomeImages';
import RouterLink from '@/test/utils/router-link.mock';

jest.mock('@/services/home', () => {
  return {
    getImages: jest.fn().mockResolvedValue([]),
    deleteImage: jest.fn().mockResolvedValue({}),
    addImage: jest.fn().mockResolvedValue({})
  };
});

const router = new VueRouter();

const mocks = {
  $t: key => key
};

const stubs = {
  RouterLink
};

describe('HomeImages.vue', () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);
    localVue.use(VueRouter);
  })

  it('should contain links to items, suppliers and categories admin zones.', () => {
    const wrapper = shallowMount(HomeImages, { localVue, router, mocks, stubs });

    const links = wrapper.findAll(RouterLink);
    expect(links.length).toBe(3);
    expect(links.at(0).props().to).toBeDefined();
    expect(links.at(0).props().to).toBe("/admin");
    expect(links.at(1).props().to).toBeDefined();
    expect(links.at(1).props().to).toBe("/admin_suppliers");
    expect(links.at(2).props().to).toBeDefined();
    expect(links.at(2).props().to).toBe("/admin_categories");
  });

  it('should contain a button to add an image.', () => {
    const wrapper = shallowMount(HomeImages, { localVue, router, mocks });

    const buttons = wrapper.findAll(ElementUI.Button);
    expect(buttons.length).toBe(5);
    expect(buttons.at(0).text()).toBe('main.home_add_image');
  });

  it('should contain a table containing each home image (empty).', () => {
    const wrapper = shallowMount(HomeImages, { localVue, router, mocks });

    const table = wrapper.find(ElementUI.Table);
    expect(table.props().data).toEqual([]);

    const tableColumns = wrapper.findAll(ElementUI.TableColumn);
    expect(tableColumns.length).toBe(2);
    expect(tableColumns.at(0).props().label).toBe('main.image');
  });

  it('should contain a table containing each home image (filled).', () => {
    const homeImages = [ "img1", "img2" ];
    
    const wrapper = shallowMount(HomeImages, { localVue, router, mocks });
    wrapper.setData({images: homeImages});
    
    const table = wrapper.find(ElementUI.Table);
    expect(table.props().data).toEqual(homeImages);
  });

  describe('deleteImage', () => { 
    it('should do nothing if removing image is not defined.', () => {
      const wrapper = shallowMount(HomeImages, { localVue, mocks });
    
      wrapper.vm.deleteImage();
      expect(HomeService.deleteImage).not.toHaveBeenCalled();
    });

    it('should remove the selected image.', () => {
      const wrapper = shallowMount(HomeImages, { localVue, mocks });
      wrapper.setData({
        removingImage: "img1",
        images: [ "img1", "img2" ]
      });
    
      wrapper.vm.deleteImage();
      expect(HomeService.deleteImage).toHaveBeenCalledWith("img1");
    });
  });

  it('createImage - should call the service to create an image.', () => {
    const wrapper = shallowMount(HomeImages, { localVue, mocks });
  
    wrapper.vm.createImage();
    expect(HomeService.addImage).toHaveBeenCalled();
  });
});
