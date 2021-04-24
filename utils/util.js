import constants from '../constants/index'
import download from '../api/download'
import config from '../config'

// 文件扩展名匹配正则
const getFileExtendingName = (url) => {
  const matches = url.match(/\.[^\.]+$/)
  if (matches) return matches[0]
  return ''
}

/**
 * 转义HTML标签的方法
 * @param  {String} str 需要转义的HTML字符串
 * @return {String}     转义后的字符串
 */
const funEncodeHTML = (str) => {
  if (typeof str === 'string') {
    return str.replace(/<|&|>/g, (matches) => {
      return ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;'
      })[matches]
    })
  }
  return ''
}

/**
 * 反转义HTML标签的方法
 * @param  {String} str 需要反转义的字符串
 * @return {String}     反转义后的字符串
 */
const funDecodeHTML = (str) => {
  if (typeof str === 'string') {
    return str.replace(/&lt;|&gt;|&amp;/g, (matches) => {
      return ({
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&'
      })[matches]
    })
  }
  return ''
}

// 格式化数字
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 加载自定义字体
const loadFontFace = (fonts = []) => {
  fonts.forEach(v => {
    wx.loadFontFace({
      global: true,
      family: v.family,
      source: `url('${config.URL_PREFIX}/fonts/${v.file}')`,
      scopes: ['webview', 'native'],
      // success: console.log,
      fail: console.log
    })
  })
}

/**
 * 二次封装openDocument
 * @param url 文件下载地址
 * @param fileName 指定文件名字（包含后缀，若是纯标题则需要解开下面注释）
 * @param showMenu 是否显示右上角菜单
 */
const openDocument = (url, fileName, showMenu = true) => {
  wx.showLoading({ title: '正在打开' })
  // 添加后缀 如果fileName不包含后缀则需要解开下面注释
  // fileName = fileName + getFileExtendingName(url)
  download.downloadFile(url, fileName).then((filePath) => {
    wx.openDocument({
      filePath,
      showMenu,
      success: (res) => {
        console.log('openDocument success', res)
        wx.hideLoading()
      },
      fail: (err) => {
        console.log('openDocument fail', err)
        showToast('打开失败')
        wx.hideLoading()
      }
    })
  }).catch((error) => {
    showToast('下载失败')
    wx.hideLoading()
  })
}

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
    showModal('提示', content).then((result) => {
      // console.log(result)
      wx.openSetting({
        withSubscriptions,
        success: (res) => {
          // console.log('openSetting success', res)
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
    }).catch((error) => {
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
      ...options,
      content,
      title,
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
  wx.showToast({ ...options, title, icon })
}

/**
 * object 转 query string
 * @param obj 需要转化的对象
 */
const queryStr = (obj = {}) => {
  return Object.keys(obj).map(v => `${encodeURIComponent(v)}=${encodeURIComponent(obj[v])}`).join('&')
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
  getFileExtendingName,
  funEncodeHTML,
  funDecodeHTML,
  formatNumber,
  loadFontFace,
  openDocument,
  navigateBack,
  openSetting,
  showModal,
  showToast,
  queryStr,
  debounce,
  throttle
}