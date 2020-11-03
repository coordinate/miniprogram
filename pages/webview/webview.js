// pages/webview/webview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  onWebLoad(e) {
    console.log(e)
  },

  onWebError(e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.url) {
      this.setData({
        url: decodeURIComponent(options.url)
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      path: `/${this.route}?url=${encodeURIComponent(this.data.url)}`
    }
  }
})