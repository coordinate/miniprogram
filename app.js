//app.js

/*
 * 数据打点
 */
const { BxTracker } = require('./tracker/anka-tracker.min.js')
const trackerConfig = require('./tracker/anka-tracker.config.js')
const tracker = BxTracker.generateTrackerInstance(trackerConfig)
tracker.asyncInitWithCommonData({
  open_id: 'mock_open_id',
  union_id: 'mock_union_id'
}).then(() => {
  console.log('初始化成功，开始执行打点任务')
})

/*
 * 调试工具
 */
import weDebug from '@we-debug/core/libs/index'
import vconsole from '@we-debug/plugin-vconsole'
import navigate from '@we-debug/plugin-navigate'
weDebug.use(vconsole)
weDebug.use(navigate, [
  { title: 'test页面跳转', desc: '点击右侧按钮前往test页面', url: '/pages/test/test?foo=bar' }
])
weDebug.init()

import behaviors from './behaviors/index'
import constants from './constants/index'
import config from './config'
import api from './api/api'
import log from './utils/log'
import util from './utils/util'
import dayjs from 'dayjs'
import './utils/lib/zh-cn'
dayjs.locale('zh-cn')

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
    wx.$tracker = tracker
    // 监听小程序更新
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(() => {
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
  },

  globalData: {}
})