import router from '@/router' // 引入路由实例，确保路径正确

let isBackButtonListening = false

export const handleBackButton = () => {
  return new Promise<void>((resolve, reject) => {
    if (isBackButtonListening) {
      resolve()
      return
    }

    document.addEventListener('plusready', () => {
      try {
        const webview = plus.webview.currentWebview()
        plus.key.addEventListener('backbutton', () => {
          const currentRoute = router.currentRoute.value.path // 获取当前路由路径
          if (currentRoute === '/') {
            const confirmResult = window.confirm('确认退出吗？')
            if (confirmResult) {
              webview.close() // 用户点击确认按钮时，关闭应用
            }
          } else {
            webview.canBack((e: { canBack: boolean }) => {
              if (e.canBack) {
                webview.back(-1) // 返回上一页
              } else {
                webview.close()
              }
            })
          }
          resolve()
        })
        isBackButtonListening = true
      } catch (error) {
        reject(error)
      }
    })
  })
}
