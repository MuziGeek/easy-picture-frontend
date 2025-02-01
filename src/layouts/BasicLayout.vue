<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout>
        <GlobalSider class="sider" />
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
      </a-layout>
      <a-layout-footer class="footer">
        <a href="https://www.easymuzi.cn" target="_blank">
          木南云图库 by Muzi
        </a>
      </a-layout-footer>
    </a-layout>

  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
import GlobalSider from '@/components/GlobalSider.vue'
</script>

<style scoped>
/* #basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
 #basicLayout .content {
   background: linear-gradient(to right, #fefefe, #fff);
   margin-bottom: 28px;
   padding: 28px;
 }
#basicLayout .header {
  padding-inline: 20px;
  margin-bottom: 1px;
  color: unset;
  background: white;
}

#basicLayout .sider {
  background: #fff;
  padding-top: 20px;
  border-right: 0.5px solid #eee;
}

#basicLayout :deep(.ant-menu-root) {
  border-bottom: none !important;
  border-inline-end: none !important;
} */
/* 基础样式 */
#basicLayout {
  min-height: 100vh;
  transition: all 0.3s;
}

/* 亮色主题 */
html[data-theme='light'] #basicLayout {
  background: #fff;
}

html[data-theme='light'] #basicLayout .header {
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

html[data-theme='light'] #basicLayout .sider {
  background: #fff;
  border-right: 1px solid #f0f0f0;
}

html[data-theme='light'] #basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
}

html[data-theme='light'] #basicLayout .footer {
  background: #efefef;
}

/* 暗色主题 */
html[data-theme='dark'] #basicLayout {
  background: #141414;
}

html[data-theme='dark'] #basicLayout .header {
  background: #1f1f1f !important;
  border-bottom: 1px solid #303030;
}

html[data-theme='dark'] #basicLayout .sider {
  background: #1f1f1f !important;
  border-right: 1px solid #303030;
}

html[data-theme='dark'] #basicLayout .content {
  background: #141414 !important;
}

html[data-theme='dark'] #basicLayout .footer {
  background: #1f1f1f !important;
  color: rgba(255, 255, 255, 0.85);
}

html[data-theme='dark'] #basicLayout .footer a {
  color: rgba(255, 255, 255, 0.85);
}

/* 布局样式 */
.footer {
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.content {
  margin-bottom: 28px;
  padding: 28px;
}

.header {
  padding-inline: 20px;
  margin-bottom: 1px;
}

.sider {
  padding-top: 20px;
}

:deep(.ant-menu-root) {
  border-bottom: none !important;
  border-inline-end: none !important;
}

</style>
