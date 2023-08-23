<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import getPageTitle from '@/utils/get-page-title'
const store = useStore()
const i18n = useI18n()
const route = useRoute()
store.watch(
  (state) => {
    return state.app.locale
  },
  (value) => {
    i18n.locale.value = value
    if (route.meta && route.meta.title) {
      document.title = getPageTitle(i18n.t(route.meta.title as string))
    }
  }
)
</script>
