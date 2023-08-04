<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.module.scss";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const $store = useStore();
const $router = useRouter();
const $route = useRoute();
const sidebar = computed(() => $store.state.app.sidebar);
const routes = computed(() => $router.options.routes);
const activeMenu = computed(() =>
  $route.meta.activeMenu ? $route.meta.activeMenu : $route.path
);
const showLogo = computed(() => $store.state.settings.sidebarLogo);
const isCollapse = computed(() => !sidebar.value.opened);
</script>
