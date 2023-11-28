import { Dialog } from 'quasar';
import Profile from 'components/Account/Profile.vue';
import { Nickname } from 'src/models/account';

interface usePlayerComponent {
  onPlayerClick: (name: Nickname) => void;
}

function onPlayerClick(name: Nickname) {
  Dialog.create({
    component: Profile,
    componentProps: {
      name,
    },
  });
}

export function usePlayerComponent(): usePlayerComponent {
  return {
    onPlayerClick,
  };
}
