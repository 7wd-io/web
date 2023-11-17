import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import { User, Session } from 'src/models/account';
import { api } from 'boot/axios';
import { Cookies } from 'quasar';
import $router from 'src/router';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useRooms } from 'stores/rooms';

const sessionCookie = 'refresh_token';

export const useAccountStore = defineStore('account', {
  state: () => ({
    user: {} as User,
    fingerprint: '',
    token: (): string => '',
  }),
  getters: {
    isLoggedIn: (state) => state.token() !== '',
    hasRoom(state) {
      const $rooms = useRooms();

      return $rooms.rooms.some(
        (room) =>
          state.user.nickname === room.host ||
          state.user.nickname === room.guest
      );
    },
  },
  actions: {
    parseToken(token: string) {
      this.user = jwtDecode<User>(token);
      this.token = () => token;
    },
    async signin(login: string, password: string) {
      const { data } = await api.post<Session>('/account/signin', {
        login,
        password,
        fingerprint: this.fingerprint,
      });

      Cookies.set(sessionCookie, data.refreshToken, {
        domain: process.env.SWD_HOST,
        path: '/',
        sameSite: 'None',
        secure: true,
        expires: 30,
      });

      this.parseToken(data.accessToken);

      await $router.push({ name: 'lobby' });
    },
    async signup(email: string, password: string, nickname: string) {
      await api.post('/account/signup', {
        email,
        password,
        nickname,
      });

      await this.signin(email, password);
    },

    async logout() {
      await api.post('/account/logout', {
        fingerprint: this.fingerprint,
      });

      Cookies.remove(sessionCookie);

      window.open('/', '_self');
    },
    async refreshSession() {
      const { data } = await api.post<Session>('/account/refresh', {
        fingerprint: this.fingerprint,
        refresh_token: Cookies.get(sessionCookie),
      });

      Cookies.set(sessionCookie, data.refreshToken, {
        domain: process.env.SWD_HOST,
        path: '/',
        sameSite: 'None',
        secure: true,
        expires: 30,
      });

      this.parseToken(data.accessToken);
    },
    async getFingerprint() {
      const fpPromise = FingerprintJS.load();
      const fp = await fpPromise;
      const result = await fp.get();

      this.$patch({
        fingerprint: result.visitorId,
      });
    },
  },
});
