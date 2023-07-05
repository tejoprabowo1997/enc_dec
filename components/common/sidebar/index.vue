<script lang="ts" setup>
const authStore = useAuthStore()

const role: ComputedRef<string | null> = computed(() => authStore.role)

const sideMenu = useState<boolean>('sideMenu')
sideMenu.value = true

const route = useRoute()

interface IListSideMenuUser {
  name: string
  route: string
  icon: string
  text: string
  role: string[]
}
const listSideMenuUser: IListSideMenuUser[] = [
  {
    name: 'encrypt',
    route: '/encrypt',
    icon: 'lock',
    text: 'Encrypt',
    role: ['admin'],
  },
  {
    name: 'decrypt',
    route: '/decrypt',
    icon: 'vpn_key',
    text: 'Decrypt',
    role: ['admin'],
  },
]
</script>

<template>
  <q-drawer show-if-above v-model="sideMenu" class="bg-red-3" elevated>
    <q-scroll-area class="fit">
      <div class="q-pa-sm">
        <q-list v-for="(menu, indexMenu) in listSideMenuUser" :key="indexMenu" separator>
          <q-item
            v-if="menu.role.includes(role || '')"
            clickable
            v-ripple
            :active="menu.name === route.name"
            :to="menu.route"
            active-class="bg-red-6 text-white"
          >
            <q-item-section avatar>
              <q-icon :name="menu.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ menu.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped></style>
