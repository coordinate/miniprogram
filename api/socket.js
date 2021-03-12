import config from '../config'
export default {
  /**
   * 创建socket连接
   * @param url String
   * @param params Object
   */
  connectSocket(url, params) {
    return new Promise((resolve, reject) => {
      wx.connectSocket({
        url: config.WSS + url,
        fail: reject
      })
      wx.onSocketOpen(() => {
        wx.sendSocketMessage({
          data: params,
          fail: reject
        })
        const intervalId = setInterval(() => {
          wx.sendSocketMessage({
            data: params,
            fail: reject
          })
        }, 30 * 1000)
        wx.onSocketMessage(console.log)
        resolve(intervalId)
      })
    })
  },

  /**
   * 关闭 WebSocket 连接
   * @param intervalId 定时器ID
   */
  closeSocket(intervalId) {
    clearInterval(intervalId)
    wx.closeSocket({
      success: (res) => {
        console.log('closeSocket success', res)
      },
      fail: (err) => {
        console.log('closeSocket fail', err)
      }
    })
  }
}