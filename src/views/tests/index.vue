<template>
  <div>
    <el-input v-model="permission" placeholder="placeholder"></el-input>
    <el-button @click="testHashPermission">hasPermission方法</el-button>
  </div>
</template>

<script setup lang="ts">
import hasPermission from '@/utils/permissions'
import LoggerUtils from '@/utils/logger-utils'
import { ref } from 'vue'
const permission = ref('')
const testHashPermission = () => {
  LoggerUtils.info('', hasPermission(permission.value))
}
</script>

<style scoped></style>
