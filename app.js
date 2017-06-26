//app.js

var addressDataKey = 'address_data_key'

App({

  loadAddressData: function(){
    // 拉取地址数据库保存到本地
    // TODO 网络异常处理
    wx.request({
      url: 'https://raw.githubusercontent.com/ewen0930/china-citylist/master/data/行政区划代码.json',
      success:function(res){
        console.log(res);
        if(res.statusCode != 200){
          return false
        }
        wx.setStorageSync(addressDataKey, res.data.province)
      }
    })
  },

  onLaunch: function () {
    var addressData = wx.getStorageSync(addressDataKey)
    if(!addressData){
      this.loadAddressData()
    }
  },



  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    addressDataKey: addressDataKey,
  }
})
