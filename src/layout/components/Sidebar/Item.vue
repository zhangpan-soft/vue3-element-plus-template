<template>
  <div>
    <el-icon>
      <i
        v-if="icon && icon.includes('el-icon')"
        :class="[icon, 'sub-el-icon']"
      />
      <svg-icon
        v-else-if="icon"
        :icon-class="icon"
        :el-icon-name="elIconName"
      />
    </el-icon>
    <span v-if="title">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  elIconName: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
