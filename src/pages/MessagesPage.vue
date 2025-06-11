<template>
  <ElevatedCard class="h-screen flex mt-5">
    <!-- Chat List Panel -->
    <ChatList
      :chats="chats"
      :selectedChat="selectedChat"
      @selectChat="selectChat"
    />

    <!-- Message View Panel -->
    <MessageView
      v-if="selectedChat"
      :messages="selectedChat.messages"
      :chatTitle="selectedChat.name"
      @sendMessage="sendMessage"
    />
    <div v-else class="flex-1 flex items-center justify-center text-gray-500">
      Select a chat to start messaging
    </div>
  </ElevatedCard>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import ChatList from "../components/ChatList.vue";
import MessageView from "../components/MessageView.vue";
import ElevatedCard from "../components/ElevatedCard.vue";
import { useCustomerStore } from "../store/customerStore";
import { useEmployeeStore } from "../store/employeeStore";
import { useSupplierStore } from "../store/supplierStore";
import type { Chat, Customer, Employee, Supplier, Message } from "../models/constants";
import { WebsocketClient } from "../utils/useWebsocket";
import { decodeJwt } from "../utils/decode_jwt";
import { useMessageStore } from "../store/chat-store";

const customerStore = useCustomerStore();
const employeeStore = useEmployeeStore();
const supplierStore = useSupplierStore();
const messageStore = useMessageStore();

let websocketClient: WebsocketClient | null = null

const selectedChat = ref<Chat | null>(null);

const environment = import.meta.env.VITE_ENVIRONMENT;
const websocketUrl =
  environment === "production"
    ? import.meta.env.VITE_WEBSOCKET_API_URL
    : import.meta.env.VITE_WEBSOCKET_API_URL_LOCAL;

const token = localStorage.getItem("token");
const decodedToken = decodeJwt(token || "");
const currentUserId = decodedToken?.sub || "";

const chatUsers = computed(() => {
  const customers = customerStore.customers.map((c: Customer) => ({
    id: c.id,
    name: c.fullName,
    role: "customer",
  }));
  const employees = employeeStore.employees.map((e: Employee) => ({
    id: e.id,
    name: e.fullName,
    role: e.role, // employees have role
  }));
  const suppliers = supplierStore.suppliers.map((s: Supplier) => ({
    id: s.id,
    name: s.fullName,
    role: "supplier",
  }));
  return [...customers, ...employees, ...suppliers].filter(
    (user) => user.id !== currentUserId
  );
})

const chats = ref<Chat[]>([])

const loadChats = async () => {
  // For each user, fetch messages with current user as receiver or sender
  const chatList: Chat[] = [];
  for (const user of chatUsers.value) {
    // Fetch messages where current user is sender or receiver
    await messageStore.fetchMessages(currentUserId, user.id);
    console.log("User id:", user.id);
    console.log(`Messages for user ${user.id}:`, messageStore.messages);
    const messages: Message[] = messageStore.messages.filter(
      (msg: Message) =>
        (msg.sender === currentUserId && msg.receiver === user.id) ||
        (msg.sender === user.id && msg.receiver === currentUserId)
    );
    chatList.push({
      id: user.id,
      name: user.name,
      role: user.role,
      messages,
    });
  }
  chats.value = chatList;
};
console.log("Loaded chats:", chats.value);

const selectChat = (chat: Chat) => {
  selectedChat.value = chat;

  if (websocketClient) {
    websocketClient = null;
  }

  websocketClient = new WebsocketClient(`${websocketUrl}/${chat.id}?token=${token}`);
};

const sendMessage = (text: string) => {
  if (selectedChat.value && websocketClient) {
    websocketClient.sendMessage(text)
  }
};

onMounted(async() => {
  await customerStore.getAll()
  await employeeStore.getAll();
  await supplierStore.getAll();

  // Fetch messages
  await loadChats();
})
</script>
