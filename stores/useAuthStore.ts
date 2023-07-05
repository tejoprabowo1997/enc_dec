interface IAuthState {
  isLogin: boolean
  token: string | null
  role: string | null
  username: string | null
}

export const useAuthStore = defineStore('authStore', {
  persist: true,

  state: (): IAuthState => ({
    isLogin: false,
    token: null,
    role: null,
    username: null,
  }),

  actions: {
    async login(data: { nikOrEmail: string; password: string }) {
      const helperStore = await useHelperStore()

      helperStore.setOverlay(true, 'Logging in...')

      const response = await useApi('/api/auth', 'POST', data)

      if (response.success) {
        const crypto = useCrypto()
        const router = useRouter()

        this.isLogin = true
        this.token = crypto.encrypt(response.result._id, 'secret', 'AES') || ''
        this.role = response.result.role
        this.username = response.result.name

        router.push('/encrypt')
      }

      helperStore.setOverlay(false)
    },
  },
})
