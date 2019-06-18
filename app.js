//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        this.getBaiduToken()
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getBaiduToken:function(){
    var that = this
    var expires = wx.getStorageSync(that.globalData.baiduApiExpires)
    if (expires && expires > new Date().getTime()){
      return wx.getStorageSync(that.globalData.baiduApiToken)
    }
    wx.request({
      url: "https://aip.baidubce.com/oauth/2.0/token",
      data: {
        grant_type: "client_credentials",
        client_id: "shybkCT0a8wOds5GGcLxQ2Gd",
        client_secret: "4nXLgUTND8SsYcwGh1qZKAaShz4zS7av"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        wx.setStorageSync(that.globalData.baiduApiToken, res.data.access_token)
        wx.setStorageSync(that.globalData.baiduApiExpires, new Date().getTime()+res.data.expires_in)
      },
      fail: function (e) {
        console.log(e)

      }
    })
  },
  globalData: {
    userInfo: null,
    storage_carimage_key:'camer_car_img',
    baiduApiToken:'baidu_api_token',
    baiduApiExpires:"baidu_api_expires_in"
  }
})