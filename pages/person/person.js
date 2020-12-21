// pages/person/person.js

var utils = require("../../utils/util.js")

const app = getApp()

const url = app.globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    cardNo:"1234567",
    phone:"",
    showOne:"10",
    person:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(params) {
    this.setData({
      type:params.type,
    })

    wx.setNavigationBarTitle({
      title: 'TKA评估分析系统' 
    })


    wx.setStorageSync('type',params.type);

    console.log(wx.getStorageSync('type'));
  },  

  nameblur:function(e){
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })

    
 },
 sent:function(){

  var that = this;
    console.log("phone="+this.data.phone);


    wx.request({
      url: url+'/sysResident/phone', 
      data: {'phone':that.data.phone},
      header: {
      
      'content-type': 'application/json' // 默认值
      
      },success: function(res) {
         
        if(res.data.data!=null &&  res.data.data!=[]){
          that.setData({
            showOne: "20"
          })
          that.setData({
            person: res.data.data
          })
          
          
          wx.setStorageSync('residentId',res.data.data.id);
          wx.setStorageSync('phone',res.data.data.phone);
          wx.setStorageSync('name',res.data.data.name);
          wx.setStorageSync('type2',res.data.data.type); //患者位置 10：左脚  20：右脚
          wx.setStorageSync('cardNo',res.data.data.cardNo); //患者位置 10：左脚  20：右脚

        }else{
          wx.showToast({
            title: '数据查询不到，请重新输入',
            icon: 'none',
            duration: 2000
          })

        }
      }
    })    





    // if(this.data.phone==this.data.cardNo){
     
    // }else{
     
      

    // }
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