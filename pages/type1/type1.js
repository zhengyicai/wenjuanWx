// pages/type/type.js
var utils = require("../../utils/util.js")

const app = getApp()

const url = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {

    show1:"",
    show2:"",
    show3:"",
    show4:"",
    show5:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
    wx.setNavigationBarTitle({
      title: 'TKA评估分析系统' 
    })
  },


  loadData:function(e){

    var that = this;
    // that.setData({
    //       title: this.data.array[e.detail.value]
    // });

    wx.request({
      url: url+'/sysResidentAnswer/getAnswerState', 
      data: {'residentId':wx.getStorageSync('residentId'),classes:"20"},
      header: {
      
      'content-type': 'application/json' // 默认值
      
      },success: function(res) {
         
        
      // console.log(res.data.data.length);

          for(var i=0;i<res.data.data.length;i++){
              if("10" == res.data.data[i].type){
                that.setData({
                      show1:"10"
                });
              }

              if("20" == res.data.data[i].type){
                that.setData({
                      show2:"10"
                });
              }

              if("30" == res.data.data[i].type){
                that.setData({
                      show3:"10"
                });
              }

              if("40" == res.data.data[i].type){
                that.setData({
                      show4:"10"
                });
              }

              if("50" == res.data.data[i].type){
                that.setData({
                      show5:"10"
                });
              }
              


          }
        
     
      }
      
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