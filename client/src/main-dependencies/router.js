import VueRouter from 'vue-router'

const DisplayItem = () => import(/* webpackChunkName: "admin" */ '../components/Admin/Item/DisplayItem.vue')
const EditItem = () => import(/* webpackChunkName: "admin" */ '../components/Admin/Item/EditItem.vue')
const DisplayCategory = () => import(/* webpackChunkName: "admin" */ '../components/Admin/Category/DisplayCategory.vue')
const EditCategory = () => import(/* webpackChunkName: "admin" */ '../components/Admin/Category/EditCategory.vue')
const DisplaySupplier = () => import(/* webpackChunkName: "admin" */ '../components/Admin/Supplier/DisplaySupplier.vue')
const EditSupplier = () => import(/* webpackChunkName: "admin" */ '../components/Admin/Supplier/EditSupplier.vue')
const HomeImages = () => import(/* webpackChunkName: "admin" */ '../components/Admin/HomeImages.vue')

const Register = () => import(/* webpackChunkName: "user" */ '../components/Register.vue')
const Login = () => import(/* webpackChunkName: "user" */ '../components/Login.vue')

const MainPage = () => import(/* webpackChunkName: "main" */ '../components/MainPage.vue')
const ItemsList = () => import(/* webpackChunkName: "main" */ '../components/ItemsList.vue')

const Contact = () => import(/* webpackChunkName: "contact" */ '../components/Contact.vue')

const routes = [
  {
    name: 'CreateItem',
    path: '/edit/:category',
    component: EditItem,
  },
  {
    name: 'DisplayItem',
    path: '/admin',
    component: DisplayItem,
    meta: {
      auth: true,
    },
  },
  {
    name: 'EditItem',
    path: '/edit/:category/:id',
    component: EditItem,
    meta: {
      auth: true,
    },
  },
  {
    name: 'DisplayCategory',
    path: '/admin_categories',
    component: DisplayCategory,
    meta: {
      auth: true,
    },
  },
  {
    name: 'CreateCategory',
    path: '/categories/',
    component: EditCategory,
    meta: {
      auth: true,
    },
  },
  {
    name: 'EditCategory',
    path: '/categories/:id',
    component: EditCategory,
    meta: {
      auth: true,
    },
  },
  {
    name: 'DisplaySupplier',
    path: '/admin_suppliers',
    component: DisplaySupplier,
    meta: {
      auth: true,
    },
  },
  {
    name: 'CreateSupplier',
    path: '/suppliers/',
    component: EditSupplier,
    meta: {
      auth: true,
    },
  },
  {
    name: 'EditSupplier',
    path: '/suppliers/:id',
    component: EditSupplier,
    meta: {
      auth: true,
    },
  },
  {
    name: 'HomeImages',
    path: '/admin_home_images',
    component: HomeImages,
    meta: {
      auth: true,
    },
  },
  {
    name: 'MainPage',
    path: '/',
    component: MainPage,
  },
  {
    name: 'Contact',
    path: '/contact',
    component: Contact,
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
    meta: {
      auth: false,
    },
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      auth: false,
    },
  },
  {
    name: 'ItemsList',
    path: '/products/:url',
    component: ItemsList,
  },
  {
    path: '*',
    redirect: { name: 'MainPage' },
  },
]

function initRouter(Vue) {
  /* eslint-disable-next-line no-multi-assign, no-param-reassign */
  Vue.router = global.router = new VueRouter({
    mode: 'history',
    routes,
  })
}

export default initRouter
