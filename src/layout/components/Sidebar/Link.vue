<script lang="ts" setup>
import { computed } from 'vue'
import { isExternal } from '@/utils/validate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

const sidebar = computed(() => store.state.app.sidebar)
const device = computed(() => store.state.app.device)

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

const router = useRouter()
function push() {
  if (device.value === 'mobile' && sidebar.value.opened) {
    store.dispatch('app/closeSideBar', false)
  }
  router.push(props.to).catch((err) => {
    console.error(err)
  })
}
</script>

<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>
