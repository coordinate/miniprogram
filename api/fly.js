import config from '../config'
import util from '../utils/util'
import Fly from './lib/wx.umd.min'
const fly = new Fly()
const tokenFly = new Fly()
fly.config.baseURL = config.URL
tokenFly.config = fly.config
export let ysToken = wx.getStorageSync('token')
let unlock = false

// 登录获取token
function getToken() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        // console.log('login success', res)
        tokenFly.get(`/auth/${config.APPID}/ma/${res.code}`).then((result) => {
          if (result.data.code === 200) {
            const { token } = result.data.data
            wx.setStorageSync('token', token)
            ysToken = token
            resolve(token)
          } else {
            reject(result.data)
          }
        })
      },
      fail: (err) => {
        console.log('login fail', err)
        reject(err)
      }
    })
  })
}

// 检查登录态
function checkSession(request) {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: (res) => { // session_key 未过期，并且在本生命周期一直有效
        console.log('checkSession success', res)
        request.headers['Authorization'] = `Bearer ${ysToken}`
        resolve(request)
      },
      fail: (err) => { // session_key 已经失效，需要重新执行登录流程
        console.log('checkSession fail', err)
        fly.lock() // 锁定当前实例，后续请求会在拦截器外排队
        getToken().then(() => {
          request.headers['Authorization'] = `Bearer ${ysToken}`
          fly.unlock() // 解锁后，会继续发起请求队列中的任务
          resolve(request)
        })
      }
    })
  })
}

// 请求拦截器
fly.interceptors.request.use((request) => {
  if (ysToken) {
    const timestamp = wx.getStorageSync('timestamp')
    if (timestamp && (new Date().getTime() - timestamp < 60 * 1000)) {
      // 一分钟内无需重复调用 wx.checkSession
      request.headers['Authorization'] = `Bearer ${ysToken}`
      return request
    } else {
      wx.setStorageSync('timestamp', +new Date())
      return checkSession(request)
    }
  } else {
    fly.lock() // 锁定当前实例，后续请求会在拦截器外排队
    return getToken().then(() => {
      request.headers['Authorization'] = `Bearer ${ysToken}`
      fly.unlock() // 解锁后，会继续发起请求队列中的任务
      return request
    })
  }
})

// 响应拦截器
fly.interceptors.response.use(function (response) {
  if (response.data.code === 200) {
    unlock = false
    return response.data
  } else if (response.data.code === 401) { // token过期
    if (unlock) return fly.request(response.request)
    this.lock() // 锁定当前实例，后续请求会在拦截器外排队
    return getToken().then(() => {
      unlock = true
      this.unlock() // 解锁后，会继续发起请求队列中的任务
      return fly.request(response.request)
    })
  } else { // 其他错误
    console.error('err===>', response.data)
    util.showToast(response.data.msg)
    return Promise.reject(response.data)
  }
}, (err) => {
  util.showToast()
  console.error('err===>', err)
  return Promise.reject(err)
})

export default fly