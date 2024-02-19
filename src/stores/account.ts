import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import { User, Session, Settings, Nickname } from 'src/models/account';
import { api } from 'boot/axios';
import { Cookies } from 'quasar';
import $router from 'src/router';
import { useRoomsStore } from 'stores/rooms';
import { GamesReport, Profile } from 'src/models/profile';
import { v4 as uuidv4 } from 'uuid';

const sessionCookie = 'refresh_token';
const clientCookie = 'client';

export const useAccountStore = defineStore('account', {
  state: () => ({
    user: {} as User,
    token: (): string => '',
  }),
  getters: {
    isLoggedIn: (state) => state.token() !== '',
    hasRoom(state) {
      const $rooms = useRoomsStore();

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
        client: this.getClient(),
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
        client: this.getClient(),
      });

      Cookies.remove(sessionCookie);

      window.open('/', '_self');
    },

    async refreshSession() {
      const { data } = await api.post<Session>('/account/refresh', {
        client: this.getClient(),
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

    getClient() {
      if (!Cookies.has(clientCookie)) {
        Cookies.set(clientCookie, uuidv4(), {
          domain: process.env.SWD_HOST,
          path: '/',
          sameSite: 'None',
          secure: true,
          expires: 30,
        });
      }

      return Cookies.get(clientCookie);
    },

    async updateSettings(s: Settings) {
      await api.put('/account/settings', {
        animationSpeed: s.game.animationSpeed,
        opponentJoined: s.sounds.opponentJoined,
        myTurn: s.sounds.myTurn,
      });

      this.user.settings = s;
    },

    async getProfile(user: Nickname) {
      return await api.get<{ profile: Profile }>(`/account/${user}`);
    },

    async getProfileVersus(user: Nickname) {
      return await api.get<{ profile: GamesReport }>(
        `account/${this.user.nickname}/vs/${user}`
      );
    },
  },
});
