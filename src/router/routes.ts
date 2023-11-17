import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/PlayerLayout.vue'),
    children: [
      {
        path: '/game/:id',
        name: 'game',
        component: () => import('pages/GamePage.vue'),
      },
      {
        path: '',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          {
            path: '',
            name: 'lobby',
            component: () => import('pages/LobbyPage.vue'),
          },
          {
            path: '/faq',
            name: 'faq',
            component: () => import('pages/FaqPage.vue'),
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
        component: () => import('pages/WelcomePage.vue'),
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          public: true,
        },
        component: () => import('pages/AboutPage.vue'),
      },
      {
        path: '/register',
        name: 'register',
        meta: {
          public: true,
        },
        component: () => import('pages/RegisterPage.vue'),
      },
      {
        path: '/login',
        name: 'login',
        meta: {
          public: true,
        },
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/units',
    name: 'units',
    meta: {
      public: true,
    },
    component: () => import('pages/UnitsPage.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
