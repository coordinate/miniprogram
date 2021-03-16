module.exports = Behavior({
  data: {
    ready: false, // 是否初次加载
    load: false, // 是否正在加载
    more: true, // 是否加载全部
    list: [],
    page: 1
  },
  methods: {
    /**
     * 初始化数据
     */
    async initData() {
      const list = await this.getList()
      this.setData({ ready: true, more: true, list })
      this.data.page = 1
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    async onReachBottom() {
      const { load, more, page, list } = this.data
      if (load || !more) return
      this.setData({ load: true })
      const data = await this.getList(page + 1)
      this.setData({ load: false })
      if (data.length) {
        this.setData({ list: list.concat(data) })
        this.data.page++
      } else {
        this.setData({ more: false })
      }
    }
  }
})