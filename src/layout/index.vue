<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 手机设备侧边栏打开遮罩层 -->
    <div
      v-if="classObj.mobile && classObj.openSidebar"
      class="drawer-bg"
      @click="handleOutsideClick"
    ></div>

    <Sidebar class="sidebar-container" />

    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>

      <!--主页面-->
      <app-main />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { AppMain, Navbar } from './components'
import Sidebar from './components/Sidebar/index.vue'
import { useStore } from 'vuex'

const { width } = useWindowSize()
const $store = useStore()

/**
 * 响应式布局容器固定宽度
 *
 * 大屏（>=1200px）
 * 中屏（>=992px）
 * 小屏（>=768px）
 */
const WIDTH = 992

const fixedHeader = computed(() => $store.state.settings.fixedHeader)
const showTagsView = computed(() => $store.state.settings.tagsView)

const classObj = computed(() => ({
  hideSidebar: !$store.state.app.sidebar.opened,
  openSidebar: $store.state.app.sidebar.opened,
  withoutAnimation: $store.state.app.sidebar.withoutAnimation,
  mobile: $store.state.app.device === 'mobile'
}))

watchEffect(() => {
  if (width.value < WIDTH) {
    $store.dispatch('app/toggleDevice', 'mobile')
    $store.dispatch('app/closeSideBar', true)
  } else {
    $store.dispatch('app/toggleDevice', 'desktop')

    if (width.value >= 1200) {
      //大屏
      $store.dispatch('app/openSideBar', true)
    } else {
      $store.dispatch('app/closeSideBar', true)
    }
  }
})

function handleOutsideClick() {
  $store.dispatch('app/closeSideBar', false)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.app-wrapper {
  &::after {
    display: table;
    clear: both;
    content: '';
  }

  position: relative;
  width: 100%;
  height: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}
</style>
