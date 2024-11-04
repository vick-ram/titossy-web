import { defineStore} from 'pinia'

export const useToastStore = defineStore('toast', {
    state: () => ({
        toast: {
            message: '' as string,
            type: '' as 'success' | 'error' | 'warning' | '',
        },
    }),
    actions: {
        showToast(message: string, type: 'success' | 'error' | 'warning') {
            this.toast.message = message
            this.toast.type = type
        },
        clearToast() {
            this.toast.message = ''
            this.toast.type = ''
        }
    }
})