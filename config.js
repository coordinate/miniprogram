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
  prod: 'https://prod.hello4am.com'
}
const WSS_ADMIN = {
  dev: 'wss://dev.hello4am.com',
  prod: 'wss://prod.hello4am.com'
}
const HOST = 'https://cdn.hello4am.com'
const config = {
  URL_PREFIX: `${HOST}/web/`, // 资源前缀
  URL_UPLOAD: `${HOST}/api`, // 上传地址
  URL: `${URL_ADMIN[env]}`, // 接口地址
  WSS: `${WSS_ADMIN[env]}`, // socket
  VERSION: envVersion, // 小程序版本 
}

export default config