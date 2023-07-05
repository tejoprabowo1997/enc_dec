<script lang="ts" setup>
import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'bottom-right',
  textColor: 'white',
  timeout: 15000,
  progress: true,
  classes: 'text-subtitle1 text-italic',
  actions: [{ icon: 'close', color: 'white' }],
})

const helperStore = useHelperStore()
const $q = useQuasar()

interface INotify {
  show: boolean
  title: string | null
  message: string | null
  type: 'success' | 'error' | 'warning' | 'info' | 'default' | null
}
const notify: ComputedRef<INotify> = computed(() => helperStore.notify)

watch(
  notify,
  (val) => {
    if (val.show) {
      Notify.create({
        message: val.title || '',
        caption: val.message || '',
        icon: 'error',
        color:
          val.type === 'error'
            ? 'red-4'
            : val.type === 'success'
            ? 'blue-4'
            : val.type === 'warning'
            ? 'amber-4'
            : val.type === 'info'
            ? 'cyan-4'
            : 'grey-4',
        onDismiss: () => {
          helperStore.setNotify(false)
        },
      })
    } else {
      const dismissNotify = $q.notify({})
      dismissNotify()
    }
  },
  { deep: true }
)
</script>

<template>
  <div></div>
</template>

<style scoped></style>
