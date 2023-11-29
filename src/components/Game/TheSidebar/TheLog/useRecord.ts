import { PropType } from 'vue';
import { Nickname } from 'src/models/account';

export function useRecord() {
  return {
    actor: {
      type: String as PropType<Nickname>,
      required: true,
    },
    n: {
      type: Number,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  };
}
