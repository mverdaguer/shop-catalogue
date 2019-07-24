import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Register from '@/components/Register';
import ElementUI from 'element-ui';
import RouterLink from '@/test/utils/router-link.mock';

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(VueRouter);
const router = new VueRouter();

const mocks = {
  $t: key => key,
  $auth: {
    register: jest.fn()
  }
};

const stubs = {
  RouterLink
};

describe('Register.vue', () => {
  it('Contains a form to login.', () => {
    const wrapper = shallowMount(Register, { localVue, mocks });
    
    const errorDiv = wrapper.find('div.alert');
    expect(errorDiv.exists()).toBeFalsy();

    const form = wrapper.find(ElementUI.Form);
    expect(form.exists()).toBeTruthy();
  });

  it('Contains an error div if there has been an error', () => {
    const wrapper = shallowMount(Register, { localVue, mocks });
    
    wrapper.setData({
      error: true
    });

    const errorDiv = wrapper.find('div.alert.alert-danger');
    expect(errorDiv.exists()).toBeTruthy();
    expect(errorDiv.text()).toBe('main.register_error');
  });

  it('Contains an alert success div if the register has worked properly', () => {
    const wrapper = shallowMount(Register, { localVue, mocks, router, stubs });
    
    wrapper.setData({
      success: true
    });

    const successDiv = wrapper.find('div.alert.alert-success');
    expect(successDiv.exists()).toBeTruthy();
    expect(successDiv.text().replace(/\s/g,'')).toBe('main.register_successmain.login');
    
    const props = wrapper.find(RouterLink).props();
    expect(props.to.name).toBeDefined();
    expect(props.to.name).toBe("Login");
  });

  it('Calls tries to register via $auth.', () => {
    const wrapper = shallowMount(Register, { localVue, mocks });

    wrapper.setData({
      name: 'name',
      email: 'email',
      password: 'password'
    });
    
    wrapper.vm.register();
    expect(mocks.$auth.register).toBeCalled();
    expect(mocks.$auth.register.mock.calls[0][0].params).toEqual({ email: 'email', password: 'password', name: 'name' });
  });
});
