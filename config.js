let env = 'prod' // 环境
const { miniProgram: { envVersion = 'release' } } = wx.getAccountInfoSync()
if (envVersion === 'develop') { // develop 开发版
  // 工具或者真机 开发环境
  env = 'dev'
} else if (envVersion === 'trial') { // trial 体验版
  // 测试环境(体验版)
  env = 'dev'
} else if (envVersion === 'release') { // release 正式版
  // 正式环境
  env = 'prod'
}
const URL_ADMIN = {
  dev: 'https://dev.hello4am.com',
  test: 'https://test.hello4am.com',
  prod: 'https://prod.hello4am.com'
}
const WSS_ADMIN = {
  dev: 'wss://dev.hello4am.com',
  test: 'wss://test.hello4am.com',
  prod: 'wss://prod.hello4am.com'
}
const config = {
  APPID: 'wx90a9e8c50f189d58', // 小程序appid
  URL_PREFIX: 'https://cdn.web.dev.hello4am.com/static', // 静态资源前缀
  URL_UPLOAD: `${URL_ADMIN[env]}/public/upload`, // 文件上传地址
  URL: URL_ADMIN[env], // api接口地址
  WSS: WSS_ADMIN[env], // socket地址
  VERSION: envVersion, // 小程序版本
}

export default config