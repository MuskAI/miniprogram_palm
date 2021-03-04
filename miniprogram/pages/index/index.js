//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    swiperList:{
      url: '/images/logo.png',
      url: '/images/example.png',
    },
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,

  },
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  error(e) {
    console.log(e.detail)
  },
  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  gototakephoto(){
    console.log('gototakephoto')
    wx.navigateTo({
      url: '/pages/take_photo/take_photo',
    })
  },

  pushTakePhoto: function () {
    console.log('ok')
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success (res) {
        const tempFilePaths = res.tempFilePaths
        app.globalData.palm_img = tempFilePaths[0]
        wx.showLoading({
          title: 'AI诊断中，请稍等片刻',
        }),
        wx.uploadFile({
          url: 'http://123.207.223.60:8000/wxuploadFile', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          
          success (res) {
            const data = res.data
            const result_path = JSON.parse(data)
            console.log(result_path)
            const result = result_path["diagnose_result"]
            app.globalData.result = result
            app.globalData.palm_yolo = result_path["diagnose_yolo"]
            app.globalData.palm_crop = result_path["diagnose_crop"]
            app.globalData.palm_align = result_path["diagnose_align"]            
            app.globalData.palm_words = result_path["diagnose_words"]
            wx.navigateTo({
              url: '../showResult/showResult',
            })
          },
          fail (res){ 
            console.log('upload fail')
          }
        })
      }
    })
  },
})