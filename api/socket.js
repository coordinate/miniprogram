import config from '../config'
export default {
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
        wx.onSocketMessage(resolve)
      })
    })
  }
}