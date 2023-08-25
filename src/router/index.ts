import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

type RouteCustom = RouteRecordRaw & {
  hidden?: boolean
  children?: RouteCustom[]
  meta?: { title?: string; icon?: string }
}

const routes: Array<RouteCustom> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'routes.dashboard.dashboard.title', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'routes.example.title', icon: 'example', permission: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index.vue'),
        meta: { title: 'routes.example.table.title', icon: 'table', permission: 'example:table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index.vue'),
        meta: { title: 'routes.example.tree.title', icon: 'tree', permission: 'example:tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index.vue'),
        meta: { title: 'routes.form.form.title', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'routes.nested.title',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'routes.nested.menu1.title' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: { title: 'routes.nested.menu1.menu1_1.title' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
            name: 'Menu1-2',
            meta: { title: 'routes.nested.menu1.menu1_2.title' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'Menu1-2-1',
                meta: { title: 'routes.nested.menu1.menu1_2.menu1_2_1.title' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'Menu1-2-2',
                meta: { title: 'routes.nested.menu1.menu1_2.menu1_2_2.title' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
            name: 'Menu1-3',
            meta: { title: 'routes.nested.menu1.menu1_3.title' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index.vue'),
        name: 'Menu2',
        meta: { title: 'routes.nested.menu2.title' }
      }
    ]
  },

  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'routes.externalLink.externalLink.title', icon: 'link' },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        component: () => {}
      }
    ]
  },

  {
    path: '/tests',
    component: Layout,
    redirect: '/tests/test',
    children: [
      {
        path: 'test',
        name: 'Test1',
        component: () => import('@/views/tests/index.vue'),
        meta: { title: 'routes.tests.test1.title', icon: 'valid_code' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    meta: { title: 'routes.system.title', icon: 'system' },
    redirect: '/system/settings',
    children: [
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/system/settings/index.vue'),
        meta: { title: 'routes.system.settings.title', icon: 'system' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {
    path: '/:catchAll(.*)', // 使用正则表达式捕获所有路由
    redirect: '/404',
    hidden: true
  }
]
const $createRouter = () => {
  return createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    strict: false,
    // 刷新时，滚动条位置还原
    scrollBehavior: () => ({ left: 0, top: 0 })
  })
}

const router = $createRouter()

export function resetRouter() {
  // router = $createRouter();
  router.replace({ path: '/login' }).then()
}

export default router
