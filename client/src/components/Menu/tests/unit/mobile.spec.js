import { shallowMount } from '@vue/test-utils';
import Mobile from '@/components/Menu/Mobile';

const mocks = {
  $emit: jest.fn(),
  $router: {
    push: jest.fn()
  }
};

describe('Menu - Mobile.vue', () => {
  it('should contain the logo, and when clicked should navigate to the main page.', () => {
    const wrapper = shallowMount(Mobile, { mocks });
    
    const logo = wrapper.find('div.menu-logo');
    expect(logo.exists()).toBe(true);

    expect(mocks.$router.push).not.toBeCalled();
    logo.trigger('click');
    expect(mocks.$router.push).toBeCalledWith({ name: 'MainPage' });
  });

  it('should contain the hamburger icon, and when clicked should show the sidebar.', () => {
    const wrapper = shallowMount(Mobile, { mocks });
    
    const hamburger = wrapper.find('div.menu-button');
    expect(hamburger.exists()).toBe(true);

    expect(mocks.$emit).not.toBeCalled();
    hamburger.trigger('click');
    expect(mocks.$emit).toBeCalledWith('showSidebar');
  });
});
