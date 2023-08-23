<template>
  <div class="app-container collapse-custom">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item :title="$t('settings.languageTitle')" name="languageSetting">
        <el-row>
          <el-col :span="24">
            <span>{{ $t('settings.currentLanguage') + ': ' }}</span>
            <span>{{ $t('language.' + currentLanguage()) }}</span>
            <el-divider direction="vertical" />
            <span>{{ $t('settings.changeLanguage') + ': ' }}</span>
            <el-select v-model="language" size="small" @change="languageSwitch">
              <el-option
                v-for="item in languageOptions()"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
const i18n = useI18n()
const store = useStore()
const activeName = ref('languageSetting')
const currentLanguage = () => {
  return i18n.locale.value
}
const language = ref(currentLanguage())
const languageOptions = () => {
  return (i18n.messages.value[i18n.locale.value].settings as any).languageOptions as any[]
}
const languageSwitch = (value: string) => {
  store.dispatch('app/setLocale', value)
}
</script>

<style lang="scss" scoped>
::v-deep(.el-collapse-item__content) {
  padding-left: 25px !important;
  padding-right: 25px !important;
}
</style>
