<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('views.login.title') }}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('views.login.usernamePlaceholder')"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('views.login.passwordPlaceholder')"
          name="password"
          tabindex="2"
          auto-complete="on"
          @native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handleLogin"
        >{{ $t('views.login.btn.login') }}</el-button
      >

      <div class="tips">
        <span style="margin-right: 20px">{{ $t('views.login.tips.username') }}</span>
        <span> {{ $t('views.login.tips.password') }}</span>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { validUsername } from '@/utils/validate'
import { nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
const validateUsername = (rule: any, value: string, callback: any) => {
  if (!validUsername(value)) {
    callback(new Error('Please enter the correct user name'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: string, callback: any) => {
  if (value.length < 6) {
    callback(new Error('The password can not be less than 6 digits'))
  } else {
    callback()
  }
}
const loginForm = ref({
  username: 'admin',
  password: '111111'
})
const loginRules = ref({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
})
const passwordType = ref('password')
const loading = ref(false)
const redirect = ref('')
const $route = useRoute()
watch($route, (val) => {
  redirect.value = (val.query.redirect || '/') as string
})
const password = ref()
const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
  nextTick(() => {
    password.value.focus()
  })
}
const loginFormRef = ref()
const $store = useStore()
const $router = useRouter()
const handleLogin = () => {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      $store
        .dispatch('user/login', loginForm.value)
        .then(() => {
          $router.push({ path: redirect.value || '/' })
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    //display: inline-block !important;
    height: 47px !important;
    width: 85% !important;
    display: inline-flex !important;
    background: rgb(0, 0, 0, 0) !important;

    .el-input--normal {
      background: transparent !important;
    }
    .el-input__wrapper {
      background: transparent !important;
      box-shadow: none !important;
    }
    input {
      border-color: #1f2d3d;
    }

    //input {
    //  background: transparent !important;
    //  border: 0px !important;
    //  -webkit-appearance: none !important;
    //  border-radius: 0px !important;
    //  padding: 12px 5px 12px 15px !important;
    //  color: $light_gray !important;
    //  height: 47px !important;
    //  caret-color: $cursor;
    //
    //  &:-webkit-autofill {
    //    box-shadow: 0 0 0px 1000px $bg inset !important;
    //    -webkit-text-fill-color: $cursor !important;
    //  }
    //}
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    background: rgba(0, 0, 0, 0.1) !important;
    border-radius: 5px !important;
    color: #454545 !important;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
