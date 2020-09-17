import constants from '../constants/index'

/**
 * 二次封装navigateBack
 */
const navigateBack = () => {
  wx.navigateBack({
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
 */
const openSetting = (scope = 'scope.writePhotosAlbum') => {
  return new Promise((resolve, reject) => {
    const content = `您拒绝了“${constants.scopeMappings[scope]}”授权\n请点击确定按钮重新打开授权`
    showModal('提示', content).then(result => {
      // console.log(result)
      wx.openSetting({
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
 * @param showCancel 是否显示取消按钮
 */
const showModal = (title = '', content = '', showCancel = true) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      showCancel,
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
 */
const showToast = (title = '系统异常，请稍后再试~', icon = 'none') => {
  wx.showToast({
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