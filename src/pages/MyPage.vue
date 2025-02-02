<template>
  <div id="MyPage">
    <!-- 添加背景动画 -->
    <div class="background-animation">
      <div class="gradient-bg"></div>
      <div class="moving-waves"></div>
    </div>

    <!-- 添加宠物动画 -->
    <div class="page-pet">
      <lottie-player
        :src="currentPet.url"
        background="transparent"
        speed="1"
        style="width: 180px; height: 180px"
        loop
        autoplay
      ></lottie-player>
    </div>

    <div class="main-content">
      <!-- 添加装饰元素 -->
      <div class="decorative-elements">
        <div class="floating-circle circle-1"></div>
        <div class="floating-circle circle-2"></div>
        <div class="floating-circle circle-3"></div>
      </div>

      <!-- 用户信息区域 -->
      <div class="user-info-container">
        <div class="glass-effect">
          <div class="avatar-and-text" @click="handleAvatarClick">
            <div class="avatar-container">
              <a-avatar
                class="user-avatar"
                :src="
                  loginUserStore.loginUser.userAvatar ||
                  getDefaultAvatar(loginUserStore.loginUser.userName)
                "
                :size="72"
              />
              <div class="avatar-border"></div>
            </div>
            <div class="text-info-container">
              <div class="user-name">{{ loginUserStore.loginUser.userName || '未登录' }}</div>
              <div class="user-meta" v-if="loginUserStore.loginUser.id">
                <div class="user-id">
                  <span class="id-label">ID: {{ loginUserStore.loginUser.id }}</span>
                  <a-button class="copy-button" type="text" @click.stop="copyUserId">
                    <CopyOutlined />
                  </a-button>
                </div>
                <div class="user-stats" v-if="device !== DEVICE_TYPE_ENUM.PC">
                  <div class="stat-item" @click.stop="handleFollowClick">
                    {{ followAndFans.followCount || 0 }} 关注
                  </div>
                  <div class="stat-divider">·</div>
                  <div class="stat-item" @click.stop="handleFansClick">
                    {{ followAndFans.fansCount || 0 }} 粉丝
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮区域 -->
      <div class="button-container" v-if="loginUserStore.loginUser.id">
        <a-button class="custom-button" @click="handleMySpaceClick">
          <span class="button-content">
            <UserOutlined class="button-icon space-icon" />
            <span class="button-text">我的空间</span>
          </span>
          <RightOutlined class="arrow-icon" />
        </a-button>

        <a-button class="custom-button" @click="handleMyPostsClick">
          <span class="button-content">
            <PictureOutlined class="button-icon posts-icon" />
            <span class="button-text">我的发布</span>
          </span>
          <RightOutlined class="arrow-icon" />
        </a-button>

        <a-button class="custom-button" @click="handleMyTeamsClick">
          <span class="button-content">
            <TeamOutlined class="button-icon team-icon" />
            <span class="button-text">我的团队</span>
          </span>
          <RightOutlined class="arrow-icon" />
        </a-button>

        <a-button class="custom-button" @click="handleSettingClick">
          <span class="button-content">
            <SettingOutlined class="button-icon setting-icon" />
            <span class="button-text">我的资料</span>
          </span>
          <RightOutlined class="arrow-icon" />
        </a-button>

        <a-button class="custom-button" @click="handleClick">
          <span class="button-content">
            <LinkOutlined class="button-icon contact-icon" />
            <span class="button-text">联系我们</span>
          </span>
          <RightOutlined class="arrow-icon" />
        </a-button>

        <a-button class="custom-button logout-button" @click="handleLogoutClick">
          <span class="button-content">
            <LogoutOutlined class="button-icon logout-icon" />
            <span class="button-text">退出登录</span>
          </span>
          <RightOutlined class="arrow-icon" />
        </a-button>
        <!-- 管理员模块按钮 -->
        <template v-if="loginUserStore.loginUser.userRole === 'admin'">
          <a-button class="custom-button" @click="showAdminModal">
            <span class="button-content">
              <ControlOutlined class="button-icon admin-icon" />
              <span class="button-text">管理模块</span>
            </span>
            <RightOutlined class="arrow-icon" />
          </a-button>
        </template>
      </div>

      <!-- 未登录状态的按钮 -->
      <div class="button-container" v-else>
        <a-button class="custom-button login-button" href="/user/login">
          <span class="button-content">
            <LoginOutlined class="button-icon login-icon" />
            <span class="button-text">点击登录</span>
          </span>
        </a-button>

        <a-button class="custom-button" @click="handleClick">
          <span class="button-content">
            <LinkOutlined class="button-icon contact-icon" />
            <span class="button-text">联系我们</span>
          </span>
          <RightOutlined class="arrow-icon" />
        </a-button>
      </div>
    </div>

    <!-- 管理模块模态框 -->
    <a-modal v-model:open="adminModalOpen" title="管理模块" :footer="null" class="admin-modal">
      <div class="admin-buttons">
        <a-button class="admin-button" @click="() => handleAdminClick('userManage')">
          <UserOutlined class="admin-icon" />
          <span>用户管理</span>
        </a-button>

        <a-button class="admin-button" @click="() => handleAdminClick('pictureManage')">
          <PictureOutlined class="admin-icon" />
          <span>图片管理</span>
        </a-button>

        <a-button class="admin-button" @click="() => handleAdminClick('spaceManage')">
          <AppstoreOutlined class="admin-icon" />
          <span>空间管理</span>
        </a-button>

        <a-button class="admin-button" @click="() => handleAdminClick('tagManage')">
          <TagsOutlined class="admin-icon" />
          <span>标签管理</span>
        </a-button>

        <a-button class="admin-button" @click="() => handleAdminClick('categoryManage')">
          <FolderOutlined class="admin-icon" />
          <span>分类管理</span>
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { DEVICE_TYPE_ENUM } from '@/constants/device.ts'
import { getDeviceType } from '@/utils/device.ts'
import {
  UserOutlined,
  LoginOutlined,
  RightOutlined,
  SettingOutlined,
  LogoutOutlined,
  LinkOutlined,
  AppstoreOutlined,
  PictureOutlined,
  TagsOutlined,
  FolderOutlined,
  ControlOutlined,
  TeamOutlined,
  CopyOutlined,
} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { userLogoutUsingPost } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import { h, ref, onMounted, onUnmounted } from 'vue'
import { Modal } from 'ant-design-vue'
import { getFollowAndFansCountUsingPost } from '@/api/userFollowsController'
import '@lottiefiles/lottie-player'
import { useParallax } from '@vueuse/core'

const loginUserStore = useLoginUserStore()
const router = useRouter()
const adminModalOpen = ref(false)
const device = ref<string>('')

// 关注和粉丝数据
const followAndFans = ref({
  followCount: 0,
  fansCount: 0,
})

// 获取关注和粉丝数量
const getFollowAndFansCount = async () => {
  if (!loginUserStore.loginUser.id) return
  try {
    const res = await getFollowAndFansCountUsingPost({
      id: loginUserStore.loginUser.id,
    })
    if (res.data.code === 0) {
      followAndFans.value = res.data.data || { followCount: 0, fansCount: 0 }
    }
  } catch (error) {
    console.error('获取关注粉丝数失败:', error)
  }
}

// 处理关注列表点击
const handleFollowClick = () => {
  router.push({
    path: '/follow-list',
    query: { tab: 'follow' },
  })
}

// 处理粉丝列表点击
const handleFansClick = () => {
  router.push({
    path: '/follow-list',
    query: { tab: 'fans' },
  })
}

// 页面加载时获取设备类型
onMounted(async () => {
  device.value = await getDeviceType()
  getFollowAndFansCount()
  window.addEventListener('scroll', handleScroll)
})

const handleMySpaceClick = () => {
  router.push('/my_space')
}

const handleSettingClick = () => {
  router.push('/user/setting')
}

const handleLogoutClick = async () => {
  Modal.confirm({
    title: null,
    icon: null,
    width: 320,
    footer: null,
    wrapClassName: 'logout-modal',
    centered: true,
    maskClosable: true,
    bodyStyle: {
      padding: 0,
      margin: '0 auto',
    },
    content: h(
      'div',
      {
        class: 'logout-modal-content',
      },
      [
        h(
          'div',
          {
            class: 'warning-icon',
          },
          [h(LogoutOutlined)],
        ),
        h(
          'h3',
          {
            class: 'modal-title',
          },
          '确认退出登录？',
        ),
        h(
          'p',
          {
            class: 'modal-desc',
          },
          '退出后需要重新登录才能继续使用',
        ),
        h(
          'div',
          {
            class: 'modal-actions',
          },
          [
            h(
              'button',
              {
                class: 'cancel-button',
                onClick: () => {
                  Modal.destroyAll()
                },
              },
              '取消',
            ),
            h(
              'button',
              {
                class: 'confirm-button',
                onClick: async () => {
                  try {
                    const res = await userLogoutUsingPost()
                    if (res.data.code === 0) {
                      Modal.destroyAll() // 先关闭弹框
                      loginUserStore.setLoginUser({
                        userName: '未登录',
                      })
                      message.success('退出登录成功')
                      await router.push('/user/login')
                    } else {
                      message.error('退出登录失败，' + res.data.message)
                    }
                  } catch (error) {
                    message.error('退出登录失败，请稍后重试')
                  }
                },
              },
              '确认退出',
            ),
          ],
        ),
      ],
    ),
  })
}

const handleClick = () => {
  window.location.href = 'http://my.lumenglover.com/contact'
}

const showAdminModal = () => {
  adminModalOpen.value = true
}

const handleAdminClick = (route: string) => {
  adminModalOpen.value = false
  router.push(`/admin/${route}`)
}

const handleMyPostsClick = () => {
  router.push('/my_ports')
}

const handleMyTeamsClick = () => {
  router.push('/my_teams')
}

const handleAvatarClick = () => {
  if (device.value !== DEVICE_TYPE_ENUM.PC && loginUserStore.loginUser.id) {
    router.push('/user/setting')
  }
}

// 获取默认头像
const getDefaultAvatar = (userName: string) => {
  const defaultName = userName || 'Guest'
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(defaultName)}&backgroundColor=ffd5dc,ffdfbf,ffd5dc`
}

// 复制用户ID
const copyUserId = () => {
  if (loginUserStore.loginUser.id) {
    navigator.clipboard
      .writeText(loginUserStore.loginUser.id.toString())
      .then(() => {
        message.success('已复制用户ID')
      })
      .catch(() => {
        message.error('复制失败，请手动复制')
      })
  }
}

// 可爱的宠物动画列表
const PETS = [
  {
    name: 'cute-dog',
    url: 'https://assets5.lottiefiles.com/packages/lf20_syqnfe7c.json',
  },
]

// 随机选择一个宠物
const currentPet = ref(PETS[Math.floor(Math.random() * PETS.length)])

// 监听滚动，在移动端时根据滚动位置显示/隐藏宠物
const handleScroll = () => {
  if (window.innerWidth <= 768) {
    const pet = document.querySelector('.page-pet')
    if (pet) {
      const scrolled = window.scrollY + window.innerHeight
      const threshold = document.documentElement.scrollHeight - 100
      if (scrolled > threshold) {
        pet.classList.add('hide')
      } else {
        pet.classList.remove('hide')
      }
    }
  }
}

// 添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 视差效果
const target = ref(null)
const { tilt } = useParallax(target)

defineExpose({
  handleMySpaceClick,
  handleSettingClick,
  handleClick,
  handleLogoutClick,
  handleMyPostsClick,
  showAdminModal,
  handleAdminClick,
  handleMyTeamsClick,
})
</script>

<style scoped>
#MyPage {
  min-height: 80vh;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  margin-left: -20px;
  margin-right: -20px;
  margin-top: -20px;
  border-radius: 24px;
}

/* 背景动画 */
.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.gradient-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ff8e53 0%, #ff6b6b 100%);
  opacity: 0.1;
  animation: gradientShift 10s ease infinite;
}

.moving-waves {
  position: absolute;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%);
  background-size: 60px 60px;
  animation: waveMove 20s linear infinite;
}

.main-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 4px;
}

.user-info-container {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  margin: 4px 0 16px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 24px;
  transform-style: preserve-3d;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
}

.avatar-and-text {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.avatar-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar {
  border-radius: 16px;
  border: 2px solid white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff6f3;
}

.text-info-container {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.user-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.user-id {
  font-size: 13px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 4px;
}

.id-label {
  display: flex;
  align-items: center;
}

.copy-button {
  padding: 2px 4px;
  height: auto;
  font-size: 14px;
  color: #94a3b8;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: #1a1a1a;
    background: #f1f5f9;
  }

  &:active {
    transform: scale(0.95);
  }
}

.button-container {
  background: #ffffff;
  padding: 0;
  gap: 16px;
  margin-top: -12px;
}

.custom-button {
  width: 100%;
  height: 60px;
  margin-bottom: 12px;
  border: none;
  border-radius: 8px;
  background: #ffffff;
  transition: all 0.3s ease;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .button-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .button-icon {
    font-size: 24px;

    &.space-icon {
      color: #10b981;
    }

    &.posts-icon {
      color: #f59e0b;
    }

    &.team-icon {
      color: #0284c7;
    }

    &.setting-icon {
      color: #7c3aed;
    }

    &.contact-icon {
      color: #ec4899;
    }

    &.logout-icon {
      color: #d97706;
    }
  }

  .button-text {
    font-size: 15px;
    color: #1a1a1a;
  }

  .arrow-icon {
    color: #94a3b8;
    font-size: 14px;
  }

  &:hover {
    background: #f8fafc;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(0);
  }
}

/* 装饰元素动画 */
.floating-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.5;
  pointer-events: none;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #ff8e53 0%, #ff6b6b 100%);
  top: -150px;
  right: -150px;
  animation: float 8s ease-in-out infinite;
}

.circle-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
  bottom: -100px;
  left: -100px;
  animation: float 6s ease-in-out infinite reverse;
}

.circle-3 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #ff8e53 0%, #ff6b6b 100%);
  top: 50%;
  left: 50%;
  animation: float 10s ease-in-out infinite;
}

/* 列表动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes waveMove {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .main-content {
    padding: 0 4px;
  }

  .user-info-container {
    margin: 4px 0 16px 0;
    padding: 20px;
  }

  .button-container {
    border-radius: 8px;
    padding: 0;
  }

  .custom-button {
    height: 48px;
    margin-bottom: 0;
    border-bottom: 1px solid #f1f5f9;

    &:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    &:last-child {
      border-bottom: none;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }

  .page-pet {
    transform: scale(0.5);
    right: -20px;
    bottom: 60px;
  }
}

/* 管理员按钮样式 */
:deep(.custom-button:has(.admin-icon)) {
  transform: none;
  box-shadow: none;
  background-color: #ffffff;
}

:deep(.custom-button:has(.admin-icon):hover) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: #f8fafc;
}

/* 管理模块模态框样式 */
.admin-modal {
  :deep(.ant-modal-content) {
    border-radius: 16px;
    overflow: hidden;
    background-color: #ffffff;
  }

  :deep(.ant-modal-header) {
    border-bottom: none;
    padding: 24px 24px 0;
    background-color: #ffffff;
  }
}

.admin-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 8px;
  background-color: #ffffff;
}

.admin-button {
  height: 80px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  transition: all 0.3s ease;
  background-color: #ffffff;

  .admin-icon {
    font-size: 24px;
  }

  span {
    font-size: 14px;
  }

  &:hover {
    background: #f8fafc;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  &:nth-child(1) {
    color: #ea580c;

    &:hover {
      background: #f8fafc;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
  }

  &:nth-child(2) {
    color: #4f46e5;

    &:hover {
      background: #f8fafc;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
  }

  &:nth-child(3) {
    color: #0284c7;

    &:hover {
      background: #f8fafc;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
  }

  &:nth-child(4) {
    color: #7c3aed;

    &:hover {
      background: #f8fafc;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
  }

  &:nth-child(5) {
    color: #d97706;

    &:hover {
      background: #f8fafc;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
  }
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .admin-buttons {
    grid-template-columns: 1fr;
  }

  .admin-button {
    height: 60px;

    .admin-icon {
      font-size: 20px;
    }

    span {
      font-size: 13px;
    }
  }
}

.user-stats {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
}

.stat-item {
  position: relative;
  cursor: pointer;
  transition: color 0.2s ease;
}

.stat-divider {
  color: #cbd5e1;
}

/* 点击效果 */
.stat-item:active {
  color: #1a1a1a;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .user-info-container {
    padding: 20px 16px;
  }

  .user-meta {
    margin-top: 6px;
  }
}

/* 宠物动画样式 */
.page-pet {
  position: fixed;
  right: 20px;
  bottom: 100px;
  z-index: 100;
  pointer-events: none;
  opacity: 0.9;
  transform: scale(0.8);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 0.9;
    transform: scale(0.8);
  }
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .page-pet {
    right: 10px;
    bottom: 80px;
    transform: scale(0.6);
  }

  /* 在移动端，当用户滚动到底部时隐藏宠物 */
  .page-pet.hide {
    opacity: 0;
    transform: scale(0.4) translateY(20px);
  }
}
</style>

<style>
/* 退出登录模态框样式 */
.ant-modal.logout-modal {
  text-align: center !important;
}

.ant-modal.logout-modal .ant-modal-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.ant-modal.logout-modal .ant-modal-content) {
  padding: 0 !important;

  border-radius: 16px !important;
  overflow: hidden !important;
  background: white !important;
  margin: 0 auto !important;
  top: 0 !important;
  position: relative !important;
  left: 0 !important;
  right: 0 !important;
}

/* 确保确认框内容居中 */
:deep(.ant-modal.logout-modal .ant-modal-confirm-body) {
  text-align: center !important;
  margin: 0 !important;
  padding: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

:deep(.ant-modal.logout-modal .ant-modal-confirm-body-wrapper) {
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
}

.logout-modal-content {
  padding: 32px 20px;
  padding-left: 54px;
  text-align: center;
  background: white;
  width: 100%;
  margin: 0 auto;
}

.warning-icon {
  font-size: 48px;
  color: #ff8e53;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.warning-icon .anticon {
  animation: modal-pulse 2s infinite;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
  text-align: center;
}

.modal-desc {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 28px;
  line-height: 1.6;
  max-width: 260px;
  margin: 0 auto;
  text-align: center;
}

.modal-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
}

.cancel-button {
  min-width: 100px;
  height: 38px;
  border-radius: 19px;
  border: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button:hover {
  color: #1a1a1a;
  border-color: #94a3b8;
  background: #f8fafc;
}

.confirm-button {
  min-width: 100px;
  height: 38px;
  border-radius: 19px;
  background: linear-gradient(135deg, #ff8e53 0%, #ff6b6b 100%);
  border: none;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 142, 83, 0.25);
}

.confirm-button:active {
  transform: translateY(1px);
}

@keyframes modal-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  :deep(.ant-modal.logout-modal) {
    padding: 0 16px !important;
  }

  :deep(.ant-modal.logout-modal .ant-modal-content) {
    width: 100% !important;
    max-width: 320px !important;
  }

  :deep(.ant-modal.logout-modal .ant-modal-confirm-body) {
    padding: 0 !important;
  }

  .warning-icon {
    font-size: 40px;
    margin-bottom: 16px;
  }

  .modal-title {
    font-size: 16px;
    margin-bottom: 12px;
  }

  .modal-desc {
    font-size: 13px;
    max-width: 220px;
    margin-bottom: 24px;
  }

  .modal-actions {
    gap: 12px;
  }

  .cancel-button,
  .confirm-button {
    min-width: 90px;
    height: 36px;
    font-size: 13px;
    padding: 0 16px;
  }
}
</style>
