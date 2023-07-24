<script lang="ts" setup>
import { QSpinnerGears } from 'quasar'

const $q = useQuasar()
const helperStore = useHelperStore()

interface IOverlay {
  show: boolean
  message: string | null
}
const overlay: ComputedRef<IOverlay> = computed(() => helperStore.overlay)

watch(
  overlay,
  (value) => {
    if (value.show) {
      $q.loading.show({
        message: value.message || 'Loading...',
        spinnerSize: 100,
        spinnerColor: 'green-6',
        spinner: QSpinnerGears,
        messageColor: 'red-6',
        backgroundColor: 'white',
      })
    } else {
      $q.loading.hide()
    }
  },
  { deep: true }
)
</script>

<template>
  <div></div>
</template>

<style scoped></style>
