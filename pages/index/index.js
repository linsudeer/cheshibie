const app = getApp()
Page({
  onLoad() {
    this.ctx = wx.createCameraContext()
	this.fileSysMgr = wx.getFileSystemManager()
  },
  takePhoto() {
	  var that = this
    this.ctx.takePhoto({
      quality: 'normal',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
		this.fileSysMgr.readFile({
          filePath: res.tempImagePath, encoding: "base64", complete: function (res) {
            // 获取识别信息
            that.getCarInfo(res.data)
          }, fail: function (errorMsg) {
            console.log(errorMsg)
          }
        })
      }
    })
  },
  startRecord() {
    this.ctx.startRecord({
      success: (res) => {
        console.log('startRecord')
      }
    })
  },
  stopRecord() {
    this.ctx.stopRecord({
      success: (res) => {
        this.setData({
          src: res.tempThumbPath,
          videoSrc: res.tempVideoPath
        })
      }
    })
  },
  getAccessToken() {
    wx.request({
      url:"https://aip.baidubce.com/oauth/2.0/token",
      data:{
        grant_type:"client_credentials",
        client_id:"shybkCT0a8wOds5GGcLxQ2Gd",
        client_secret:"4nXLgUTND8SsYcwGh1qZKAaShz4zS7av"
      },
      header:{

      },
      method:"POST",
      success:function(data){
        app.globalData.expires_in = data.expires_in
        app.globalData.accessToken = data.access_token
        console.log(data)
      },
      fail:function(e){
        console.log(e)
      }
    })
  },
  getCarInfo(img){
    wx.showLoading("加载中...")
    var that = this
    wx.request({
      url: "https://aip.baidubce.com/rest/2.0/image-classify/v1/car",
      data: {
        baike_num:5,
        access_token: "24.302a8b6f8545589cc2c24356cb6cd69f.2592000.1558507840.282335-16075693",
        image: img
      },
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        wx.hideLoading()
        that.setData({
          src: res
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