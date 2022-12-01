// pages/show/show.js
Page({
  data: {

  },

  onLoad(options) {
    const { id, color } = options;
    const that = this;
    wx.request({
      url: `http://localhost:3000/api/v1/flats/${id}`,
      success(res) {
        console.log('flat', res);
        that.handelResponse(res.data.flat);
      }
    })
  },

  changeLocation() {
    const that = this;

    wx.chooseLocation({
      success(res) {
        console.log(res);
        const { latitude, longitude } = res;
        that.updateCoordinates(latitude, longitude)
      }
    })
  },

  updateCoordinates(latitude, longitude) {
    const { id } = this.data.flat;
    const flat = { latitude, longitude };
    const that = this;

    wx.request({
      url: `http://localhost:3000/api/v1/flats/${id}`,
      method: 'PUT',
      data: { flat },
      success(res) {
        console.log('updated?', res);
        that.handelResponse(res.data.flat);
      }
    })
  },

  handelResponse(flat) {
    const markers = [{iconPath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/1200px-Map_pin_icon.svg.png', latitude: flat.latitude, longitude: flat.longitude}]

    this.setData({ flat, markers });
  }
})