<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import Logo from './Logo.vue'
import variables from '@/styles/variables.module.scss'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const currRoute = useRoute()
const sidebarLogo = computed(() => store.state.settings.sidebarLogo)
</script>

<template>
  <div :class="{ 'has-logo': sidebarLogo }">
    <logo v-if="sidebarLogo" :collapse="!store.state.app.sidebar.opened" />
    <el-scrollbar>
      <el-menu
        :default-active="currRoute.path"
        :collapse="!store.state.app.sidebar.opened"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in $router.options.routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="!store.state.app.sidebar.opened"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
