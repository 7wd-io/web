import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAccountStore } from 'stores/account';
import { Notify } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: process.env.SWD_API_URL,
  withCredentials: true,
});

const publicEndpoints = [
  '/api/ping',
  '/api/account/signup',
  '/api/account/signin',
  '/api/account/refresh',
];

interface Headers {
  [index: string]: string;

  Authorization: string;
}

export type ApiError = AxiosError<{ err: string }>;

export default boot(({ app, redirect }) => {
  const account = useAccountStore();

  api.interceptors.request.use(async (config) => {
    if (config.baseURL && config.url) {
      const path = new URL(config.baseURL + config.url).pathname;

      if (publicEndpoints.indexOf(path) === -1) {
        // use sensible interval gap to avoid expiration during request call
        if (account.exp - 3 < Math.floor(Date.now() / 1000)) {
          await account.refreshSession();
        }

        (config.headers as Headers).Authorization = `Bearer ${account.token()}`;
      }
    }

    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error: ApiError) => {
      const status = error.response?.status;

      if (!status) {
        return Promise.reject(error);
      }

      if (status === 404) {
        return redirect({ name: 'error404' });
      }

      if (status === 500) {
        Notify.create({
          message: error.response?.data.err || 'Something went wrong',
          type: 'negative',
        });
      }

      return Promise.reject(error);
    }
  );

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
