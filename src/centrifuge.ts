import { Centrifuge } from 'centrifuge';
import { useAccountStore } from 'stores/account';

const account = useAccountStore();

const cent = new Centrifuge(
  `${process.env.SWD_CENTRIFUGO_URL as string}/connection/websocket`,
  {
    token: account.token(),
    async getToken() {
      await account.refreshSession();

      return account.token();
    },
  }
);

cent.connect();

export default cent;
