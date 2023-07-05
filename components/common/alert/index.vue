<script lang="ts" setup>
const helperStore = useHelperStore()

const alertShow: ComputedRef<boolean> = computed(() => helperStore.alert.show)
const alertType: ComputedRef<string | null> = computed(() => helperStore.alert.type)
const alertTitle: ComputedRef<string | null> = computed(() => helperStore.alert.title)
const alertMessage: ComputedRef<string | null> = computed(() => helperStore.alert.message)
</script>

<template>
  <q-dialog v-model="alertShow">
    <q-card class="q-dialog-plugin" style="width: 600px">
      <q-card-section
        align="center"
        class="text-white"
        :class="{ 'bg-blue-4': alertType === 'success', 'bg-red-4': alertType === 'error' }"
      >
        <div class="text-h6">
          {{ alertTitle }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="text-center">
        {{ alertMessage }}
      </q-card-section>
      <q-separator />
      <q-card-actions align="center">
        <q-btn
          color="red-6"
          label="DISMISS"
          flat
          style="width: 100%"
          @click="
            () => {
              helperStore.setAlert(false)
            }
          "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
