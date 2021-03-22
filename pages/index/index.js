//index.js
Page({
  behaviors: [wx.$behaviors.pagination],
  data: {
    loading: true
  },
  toWebview() {
    wx.navigateTo({
      url: `/pages/webview/webview?url=${encodeURIComponent('https://baidu.com')}`
    })
  },
  getList(pageNum = 1, pageSize = 10) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://brain.lololun.top/getList',
        data: { pageNum, pageSize },
        dataType: 'json',
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },
  async onLoad(options) {
    this.initData()
    this.setData({ loading: false })
    console.log(wx.$util.funEncodeHTML('<span>by ThinkerZhang</span>'))
    console.log(wx.$util.funDecodeHTML('&lt;span&gt;by ThinkerZhang&lt;/span&gt;'))
  }
})
