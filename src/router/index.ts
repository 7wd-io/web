import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useAccountStore } from 'src/stores/account';

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === 'history'
  ? createWebHistory
  : createWebHashHistory;

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(process.env.VUE_ROUTER_BASE),
});

router.beforeEach(async (to) => {
  const account = useAccountStore();
  const isPublic = to.meta.public || false;

  if (isPublic) {
    return true;
  }

  if (account.isLoggedIn) {
    return true;
  }

  try {
    await account.refreshSession();

    return true;
  } catch (error) {
    return { name: 'welcome' };
  }
});

export default router;
