import { ref, Ref, onUnmounted } from 'vue'

export function useWebsocket(url: string, message: string) {
    const ws: Ref<WebSocket | null> = ref(null)
    const isConnected = ref(false)

    const connect = () => {
        ws.value = new WebSocket(url)

        ws.value.onopen = () => {
            isConnected.value = true
        }

        ws.value.onmessage = (event: MessageEvent) => { 
            message = event.data
        }

        ws.value.onclose = () => {
            isConnected.value = false
        }

        ws.value.onerror = (error: Event) => {
            console.error('WebSocket error:', error)
        }
    }

    const sendMessage = () => {
        if (ws.value && isConnected.value) {
            ws.value.send(message)
        }
    }
    connect()

    onUnmounted(() => {
        if (ws.value) {
            ws.value.close()
        }
    })

    return { isConnected, sendMessage }
}

export class WebsocketClient {
    private socket: WebSocket | null = null

    constructor(url: string) {
        this.socket = new WebSocket(url)

        this.socket.onopen = () => {
            console.log('WebSocket connection established')
            this.socket?.send('Hello from the client!')
        }

        this.socket.onmessage = (event: MessageEvent) => {
            console.log('Received message from server:', event.data)
        }

        this.socket.onerror = (error: Event) => {
            console.error('WebSocket error:', error)
        }

        this.socket.onclose = (event: CloseEvent) => {
            console.log('WebSocket connection closed', event.reason)
        }
    }

    sendMessage(message: string) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(message)
        } else {
            console.error('WebSocket is not open')
        }
    }

}