//app.js
import behaviors from './behaviors/index'
import constants from './constants/index'
import config from './config'
import api from './api/api'
import log from './utils/log'
import util from './utils/util'
import dayjs from 'dayjs'
import './utils/lib/zh-cn'
dayjs.locale('zh-cn')

import weDebug from '@we-debug/core/libs/index'
import vconsole from '@we-debug/plugin-vconsole'
weDebug.use(vconsole)
weDebug.init()

App({
  onLaunch() {
    // 注册全局方法
    wx.$behaviors = behaviors
    wx.$constants = constants
    wx.$config = config
    wx.$api = api
    wx.$log = log
    wx.$util = util
    wx.$dayjs = dayjs
    // 监听小程序更新
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(() => {
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
  },

  globalData: {}
})