<script lang="ts" setup>
definePageMeta({
  layout: 'main',
})

const helperStore = useHelperStore()
const crypto = useCrypto()

const encryptMethodList = ref(['AES', 'DES', 'RC4'])

const encryptMethod = ref<'AES' | 'DES' | 'RC4' | null>(null)
const file = ref<any>(null)
const encryptKey = ref<string | null>(null)
const filename = ref<string | null>(null)

const submit = async () => {
  if (!encryptMethod.value || !file.value || !encryptKey.value || !filename.value) {
    return helperStore.setNotify(true, 'Validation Error', 'Please fill in all fields', 'error')
  }

  helperStore.setOverlay(true, 'Please wait...')

  try {
    const fileToBase64 = await useToBase64(file.value)
    const encryptData = await crypto.encrypt(fileToBase64, encryptKey.value, encryptMethod.value)

    if (!encryptData) {
      throw new Error('Encryption Error')
    }

    const encryptedFileURL = URL.createObjectURL(new Blob([encryptData]))
    const downloadLink = document.createElement('a')
    downloadLink.href = encryptedFileURL
    downloadLink.download = `encrypted_file_${encryptMethod.value}_${filename.value}`
    downloadLink.click()
    URL.revokeObjectURL(encryptedFileURL)

    encryptMethod.value = null
    file.value = null
    encryptKey.value = null
    filename.value = null
  } catch (error) {
    console.log('Encryption error:', error)
    helperStore.setNotify(true, 'Validation Error', 'Encryption Error', 'error')
  }

  helperStore.setOverlay(false)
}
</script>

<template>
  <div class="row justify-center">
    <div class="col-6">
      <q-form @submit.prevent="submit">
        <q-card>
          <q-card-section class="bg-green-10 text-white">
            <div class="text-h6">Encrypt data</div>
            <div class="text-subtitle2">Please encrypt your data</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-select
              v-model="encryptMethod"
              :options="encryptMethodList"
              label="Encrypt method"
              filled
              color="green-10"
            />
          </q-card-section>

          <q-card-section>
            <q-file v-model="file" label="File" filled color="green-8" />
          </q-card-section>

          <q-card-section>
            <q-input v-model="encryptKey" label="Key" color="green-8" filled />
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="filename"
              label="File Name"
              color="red-6"
              :prefix="`encrypted_file_${encryptMethod || ''}_`"
              filled
            />
          </q-card-section>

          <q-separator />

          <q-card-actions class="justify-center">
            <q-btn type="submit" color="green-8" style="width: 50%">Submit</q-btn>
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </div>
</template>

<style scoped></style>
