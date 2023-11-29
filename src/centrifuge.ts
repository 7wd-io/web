import { Centrifuge } from 'centrifuge';
import { useAccountStore } from 'stores/account';

const cent = new Centrifuge(
  `${process.env.SWD_CENTRIFUGO_URL as string}/connection/websocket`,
  {
    token: useAccountStore().token(),
  }
);

cent.connect();

export default cent;
