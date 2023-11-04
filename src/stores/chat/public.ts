import { defineStore } from 'pinia';
import { PublicationContext } from 'centrifuge';
import { Message } from 'components/Chat/models';

export const useChat = defineStore('chat:public', {
  state: () => ({
    messages: [] as Message[],
  }),
  actions: {
    addMessage(msg: Message) {
      this.messages = [...this.messages, msg];
    },
    setHistory(history: PublicationContext[]) {
      const messages = [] as Message[];

      history.forEach((item) => {
        // messages.push([item.info?.user as Nickname, item.data as string]);
        const { body, ts } = item.data as Message;
        messages.push({
          author: item.info?.user || '',
          body,
          ts,
        });
      });

      this.messages = messages;
    },
  },
});

export type ChatStore = ReturnType<typeof useChat>
