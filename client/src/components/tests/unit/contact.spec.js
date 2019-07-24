import { shallowMount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Contact from '@/components/Contact';

const localVue = createLocalVue();
localVue.directive('popover', {});
localVue.use(ElementUI);

jest.mock('@/services/contact', () => ({
  sendMail: jest.fn(),
}));

const mocks = {
  $t: key => key,
};

const stubs = {
  'gmap-map': true,
  'gmap-marker': true,
};

describe('Contact.vue', () => {
  it('Contains a form to send a message to the owner.', () => {
    const wrapper = shallowMount(Contact, { localVue, mocks, stubs });

    const h1 = wrapper.find('h1');
    expect(h1.text()).toBe('main.contact');

    const items = wrapper.findAll(ElementUI.FormItem);
    expect(items.length).toBe(5);
    expect(items.at(0).props().label).toBe('main.message_name');
    expect(items.at(1).props().label).toBe('main.message_phone');
    expect(items.at(2).props().label).toBe('main.message_mail');
    expect(items.at(3).props().label).toBe('main.message_message');
    expect(items.at(4).text()).toBe('main.send');
  });

  it('The button to send message is disabled if name, mail or content are empty.', () => {
    const wrapper = shallowMount(Contact, { localVue, mocks, stubs });

    const button = wrapper.find(ElementUI.Button);
    expect(button.props().disabled).toBeTruthy();

    // All but name.
    wrapper.setData({
      message: {
        name: undefined,
        mail: 'aa@gmail.com',
        content: 'content',
      },
    });
    expect(button.props().disabled).toBeTruthy();

    // All but mail.
    wrapper.setData({
      message: {
        name: 'name',
        mail: undefined,
        content: 'content',
      },
    });
    expect(button.props().disabled).toBeTruthy();

    // All but content.
    wrapper.setData({
      message: {
        name: 'name',
        mail: 'aa@gmail.com',
        content: undefined,
      },
    });
    expect(button.props().disabled).toBeTruthy();

    // All.
    wrapper.setData({
      message: {
        name: 'name',
        mail: 'aa@gmail.com',
        content: 'content',
      },
    });
    expect(button.props().disabled).toBeFalsy();
  });

  it('sets up the mailto correctly.', () => {
    const wrapper = shallowMount(Contact, { localVue, mocks, stubs });
    const mailTo = wrapper.find('a');
    expect(mailTo.text()).toBe('main.contact_mail');
    expect(mailTo.attributes().href).toBe('mailto:main.contact_mail');
  });
});
