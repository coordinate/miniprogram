import constants from '../constants/index'

/**
 * 二次封装navigateBack
 * @param delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页
 */
const navigateBack = (delta = 1) => {
  wx.navigateBack({
    delta,
    fail: (err) => {
      console.log('navigateBack fail', err)
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  })
}

/**
 * 二次封装openSetting
 * @param scope 用户授权设置信息属性（默认为scope.writePhotosAlbum）
 * @param withSubscriptions 是否同时获取用户订阅消息的订阅状态，默认不获取
 */
const openSetting = (scope = 'scope.writePhotosAlbum', withSubscriptions = false) => {
  return new Promise((resolve, reject) => {
    const content = `您拒绝了“${constants.scopeMappings[scope]}”授权\n请点击确定按钮重新打开授权`
    showModal('提示', content).then(result => {
      // console.log(result)
      wx.openSetting({
        withSubscriptions,
        success: (res) => {
          console.log('openSetting success', res)
          if (res.authSetting[scope]) {
            resolve(res)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          console.log('openSetting fail', err)
          reject(err)
        }
      })
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 二次封装showModal
 * @param title 提示的标题
 * @param content 提示的内容
 * @param options 其它配置选项
 */
const showModal = (title = '', content = '', options = {}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      ...options,
      success: (res) => {
        // console.log('showModal success', res)
        if (res.confirm) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        console.log('showModal fail', err)
        reject(err)
      }
    })
  })
}

/**
 * 二次封装showToast
 * @param title 提示的内容
 * @param icon 图标
 * @param options 其它配置选项
 */
const showToast = (title = '系统异常，请稍后再试~', icon = 'none', options = {}) => {
  wx.showToast({
    ...options,
    title,
    icon
  })
}

// 防抖函数
const debounce = (fn, delay = 1000) => {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

// 节流函数
const throttle = (fn, delay = 5000) => {
  let preTime = +new Date()
  return function () {
    const nowTime = +new Date()
    if (nowTime - preTime >= delay) {
      fn.apply(this, arguments)
      preTime = nowTime
    }
  }
}

module.exports = {
  navigateBack,
  openSetting,
  showModal,
  showToast,
  debounce,
  throttle
}