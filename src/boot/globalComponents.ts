import { boot } from 'quasar/wrappers';
import Card from 'components/Game/Card/Card.vue';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.component('swd-card', Card);
});
