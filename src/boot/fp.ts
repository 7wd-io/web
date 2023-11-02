import { boot } from 'quasar/wrappers';
import { useAccountStore } from 'src/stores/account';

export default boot(async () => {
  const $account = useAccountStore();
  await $account.getFingerprint();
});
