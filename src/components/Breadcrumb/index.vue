<!--  eslint-disable-next-line @typescript-eslint/no-ignore    -->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="
            item.redirect === 'noRedirect' || index === levelList.length - 1
          "
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import pathToRegexp from "path-to-regexp";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const levelList = ref();
const route = useRoute();
const router = useRouter();
watch(route, () => {
  getBreadcrumb();
});
const getBreadcrumb = () => {
  let matched: any = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
  const first = matched[0];
  if (!isDashboard(first)) {
    matched = [{ path: "/dashboard", meta: { title: "Dashboard" } }].concat(
      matched
    );
  }
  levelList.value = matched.filter(
    (item: any) =>
      item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
};
const isDashboard = ($route: any) => {
  const name = $route && $route.name;
  if (!name) {
    return false;
  }
  return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
};
const pathCompiler = (path: string) => {
  const { params } = route;
  return pathToRegexp.compile(path)(params);
};
const handleLink = (item: any) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(pathCompiler(path));
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
