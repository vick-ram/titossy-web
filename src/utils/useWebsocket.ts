import { ref, Ref, onUnmounted } from 'vue'

export function useWebsocket(url: string) {
    const ws: Ref<WebSocket | null> = ref(null)
    const messages = ref<any[]>([])
    const isConnected = ref(false)

    const connect = () => {
        ws.value = new WebSocket(url)

        ws.value.onopen = () => {
            isConnected.value = true
        }

        ws.value.onmessage = (event: MessageEvent) => { 
            messages.value.push(JSON.parse(event.data))
        }

        ws.value.onclose = () => {
            isConnected.value = false
        }

        ws.value.onerror = (error: Event) => {
            console.error('WebSocket error:', error)
        }
    }

    const sendMessage = (message: string) => {
        if (ws.value && isConnected.value) {
            ws.value.send(JSON.stringify(message))
        }
    }
    connect()

    onUnmounted(() => {
        if (ws.value) {
            ws.value.close()
        }
    })

    return { messages, isConnected, sendMessage }
}