// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    
  },

  onLoad(options) {
    const that = this;

    wx.request({
      url: 'http://localhost:3000/api/v1/flats',
      success(res) {
        console.log('flats', res);
        const { flats } = res.data;
        that.setData({ flats })
      }
    })
  },

  goToShow(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/show/show?id=${id}&color=red`,
    })
  }
})
