const { statusBarHeight } = wx.getSystemInfoSync()

export default {
  navigationBar: 44 + statusBarHeight, // 导航栏高度
  statusBar: statusBarHeight, // 状态栏高度
}