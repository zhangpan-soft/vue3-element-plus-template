<template>
  <div>
    <el-input v-model="permission" placeholder="placeholder"></el-input>
    <el-button @click="testHashPermission">hasPermission方法</el-button>
    <el-button @click="testSwitchLocale">切换语言</el-button>
    <span>{{ $t('routes.dashboard.dashboard.title') }}</span>
    <el-form :model="form">
      <el-checkbox-group v-model="form.type">
        <el-checkbox v-for="item in checks1" :key="item.value" :label="item.label">{{
          item.label
        }}</el-checkbox>
      </el-checkbox-group>
    </el-form>
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
const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
  group1: []
})
const checks1 = [
  {
    value: 1,
    label: '选项1'
  },
  {
    value: 2,
    label: '选项2'
  }
]
</script>

<style scoped></style>
