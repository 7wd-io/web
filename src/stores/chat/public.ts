import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Message } from 'components/Chat/models';
import { HistoryResult } from 'centrifuge/build/types';

export const useChatStore = defineStore('chat:public', () => {
  const messages = ref<Message[]>([]);

  async function addMessage(msg: Message) {
    messages.value.push(msg);
  }

  async function setHistory(history: HistoryResult) {
    const value = [] as Message[];

    history.publications.forEach((item) => {
      const { body, ts } = item.data as Message;
      value.push({
        author: item.info?.user || '',
        body,
        ts,
      });
    });

    messages.value = value;
  }

  return {
    messages,
    addMessage,
    setHistory,
  };
});
