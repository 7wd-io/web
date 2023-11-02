import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/PlayerLayout.vue'),
    children: [
      {
        path: '/game/:id',
        name: 'game',
        component: () => import('pages/Game.vue'),
      },
      {
        path: '',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'lobby',
            component: () => import('pages/Lobby.vue'),
          },
          {
            path: '/faq',
            name: 'faq',
            component: () => import('pages/Faq.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        meta: {
          public: true,
        },
        component: () => import('pages/Welcome.vue'),
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          public: true,
        },
        component: () => import('pages/About.vue'),
      },
      {
        path: '/register',
        name: 'register',
        meta: {
          public: true,
        },
        component: () => import('pages/Register.vue'),
      },
      {
        path: '/login',
        name: 'login',
        meta: {
          public: true,
        },
        component: () => import('pages/Login.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'lobby',
        component: () => import('pages/Lobby.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        meta: {
          public: true,
        },
        component: () => import('pages/Welcome.vue'),
      },
      {
        path: '/register',
        name: 'register',
        meta: {
          public: true,
        },
        component: () => import('pages/Register.vue'),
      },
      {
        path: '/login',
        name: 'login',
        meta: {
          public: true,
        },
        component: () => import('pages/Login.vue'),
      },
    ],
  },
  {
    path: '/units',
    name: 'units',
    meta: {
      public: true,
    },
    component: () => import('pages/Units.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
