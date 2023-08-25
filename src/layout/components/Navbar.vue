<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
        </div>
        <template #dropdown>
          <el-dropdown-menu v-slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/zhangpan-soft/vue3-element-plus-template">
              <el-dropdown-item>{{ $t('navbar.github') }}</el-dropdown-item>
            </a>
            <a target="_blank" href="https://github.com/zhangpan-soft/vue3-element-plus-template">
              <el-dropdown-item>{{ $t('navbar.document') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="settings">
              <span style="display: block">{{ $t('navbar.settings') }}</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">{{ $t('navbar.logout') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import { Hamburger, Breadcrumb } from '@/components'
import { ElDropdownItem } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const store = useStore()

const route = useRoute()
const router = useRouter()

const sidebar = computed(() => store.state.app.sidebar)
const avatar = computed(() => store.state.user.avatar)

/**
 * 左侧菜单栏显示/隐藏
 */
function toggleSideBar() {
  store.dispatch('app/toggleSideBar')
}

/**
 * 注销
 */
function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      store.dispatch('user/logout').then(() => {
        router.push(`/login?redirect=${route.fullPath}`)
      })
    })
    .catch(() => {
      // pass
    })
}

function settings() {
  router.push('/system/settings')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
