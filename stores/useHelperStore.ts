interface IHelperState {
  overlay: {
    show: boolean
    message: string | null
  }
  notify: {
    show: boolean
    title: string | null
    message: string | null
    type: 'success' | 'error' | 'warning' | 'info' | null
  }
  alert: {
    show: boolean
    title: string | null
    message: string | null
    type: 'success' | 'error' | 'warning' | 'info' | null
  }
}

export const useHelperStore = defineStore('helperStore', {
  state: (): IHelperState => ({
    overlay: {
      show: false,
      message: null,
    },
    notify: {
      show: false,
      title: null,
      message: null,
      type: null,
    },
    alert: {
      show: false,
      title: null,
      message: null,
      type: null,
    },
  }),

  actions: {
    setOverlay(show: boolean, message: string | null = null) {
      this.overlay.show = show
      this.overlay.message = message
    },

    setNotify(
      show: boolean,
      title: string | null = null,
      message: string | null = null,
      type: 'success' | 'error' | 'warning' | 'info' | null = null
    ) {
      this.notify.show = show
      this.notify.title = title
      this.notify.message = message
      this.notify.type = type
    },

    setAlert(
      show: boolean,
      title: string | null = null,
      message: string | null = null,
      type: 'success' | 'error' | 'warning' | 'info' | null = null
    ) {
      this.alert.show = show
      this.alert.title = title
      this.alert.message = message
      this.alert.type = type
    },
  },
})
