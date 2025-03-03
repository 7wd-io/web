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
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: '404',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
