//app.js
import dayjs from 'dayjs'
import config from './config'
import api from './api/api'
import log from './utils/log'
import util from './utils/util'
import constants from './constants/index'

App({
  onLaunch() {
    // 注册全局方法
    wx.$dayjs = dayjs
    wx.$config = config
    wx.$api = api
    wx.$log = log
    wx.$util = util
    wx.$constants = constants
    // 监听小程序更新
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(() => {
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
  },

  globalData: {}
})