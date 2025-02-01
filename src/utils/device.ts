export function getDeviceType(): 'mobile' | 'pc' {
  // 获取当前窗口的宽度，优先使用 window.innerWidth，如果不存在则依次尝试 document.documentElement.clientWidth 和 document.body.clientWidth
  const screenWidth: number = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  // 定义一个阈值，小于该宽度的设备被认为是移动端，可根据实际需求调整
  const maxMobileWidth: number = 768;

  // 根据屏幕宽度判断设备类型
  return screenWidth <= maxMobileWidth? 'mobile' : 'pc';
}

