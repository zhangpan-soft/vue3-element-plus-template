<template>
  <div>
    <el-input v-model="permission" placeholder="placeholder"></el-input>
    <el-button @click="testHashPermission">hasPermission方法</el-button>
    <el-button @click="testSwitchLocale">切换语言</el-button>
    <span>{{ $t('route.dashboard') }}</span>
  </div>
</template>

<script setup lang="ts">
import hasPermission from '@/utils/permissions'
import LoggerUtils from '@/utils/logger-utils'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
const i18n = useI18n()
const store = useStore()
const permission = ref('')
const testHashPermission = () => {
  LoggerUtils.info('', hasPermission(permission.value))
}
const testSwitchLocale = () => {
  const local = (i18n.locale.value as string) === 'zh-cn' ? 'en' : 'zh-cn'
  store.dispatch('app/setLocale', local)
}
</script>

<style scoped></style>
