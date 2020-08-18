//index.js
Component({
  behaviors: [wx.$behaviors.pagination],
  data: {},
  methods: {
    getList(page = 1, limit = 10) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: 'https://brain.lololun.top/getList',
          dataType: 'json',
          data: {
            page,
            limit
          },
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
      const list = await this.getList()
      this.setData({
        list
      })
    }
  }
})
