import { shallowMount, createLocalVue } from '@vue/test-utils';
import Login from '@/components/Login';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

const mocks = {
  $t: key => key,
  $auth: {
    login: jest.fn()
  }
};

describe('Login.vue', () => {
  it('Contains a form to login.', () => {
    const wrapper = shallowMount(Login, { localVue, mocks });
    
    const errorDiv = wrapper.find('div.alert');
    expect(errorDiv.exists()).toBeFalsy();

    const form = wrapper.find(ElementUI.Form);
    expect(form.exists()).toBeTruthy();
  });

  it('Contains an error div if there has been an error', () => {
    const wrapper = shallowMount(Login, { localVue, mocks });
    
    wrapper.setData({
      error: true
    });

    const errorDiv = wrapper.find('div.alert');
    expect(errorDiv.exists()).toBeTruthy();
  });

  it('Calls tries to login via $auth.', () => {
    const wrapper = shallowMount(Login, { localVue, mocks });

    wrapper.setData({
      email: 'mail',
      password: 'pass'
    });
    
    wrapper.vm.login();
    expect(mocks.$auth.login).toBeCalled();
    expect(mocks.$auth.login.mock.calls[0][0].data).toEqual({ email: 'mail', password: 'pass' });
  });
});
