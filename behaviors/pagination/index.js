module.exports = Behavior({
  data: {
    loading: false,
    more: true,
    list: [],
    page: 1
  },
  methods: {
    /**
     * 页面上拉触底事件的处理函数
     */
    async onReachBottom() {
      if (this.data.loading || !this.data.more) return
      this.setData({
        loading: true
      })
      const data = await this.getList(this.data.page)
      this.setData({
        loading: false
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