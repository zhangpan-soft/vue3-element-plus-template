<template>
  <div class="app-container">
    <el-form ref="formRef" :model="form" label-width="120px">
      <el-form-item :label="$t('views.form.activityName')">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :label="$t('views.form.activityZone')">
        <el-select v-model="form.region" :placeholder="$t('views.form.activityZonePlaceholder')">
          <el-option
            v-for="item in i18n.messages.value[i18n.locale.value].views.form.activityZoneOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('views.form.activityTime')">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            :placeholder="$t('views.form.activityTimePlaceholder')"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            type="fixed-time"
            :placeholder="$t('views.form.activityTimePlaceholder')"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item :label="$t('views.form.instantDelivery')">
        <el-switch v-model="form.delivery" :active-value="true" :inactive-value="false" />
      </el-form-item>
      <el-form-item :label="$t('views.form.activityType')">
        <el-checkbox-group v-model="form.type">
          <el-checkbox
            v-for="item in i18n.messages.value[i18n.locale.value].views.form.activityTypeChecks"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="$t('views.form.resources')">
        <el-radio-group v-model="form.resource">
          <el-radio
            v-for="item in i18n.messages.value[i18n.locale.value].views.form.resourcesOptions"
            :key="item"
            :label="item.label"
            :model-value="item.value"
          />
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('views.form.activityDesc')">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ $t('views.form.btn.submit') }}</el-button>
        <el-button @click="onCancel">{{ $t('views.form.btn.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
const onSubmit = () => {
  ElMessage.info(i18n.t('views.form.elMessages.submit'))
}
const onCancel = () => {
  ElMessage.warning(i18n.t('views.form.elMessages.cancel'))
}
const formRef = ref()
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
