// pages/my/my.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "", //保存昵称
    avatarUrl: "",//保存头像
  },
  //用户登录授权
  getuserInfo(e) {
    wx.cloud.callFunction({
      name: 'login',//调用云函数获取用户唯一openid
      complete: res => {
        console.log(res)
        const openid = res.result.openid
        db.collection('user').where({
          _openid: openid
        }).get().then(res => {
          console.log(res)
          //确保数据库只有一份该用户的信息
          if (res.data == "") {
            console.log("授权登录成功")
            this.setData({
              isFirstLogin: 1
            })
            db.collection('user').add({
              data: {
                nickName: e.detail.userInfo.nickName,
                avatarUrl: e.detail.userInfo.avatarUrl,
              }
            })
          } else {
            console.log("已经登录过不用授权") 
          }
        })
      }
    })
    this.setData({
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl
    })
    wx.setStorageSync('nickName', e.detail.userInfo.nickName)
    wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickName:wx.getStorageSync('nickName'),
      avatarUrl: wx.getStorageSync('avatarUrl')
    })

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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