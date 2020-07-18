const { statusBarHeight } = wx.getSystemInfoSync()
const { miniProgram: { envVersion = 'release' } } = wx.getAccountInfoSync()
let env = 'prod'
if (envVersion === 'develop') {
  // 工具或者真机 开发环境
  env = 'dev'
} else if (envVersion === 'trial') {
  // 测试环境(体验版)
  env = 'dev'
} else if (envVersion === 'release') {
  // 正式环境
  env = 'prod'
}
const URL_ADMIN = {
  dev: 'https://dev.hello4am.com',
  prod: 'https://prod.hello4am.com'
}
const WSS_ADMIN = {
  dev: 'wss://dev.hello4am.com',
  prod: 'wss://prod.hello4am.com'
}
const HOST = 'https://cdn.hello4am.com'
const config = {
  navigationBar: 44 + statusBarHeight, // 导航栏高度
  statusBar: statusBarHeight, // 状态栏高度
  envVersion, // 小程序版本 develop 开发版 trial 体验版 release 正式版
  URL: `${URL_ADMIN[env]}`, // 接口地址
  WSS: `${WSS_ADMIN[env]}`, // socket
  URL_UPLOAD: `${HOST}/api`, // 上传地址
  URL_PREFIX: `${HOST}/web/` // 资源前缀
}
export default config