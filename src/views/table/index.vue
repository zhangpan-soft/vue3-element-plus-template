<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" :label="$t('views.table.id')" width="95">
        <template #default="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('views.table.title')">
        <template #default="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('views.table.author')" width="110" align="center">
        <template #default="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('views.table.pageviews')" width="110" align="center">
        <template #default="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        :label="$t('views.table.status')"
        width="110"
        align="center"
      >
        <template #default="scope">
          <el-tag :type="statusFilter(scope.row.status)">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        :label="$t('views.table.createdAt')"
        width="200"
      >
        <template #default="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { getList } from '@/api/table'
import { ref } from 'vue'
const statusFilter = (value: any) => {
  const statusMap: Record<any, any> = {
    published: 'success',
    draft: 'gray',
    deleted: 'danger'
  }
  return statusMap[value]
}
const list = ref()
const listLoading = ref(true)
const fetchData = () => {
  listLoading.value = true
  getList({}).then((response: any) => {
    list.value = response.data.items
    listLoading.value = false
  })
}
fetchData()
</script>

<style lang="scss" scoped>
:deep(.el-table__header) {
  width: 100% !important;
}

:deep(.el-table__body) {
  width: 100% !important;
}
</style>
