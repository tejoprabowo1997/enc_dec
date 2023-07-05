<script lang="ts" setup>
const sideMenu = ref<boolean>(false)
const authStore = useAuthStore()
const router = useRouter()

const username: ComputedRef<string | null> = computed(() => authStore.username)
</script>

<template>
  <q-layout view="hHh Lpr lff" container style="height: 100vh" class="bg-red-1">
    <q-header elevated class="bg-red-6 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="sideMenu = !sideMenu" />

        <q-toolbar-title> END DEC APP </q-toolbar-title>

        <q-btn-dropdown stretch flat :label="`Halo ${username}`">
          <q-list>
            <q-item-label header> Menu Pengaturan </q-item-label>
            <q-separator />
            <q-item clickable v-close-popup tabindex="0">
              <q-item-section avatar>
                <q-avatar icon="settings" color="grey-2" text-color="red-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Pengaturan</q-item-label>
                <q-item-label caption>Info User</q-item-label>
                <q-item-label caption>Merubah email</q-item-label>
                <q-item-label caption>Merubah Username</q-item-label>
                <q-item-label caption>Merubah Kata sandi</q-item-label>
                <q-item-label caption>Menonaktifkan Akun</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-if="!$q.fullscreen.isActive"
              clickable
              v-close-popup
              tabindex="0"
              @click="
                () => {
                  $q.fullscreen.request()
                }
              "
            >
              <q-item-section avatar>
                <q-avatar icon="fullscreen" color="grey-2" text-color="red-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Fullscreen</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-else
              clickable
              v-close-popup
              tabindex="0"
              @click="
                () => {
                  $q.fullscreen.exit()
                }
              "
            >
              <q-item-section avatar>
                <q-avatar icon="fullscreen_exit" color="grey-2" text-color="blue-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Exit Fullscreen</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup tabindex="0">
              <q-item-section avatar>
                <q-avatar icon="bug_report" color="grey-2" text-color="red-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Laporkan Bug!</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-close-popup
              tabindex="0"
              @click="
                () => {
                  authStore.$reset()
                  router.push('/')
                }
              "
            >
              <q-item-section avatar>
                <q-avatar icon="logout" color="grey-2" text-color="orange-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Keluar Panel</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <CommonSidebar v-model="sideMenu" />

    <q-page-container>
      <div class="q-pa-lg">
        <slot />

        <CommonOverlay />
        <CommonNotify />
        <CommonAlert />
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
