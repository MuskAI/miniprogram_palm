// pages/showResult/showResult.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const result = app.globalData.result
    const palm_img = app.globalData.palm_img
    console.log(result)
    this.setData({
      result:result,
      palm_img:palm_img,
      palm_yolo:app.globalData.palm_yolo,
      palm_crop:app.globalData.palm_crop,
      palm_align:app.globalData.palm_align,
      palm_words:app.globalData.palm_words
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

  },
  onResult: function(){
    
    wx.previewImage({
      current: this.data.imgalist, // 当前显示图片的http链接   
      urls: this.data.imgalist // 需要预览的图片http链接列表   
    })  
    wx.getImageInfo({// 获取图片信息（此处可不要）
      src: 'https://www.cslpyx.com/weiH5/jrkj.jpg',
      success: function (res) {
        console.log(res.width)
        console.log(res.height)
      }
  })}
})