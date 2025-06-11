import { defineStore } from "pinia";
import { get } from "../boot";
import { ApiResponse } from "../models/constants";
import type { Message, MessageState } from "../models/constants";

export const useMessageStore = defineStore("message", {
  state: (): MessageState => ({
    loading: false,
    messages: [],
    error: "",
  }),
  actions: {
    async fetchMessages(sender: string, receiver: string) {
      this.loading = true;
      this.error = "";
      try {
        const response = await get<ApiResponse<Message[]>>(`/messages/${sender}/${receiver}`);
        if (response.data.status === "success") {
            if (response.data.data) {
                this.messages = response.data.data;
            }
        } else if (response.data.status === "error") {
            throw new Error(response.data.error);
        }
      } catch (error: any) {
        this.error = error.message || "Failed to fetch messages";
      } finally {
        this.loading = false;
      }
    },
  },
});
