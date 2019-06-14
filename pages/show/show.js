const app = getApp()
Page({
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var res = wx.getStorageSync(app.globalData.storage_carimage_key) || {}
    this.getCarInfo(res.imgData)
    this.setData({
      imgData:res.imgData,
    })
  },
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
  },

  prevImg: function () {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current > 0 ? current - 1 : swiper.imgUrls.length - 1;
    this.setData({
      swiper: swiper,
    })
  },

  nextImg: function () {
    console.log(2);
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current < (swiper.imgUrls.length - 1) ? current + 1 : 0;
    this.setData({
      swiper: swiper,
    })
  },
  getCarInfo(img) {
    var that = this
    wx.request({
      url: "https://aip.baidubce.com/rest/2.0/image-classify/v1/car",
      data: {
        access_token: "24.1cd9dc0d227096bbd2ea851bcb78b2b0.2592000.1563082712.282335-16075693",
        image: img,
        baike_num: 2
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        wx.hideLoading()
        
        that.setData({
          carInfo: res.data
        })
        console.log(res)
      },
      fail: function (e) {
        console.log(e)
        wx.hideLoading()
      }
    })
  },
})
