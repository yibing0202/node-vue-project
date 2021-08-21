import Vue from 'vue'
import VueRouter from 'vue-router'
const Main = () => import('../views/main.vue')
const CategoryEdit = () => import('../views/main/CategoryEdit.vue')
const CategoryList = () => import('../views/main/CategoryList.vue')
const ItemEdit = () => import('../views/main/ItemEdit.vue')
const ItemList = () => import('../views/main/ItemList.vue')
const HeroEdit = () => import('../views/main/HeroEdit.vue')
const HeroList = () => import('../views/main/HeroList.vue')
const ArticleEdit = () => import('../views/main/ArticleEdit.vue')
const ArticleList = () => import('../views/main/ArticleList.vue')
const AdEdit = () => import('../views/main/AdEdit.vue')
const AdList = () => import('../views/main/AdList.vue')
const AdminUserEdit = () => import('../views/main/AdminUserEdit.vue')
const AdminUserList = () => import('../views/main/AdminUserList.vue')
const VideoEdit = () => import('../views/main/VideoEdit.vue')
const VideoList = () => import('../views/main/VideoList.vue')
const Login = () => import('../views/main/login.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    meta: {isPublic: true}
  },
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: Main,
    children: [
      {
        path: '/category/new',
        component: CategoryEdit
      },
      {
        path: '/category/list',
        component: CategoryList
      },
      {
        path: '/category/new/:id',
        component: CategoryEdit,
        props: true
      },
      {
        path: '/items/new',
        component: ItemEdit
      },
      {
        path: '/items/list',
        component: ItemList
      },
      {
        path: '/items/new/:id',
        component: ItemEdit,
        props: true
      },
      {
        path: '/heroes/new',
        component: HeroEdit
      },
      {
        path: '/heroes/list',
        component: HeroList
      },
      {
        path: '/heroes/new/:id',
        component: HeroEdit,
        props: true
      },
      {
        path: '/articles/new',
        component: ArticleEdit
      },
      {
        path: '/articles/list',
        component: ArticleList
      },
      {
        path: '/articles/new/:id',
        component: ArticleEdit,
        props: true
      },
      {
        path: '/ads/new',
        component: AdEdit
      },
      {
        path: '/ads/list',
        component: AdList
      },
      {
        path: '/ads/new/:id',
        component: AdEdit,
        props: true
      },
      {
        path: '/admin_user/new',
        component: AdminUserEdit
      },
      {
        path: '/admin_user/list',
        component: AdminUserList
      },
      {
        path: '/admin_user/new/:id',
        component: AdminUserEdit,
        props: true
      },
      {
        path: '/videos/new',
        component: VideoEdit
      },
      {
        path: '/videos/list',
        component: VideoList
      },
      {
        path: '/videos/new/:id',
        component: VideoEdit,
        props: true
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router
