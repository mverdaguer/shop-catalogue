const RouterLink = {
  name: 'router-link',
  render: function (h) {
    return h('div', this.$slots.default)
  },
  props: ['to']
};

export default RouterLink;