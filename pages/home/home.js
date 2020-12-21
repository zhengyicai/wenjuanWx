// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn:"20",
    type:"",
    btn1:"1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: 'TKA评估分析系统' 
    })

  },
  go1:function(){

    wx.navigateTo({
      url: '../person/person?type='+this.data.type
    })

  },
  select1:function(){
    this.setData({
      btn: "10"
    })

    this.setData({
      btn1:"10"
    })




    this.setData({
      type: "10"
    })

  },
  select2:function(){
    this.setData({
      btn: "10"
    })


    this.setData({
      btn1:"20"
    })

    this.setData({
      type: "20"
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