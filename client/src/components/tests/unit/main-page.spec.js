import { shallowMount, createLocalVue } from '@vue/test-utils';
import HomeService from '@/services/home';
import MainPage from '@/components/MainPage';
import Vuex from 'vuex';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ElementUI);

jest.mock('@/services/home', () => {
  return {
    getImages: jest.fn().mockResolvedValue([])
  };
});

const mocks = {
  $t: key => key
};

describe('MainPage.vue', () => {
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      allCategories: jest.fn()
    };

    actions = {
      setCurrentCategory: jest.fn()
    };

    store = new Vuex.Store({
      actions,
      getters
    })
  });
  
  it('Should contain proper texts.', () => {
    const wrapper = shallowMount(MainPage, { store, localVue, mocks });

    const h1 = wrapper.find('h1');
    expect(h1.text()).toBe('main.brand_name');

    const ps = wrapper.findAll('div.main-page__container__info > p');
    expect(ps.length).toBe(3);
    expect(ps.at(0).text()).toBe('main.main1');
    expect(ps.at(1).text()).toBe('main.main2');
    expect(ps.at(2).text()).toBe('main.main3');
  });

  it('Should contain proper carousel items.', (done) => {
    HomeService.getImages.mockResolvedValue({data: ['img1', 'img2'] });
    const wrapper = shallowMount(MainPage, { store, localVue, mocks });

    wrapper.vm.$nextTick(() => {
      const carouselItems = wrapper.findAll(ElementUI.CarouselItem);
      expect(carouselItems.length).toBe(2);

      const imgs = wrapper.findAll('img.img-responsive');
      expect(imgs.length).toBe(2);
      expect(imgs.at(0).attributes().src).toBe('baseurl/images/home/img1');
      expect(imgs.at(1).attributes().src).toBe('baseurl/images/home/img2');
      done();
    });
  });
});
