import { ISchema } from '~/types/model/IUser'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
  }),

  actions: {
    async createUser(data: ISchema) {
      const helperStore = await useHelperStore()

      helperStore.setOverlay(true, 'Creating user...')

      const response = await useApi('api/user/create', 'POST', data)

      helperStore.setOverlay(false)
    },
  },
})
