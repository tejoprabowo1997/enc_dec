<script lang="ts" setup>
definePageMeta({
  layout: 'main',
})

const helperStore = useHelperStore()
const crypto = useCrypto()

const encryptMethodList = ref(['AES', 'DES', 'RC4'])
const encryptMethod = ref<'AES' | 'DES' | 'RC4' | null>()
const file = ref<File | null>(null)
const encryptKey = ref<string | null>()

const readFileContent = async (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        const content = event.target.result as string
        resolve(content)
      } else {
        reject(new Error('Failed to read file'))
      }
    }
    reader.onerror = (event: ProgressEvent<FileReader>) => {
      reject(new Error('Failed to read file'))
    }
    reader.readAsText(file)
  })
}

const getBase64FileExtension = (base64Data: string): { extensionFile: string; mimeType: string } | null => {
  const matches = base64Data.match(/^data:(.*);base64,/)
  if (matches && matches.length > 1) {
    const mimeType = matches[1]
    const extensions: Record<string, string> = {
      // Image
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/svg+xml': 'svg',
      // Video
      'video/mp4': 'mp4',
      'video/quicktime': 'mov',
      'video/x-msvideo': 'avi',
      'video/x-flv': 'flv',
      'video/x-matroska': 'mkv',
      // Audio
      'audio/mpeg': 'mp3',
      'audio/wav': 'wav',
      'audio/ogg': 'ogg',
      'audio/aac': 'aac',
      'audio/flac': 'flac',
      // Program
      'application/octet-stream': 'exe',
      'application/x-msdownload': 'exe',
      'application/x-msi': 'msi',
      // Document
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
      'application/vnd.ms-powerpoint': 'ppt',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
      'application/pdf': 'pdf',
      'text/plain': 'txt',
      'application/rtf': 'rtf',
    }
    return { extensionFile: mimeType, mimeType: extensions[mimeType] } || null
  }
  return null
}

const base64ToBlob = (base64Data: string, extensionFile?: string): Blob => {
  const byteCharacters = atob(base64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: extensionFile })
}

const download = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
}

const submit = async () => {
  if (!encryptMethod.value) {
    return helperStore.setNotify(true, 'Validation Error', 'Encrypt method cannot be empty', 'error')
  }
  if (!file.value) {
    return helperStore.setNotify(true, 'Validation Error', 'File cannot be empty', 'error')
  }
  if (!encryptKey.value) {
    return helperStore.setNotify(true, 'Validation Error', 'Encrypt key cannot be empty', 'error')
  }

  try {
    const content = await readFileContent(file.value)
    const decryptData = await crypto.decrypt(content, encryptKey.value, encryptMethod.value)
    const fileType = getBase64FileExtension(decryptData)
    const withoutPrefix = decryptData.split(',')[1]
    const blob = base64ToBlob(withoutPrefix, fileType?.extensionFile)

    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    const fileName = `file_decrypted_${year}/${month}/${day}-${hours}:${minutes}:${seconds}.${fileType?.mimeType}`

    download(blob, fileName)

    encryptMethod.value = null
    file.value = null
    encryptKey.value = null
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="row justify-center">
    <div class="col-6">
      <q-form @submit.prevent="submit">
        <q-card>
          <q-card-section class="bg-red-6 text-white">
            <div class="text-h6">Decrypt data</div>
            <div class="text-subtitle2">Please upload your file</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-file v-model="file" label="File" filled color="red-6" />
          </q-card-section>

          <q-card-section>
            <q-select
              v-model="encryptMethod"
              :options="encryptMethodList"
              label="Encrypt method"
              filled
              color="red-6"
            />
          </q-card-section>

          <q-card-section>
            <q-input v-model="encryptKey" label="Key" color="red-6" filled />
          </q-card-section>

          <q-separator />

          <q-card-actions class="justify-center">
            <q-btn type="submit" color="red-6" style="width: 50%">Submit</q-btn>
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </div>
</template>

<style scoped></style>
