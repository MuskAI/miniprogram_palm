// pages/take_photo/take_photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '确定要删除吗？',
      cancelText: '再看看',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  gonext(){
    var that=this
    wx.uploadFile({
      url: 'http://123.207.223.60:8000/wxuploadFile', //仅为示例，非真实的接口地址
      filePath: that.data.imgList[0],
      name: 'file',
      formData: {
        'user': 'test'
      },
      success (res) {
        const data = res.data
        console.log(res.data)
        // const result_path = JSON.parse(data)
        // console.log(result_path)
        // const result = result_path["diagnose_result"]
        // app.globalData.result = result
        // app.globalData.palm_yolo = result_path["diagnose_yolo"]
        // app.globalData.palm_crop = result_path["diagnose_crop"]
        // app.globalData.palm_align = result_path["diagnose_align"]            
        // app.globalData.palm_words = result_path["diagnose_words"]
        // wx.navigateTo({
        //   url: '../showResult/showResult',
        // })
      },
      fail (res){ 
        console.log('upload fail')
      }
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