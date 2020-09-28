const { statusBarHeight } = wx.getSystemInfoSync()
const scopeMappings = {
  'scope.userInfo': '用户信息', // 对应接口 wx.getUserInfo
  'scope.userLocation': '地理位置', // 对应接口 wx.getLocation, wx.chooseLocation
  'scope.userLocationBackground': '后台定位', // wx.startLocationUpdateBackground
  'scope.address': '通讯地址', // 对应接口 wx.chooseAddress(20200925无需获取用户授权)
  'scope.invoiceTitle': '发票抬头', // 对应接口 wx.chooseInvoiceTitle(20200925无需获取用户授权)
  'scope.invoice': '获取发票', // 对应接口 wx.chooseInvoice(20200925无需获取用户授权)
  'scope.werun': '微信运动步数', // 对应接口 wx.getWeRunData
  'scope.record': '录音功能', // 对应接口 wx.startRecord 
  'scope.writePhotosAlbum': '保存到相册', // wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum
  'scope.camera': '摄像头' // 对应[camera]((camera)) 组件
}

export default {
  navigationBar: 44 + statusBarHeight, // 导航栏高度
  statusBar: statusBarHeight, // 状态栏高度
  scopeMappings, // 用户授权设置信息
}