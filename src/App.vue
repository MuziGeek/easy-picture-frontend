<template>
  <ConfigProvider
    :theme="{
      algorithm: darkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
  >
    <div id="app">
      <BasicLayout />
    </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
// 引入组件
import BasicLayout from '@/layouts/BasicLayout.vue';

// 引入 Ant Design Vue 中文语言包
import zhCN from 'ant-design-vue/es/locale/zh_CN';

// 引入 dayjs 及其中文语言包
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

// 引入 Ant Design Vue 主题配置
import { ConfigProvider, theme } from 'ant-design-vue';
import { computed } from 'vue';

// 设置 dayjs 使用中文语言环境
dayjs.locale('zh-cn');

const darkTheme = computed(() => {
  return document.documentElement.getAttribute('data-theme') === 'dark'
})
</script>

