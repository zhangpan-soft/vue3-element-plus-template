<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-icon><Edit /></el-icon>
    <el-icon><CustomIcon /></el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const $store = useStore()
const name = computed(() => $store.state.user.name)
import * as components from '@element-plus/icons-vue'
console.log(components)
console.log(components['Edit'])
const Edit = components['Edit']
const CustomIcon = components['House']
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
