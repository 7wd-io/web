import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAccountStore } from 'stores/account';

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
  '/ping',
  '/account/signup',
  '/account/signin',
  '/account/refresh',
];

interface Headers {
  [index: string]: string;

  Authorization: string;
}

export type ApiError = AxiosError<{ err: string }>;

export default boot(({ app, redirect }) => {
  const account = useAccountStore();
  // for use inside Vue files (Options API) through this.$axios and this.$api

  api.interceptors.request.use((config) => {
    if (config.baseURL && config.url) {
      const path = new URL(config.baseURL + config.url).pathname;

      if (publicEndpoints.indexOf(path) === -1) {
        (config.headers as Headers).Authorization = `Bearer ${account.token()}`;
      }
    }

    // @TODO решить проблему открытого окна приложения
    // токен протух, на страницу мы никуда не переходили, boot не срабатывал
    // рефрешеа аккаунта не было, будет выполнен запрос с протухшим токеном и статус 401
    //
    // Решение:
    // можно при получении токена писать время когда он был получен
    // и перед любым запросом чекать время, если протухло делать рефреш перед основным запросом
    // Также добавить проверку в интерсептор ответа на получение 401 и пробовать делать рефрешь

    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const status = error.response?.status;

      if (!status) {
        return Promise.reject(error);
      }

      // if (status == 401) {
      //   try {
      //     await account.refreshSession();
      //
      //     // return Promise
      //     return true;
      //   } catch (error) {
      //     return redirect({ name: 'login' });
      //   }
      // }

      if (status === 404) {
        return redirect({ name: 'error404' });
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
