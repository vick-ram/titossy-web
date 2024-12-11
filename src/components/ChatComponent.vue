<template>
    <div>
        <ElevatedCard class="w-2/3 mx-auto">
            <!-- Loop through messages -->
            <div
                v-for="message in messages"
                :key="message.id"
                :class="[getMessageClass(message)]"
            >
                <!-- Display receiver's avatar if not sender -->
                <img
                    v-if="isSender(message.sender)"
                    class="w-8 h-8 rounded-full"
                    src="../assets/images/avatar.jpg"
                    alt="Receiver avatar"
                />

                <!-- Message Content -->
                <div
                    :class="[
                        'flex flex-col gap-1 w-full max-w-[320px]',
                        isSender(message.sender) ? 'text-right' : 'text-left'
                    ]"
                >
                    <!-- Name and Timestamp -->
                    <div class="flex items-center space-x-2 rtl:space-x-reverse">
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">
                            {{ isSender(message.sender) ? 'You' : message.sender }}
                        </span>
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {{ message.timestamp }}
                        </span>
                    </div>

                    <!-- Message Bubble -->
                    <div class="text-sm text-gray-900 dark:text-white">
                        {{ message.message }}
                    </div>
                </div>
            </div>
            <!-- Input field for new message -->
            <div class="flex items-center gap-2.5 mt-4">
                <input
                    v-model="message"
                    type="text"
                    class="flex-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder="Type a message..."
                />
                <button
                    @click="sendMessage"
                    class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white -rotate-45"
                >
                    <span class="material-symbols-outlined">send</span>
                </button>
            </div>
        </ElevatedCard>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref,Ref } from 'vue';
import { get } from '../boot';
import ElevatedCard from '../components/ElevatedCard.vue';
import { ApiResponse, Message, Supplier } from '../models/constants';
import { jwtDecode } from 'jwt-decode'
import {useToastStore} from '../store/toastStore'
import {useWebsocket, WebsocketClient} from '../utils/useWebsocket'

const token = localStorage.getItem('token');
const decodedToken = jwtDecode(String(token));
const senderId = decodedToken.sub
const toastStore = useToastStore()
const message = ref('')
const errorMessage = ref('')

const props = defineProps<{
    supplier: Supplier;
}>();

const websocket = useWebsocket(
    `wss://vickram.tech/api/chat/${props.supplier.id}`,
    message.value
)

console.log(websocket.isConnected)

const isSender = (sender: string) => sender === senderId;
const getMessageClass = (message: Message) => {
    return [
        'flex items-start gap-2.5 mb-4',
        isSender(message.sender) ? 'justify-end' : 'justify-start'
    ]
}

const messages: Ref<Message[]> = ref([]);

const getMessages = async (receiver: string) => {
    try {
        const response = await get<ApiResponse<Message[]>>('/messages/' + receiver);
        if (response.data.status === 'success') {
            if (response.data.data) {
                messages.value = response.data.data;
            }
        }
        if (response.data.status === 'error') {
            throw new Error(response.data.error)
        }
    } catch (error) {
        if (error instanceof Error) {
            setTimeout(() => {
                errorMessage.value = error.message
            toastStore.showToast(errorMessage.value, 'error')
            }, 5000)
        } else {
            setTimeout(() => {
                errorMessage.value = String(error)
                toastStore.showToast(errorMessage.value, 'error')
            }, 5000)
        }
    }
}

const sendMessage = () => {
    if (websocket.isConnected) {
        websocket.sendMessage()
    }
}

// const sendMessage = () => {
//     const client = new WebsocketClient(`wss://vickram.tech/api/chat/${props.supplier.id}`)
//     client.sendMessage(message.value)
// }

onMounted(async () => {
    await getMessages(props.supplier.id);
});


</script>
