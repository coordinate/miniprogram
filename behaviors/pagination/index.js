module.exports = Behavior({
  data: {
    load: false,
    more: true,
    list: [],
    page: 2
  },
  methods: {
    /**
     * 页面上拉触底事件的处理函数
     */
    async onReachBottom() {
      if (this.data.load || !this.data.more) return
      this.setData({
        load: true
      })
      const data = await this.getList(this.data.page)
      this.setData({
        load: false
      })
      if (data.length) {
        this.data.page++
        this.setData({
          list: this.data.list.concat(data)
        })
      } else {
        this.setData({
          more: false
        })
      }
    }
  }
})