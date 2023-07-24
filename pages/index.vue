<script lang="ts" setup>
const $q = useQuasar()
const authStore = useAuthStore()
const userStore = useUserStore()

// userStore.createUser({
//   name: 'admin',
//   nik: '3466738290372673',
//   email: 'admin@email.com',
//   role: 'admin',
//   password: 'admin123',
//   phoneNumber: '081212787255',
//   picture:
//     'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg',
// })

const showPassword = ref<boolean>(false)
const nikOrEmail = ref<string | null>(null)
const password = ref<string | null>(null)

const submit = async () => {
  if (!nikOrEmail.value) return $q.notify({ message: 'NIK atau Email tidak boleh kosong', color: 'red-10' })
  if (!password.value) return $q.notify({ message: 'Password tidak boleh kosong', color: 'red-10' })
  if (!nikOrEmail.value.trim()) return $q.notify({ message: 'NIK atau Email tidak boleh kosong', color: 'red-10' })
  if (!password.value.trim()) return $q.notify({ message: 'Password tidak boleh kosong', color: 'red-10' })
  await authStore.login({
    nikOrEmail: nikOrEmail.value,
    password: password.value,
  })
}
</script>

<template>
  <div
    class="row items-center justify-center"
    style="height: 100vh; background-size: cover; background-repeat: no-repeat"
  >
    <div class="col-lg-4 col-md-5 col-sm-8 col-xs-12">
      <q-form @submit.prevent="submit" class="q-pa-md">
        <q-input
          v-model="nikOrEmail"
          label="Username / Email"
          color="red-10"
          bg-color="#ececec"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'NIK atau Email tidak boleh kosong']"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          color="red-10"
          bg-color="#ececec"
          filled
          class="q-mb-md"
          :rules="[(val) => !!val || 'Password tidak boleh kosong']"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              name="visibility"
              v-if="!showPassword"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
            <q-icon name="visibility_off" v-else class="cursor-pointer" @click="showPassword = !showPassword" />
          </template>
        </q-input>
        <q-btn type="submit" label="LOGIN" color="red-10" unelevated style="width: 100%" />
      </q-form>
    </div>
  </div>
</template>

<style scoped></style>
