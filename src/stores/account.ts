import { ref, computed } from 'vue';
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

export const useAccountStore = defineStore('account', () => {
  const user = ref({} as User);
  const token = ref((): string => '');

  const isLoggedIn = computed(() => token.value() !== '');
  const hasRoom = computed(() => {
    const $rooms = useRoomsStore();

    return $rooms.rooms.some(
      (room) =>
        user.value.nickname === room.host || user.value.nickname === room.guest
    );
  });

  function parseToken(token_: string) {
    user.value = jwtDecode<User>(token_);
    token.value = () => token_;
  }

  function getClient() {
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
  }

  async function signin(login: string, password: string) {
    const { data } = await api.post<Session>('/account/signin', {
      login,
      password,
      client: getClient(),
    });

    Cookies.set(sessionCookie, data.refreshToken, {
      domain: process.env.SWD_HOST,
      path: '/',
      sameSite: 'None',
      secure: true,
      expires: 30,
    });

    parseToken(data.accessToken);

    await $router.push({ name: 'lobby' });
  }

  async function logout() {
    await api.post('/account/logout', {
      client: getClient(),
    });

    Cookies.remove(sessionCookie);

    window.open('/', '_self');
  }

  async function refreshSession() {
    const { data } = await api.post<Session>('/account/refresh', {
      client: getClient(),
      refresh_token: Cookies.get(sessionCookie),
    });

    Cookies.set(sessionCookie, data.refreshToken, {
      domain: process.env.SWD_HOST,
      path: '/',
      sameSite: 'None',
      secure: true,
      expires: 30,
    });

    parseToken(data.accessToken);
  }

  async function updateSettings(s: Settings) {
    await api.put('/account/settings', {
      animationSpeed: s.game.animationSpeed,
      opponentJoined: s.sounds.opponentJoined,
      myTurn: s.sounds.myTurn,
    });

    user.value.settings = s;
  }

  async function getProfile(n: Nickname) {
    return await api.get<{ profile: Profile }>(`/account/${n}`);
  }

  async function getProfileVersus(vs: Nickname) {
    return await api.get<{ profile: GamesReport }>(
      `account/${user.value.nickname}/vs/${vs}`
    );
  }

  return {
    user,
    token,
    isLoggedIn,
    hasRoom,
    signin,
    logout,
    refreshSession,
    updateSettings,
    getProfile,
    getProfileVersus,
  };
});
