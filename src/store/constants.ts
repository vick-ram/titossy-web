import { defineStore} from 'pinia'

export const useConstants = defineStore('constant', {
    state: () => ({ isSideBarOpen: Boolean }),
    actions: {
        toggleSideBar() {
            !this.isSideBarOpen
        }
    }
    }
)
