// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  track1() {
    wx.$tracker.evt('click_btn')
  },

  track2() {
    wx.$tracker.evt('click_btn', {
      page_id: this.pageId,
      custom_data: 'custom_data'
    })
  },

  track3() {
    wx.$tracker.evt('click_btn', {
      page_id: this.pageId,
      app_name: 'app_name',
      template_version: 'template_version',
      app_category: 'app_category',
    })
  },

  track4() {
    for (let i = 0; i < 10; i++) {
      wx.$tracker.evt(
        // action 必须指定
        'test_action',

        // 可以传入对象
        {
          page_type: 'common',
          page_level: 'second_page',
        },

        // 也可以传入方法，注意必须调用 callback
        callback => {
          callback({
            test_key: 'post_moment'
          })
        }
      )
    }
  },

  track5() {
    for (let i = 0; i < 10; i++) {
      wx.$tracker.forceEvt(
        // action 必须指定
        'action_force_log',

        // 可以传入对象
        {
          page_type: 'common',
          page_level: 'second_page',
        },

        // 也可以传入方法，注意必须调用 callback
        callback => {
          callback({
            test_key: 'post_moment'
          })
        }
      )
    }
  },

  track6() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.$tracker.pv('__viewPage', {
      page_id: this.pageId,
      page_type: 'common',
      page_title: '首页-我的家族',
      page_level: 'tabbar_page'
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.$tracker.forceEvt('force_log')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})