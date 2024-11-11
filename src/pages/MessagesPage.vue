<template>
    <div>
        <h1>Messages Page</h1>
        <ElevatedCard class="w-2/3 mx-auto">
            <!-- Loop through messages -->
            <div
                v-for="message in messages"
                :key="message.id"
                :class="[
                    'flex items-start gap-2.5 mb-4',
                    message.isSender ? 'justify-end' : 'justify-start'
                ]"
            >
                <!-- Display receiver's avatar if not sender -->
                <img
                    v-if="!message.isSender"
                    class="w-8 h-8 rounded-full"
                    src="../assets/images/avatar.jpg"
                    alt="Receiver avatar"
                />

                <!-- Message Content -->
                <div
                    :class="[
                        'flex flex-col gap-1 w-full max-w-[320px]',
                        message.isSender ? 'text-right' : 'text-left'
                    ]"
                >
                    <!-- Name and Timestamp -->
                    <div class="flex items-center space-x-2 rtl:space-x-reverse">
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">
                            {{ message.isSender ? 'You' : message.sender }}
                        </span>
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {{ message.time }}
                        </span>
                    </div>

                    <!-- Message Bubble -->
                    <div
                        :class="[
                            'flex flex-col p-4 rounded-lg',
                            message.isSender ? 'bg-blue-500 text-white rounded-s-xl' : 'bg-gray-100 text-gray-900 dark:bg-gray-700 rounded-e-xl'
                        ]"
                    >
                        <p class="text-sm font-normal">
                            {{ message.content }}
                        </p>
                    </div>
                </div>

                <!-- Display sender's avatar if message is from sender -->
                <img
                    v-if="message.isSender"
                    class="w-8 h-8 rounded-full"
                    src="../assets/images/avatar.jpg"
                    alt="Sender avatar"
                />
            </div>

            <!-- Input field for new message -->
            <div class="flex items-center gap-2.5 mt-4">
                <input
                    type="text"
                    class="flex-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder="Type a message..."
                />
                <button
                    class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white -rotate-45"
                >
                    <span class="material-symbols-outlined">send</span>
                </button>
            </div>
        </ElevatedCard>
    </div>
</template>

<script setup lang="ts">
import ElevatedCard from '../components/ElevatedCard.vue';
// import {useWebsocket} from '../utils/useWebsocket'

// Sample data structure
const messages = [
    {
        id: 1,
        sender: 'Bonnie Green',
        time: '11:46',
        content: "That's awesome. I think our users will really appreciate the improvements.",
        isSender: false
    },
    {
        id: 2,
        sender: 'You',
        time: '11:47',
        content: "I agree! Let\’s push the update.",
        isSender: true
    },
];

// const handleSend = () => {
//     // Send message to the server
// };


</script>
