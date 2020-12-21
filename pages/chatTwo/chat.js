// chat.js
// let toast = require('../../utils/toast.js');
let chatInput = require('../../modules/chat-input/chat-input');
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxchatLists: ['test1','test2'],
    //array: ['非常满意', '满意', '一般', '不满意','非常不满意'],
    array: ['没有影响', '轻微影响', '中度影响', '较重影响','重度影响', '不能做该活动'],
    array1: ['娱乐活动', '健身和健身活动'],
    array2: ['不能站立', '0-5 分钟', '6-15 分钟', '16-30 分钟','31-60 分钟', '超过 1 小时'],
    title1:"请选择分类",
    title2:"请选择活动",
    title:"请选择您的答案",
    pickerTitle:"请选择您的答案",
    friendHeadUrl: '',
    // textMessage: '',
    chatItems: [],
    scrollTopTimeStamp: 0,
    height: 0,  //屏幕高度
    chatHeight:0,//聊天屏幕高度
    normalDataTime:'',
    message:"",
    top:100,
    showOne:"20"
  },
//item的所有单向信息
// {
//     dataTime: '',//当前时间
//     msg_type: '',//发送消息类型
//     userImgSrc: '',//用户头像
//     textMessage: '',//文字消息
//     voiceSrc: '',//录音的路径
//     voiceTime: 0,//录音的时长
//     sendImgSrc: '',//图片路径
//   }

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;

   
    
    _this.initData();
      //获取屏幕的高度
      wx.getSystemInfo({
        success(res) {
          _this.setData({
            height: wx.getSystemInfoSync().windowHeight,
            chatHeight: wx.getSystemInfoSync().windowHeight-205
          })
        }
      })
    },
    initData: function () {
      let that = this;
      let systemInfo = wx.getSystemInfoSync();
      chatInput.init(this, {
          systemInfo: systemInfo,
          minVoiceTime: 1,
          maxVoiceTime: 60,
          startTimeDown: 56,
          format: 'mp3',//aac/mp3
          sendButtonBgColor: 'mediumseagreen',
          sendButtonTextColor: 'white',
          extraArr: [{
              picName: 'choose_picture',
              description: '照片'
          }, {
              picName: 'take_photos',
              description: '拍摄'
          }],
          // tabbarHeigth: 48
      });

      that.setData({
        pageHeight: systemInfo.windowHeight,
        normalDataTime: utils.formatTime(new Date()),
      });
      wx.setNavigationBarTitle({
          title: '与医生聊天中'
      });
      that.textButton();
      that.extraButton();
      that.voiceButton();
  },
  bindPickerChange: function(e) {
   // console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;

    that.setData({
      title: this.data.array[e.detail.value]
 });

    this.setData({chatItems: that.data.chatItems.concat(this.data.title2+ ","+ this.data.array[e.detail.value] )})

  
    var len = 1
    that.setData({
        top: 1200 * len 
    });


  },
  bindPickerChange2:function(e){
    var that = this;
    that.setData({
      title2: this.data.array2[e.detail.value]
 });

  },

  bindPickerChange1: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
     var that = this;
     console.log(this.data.array1[e.detail.value] );

     that.setData({
          title1: this.data.array1[e.detail.value]
     });

     //this.setData({chatItems: that.data.chatItems.concat(this.data.array1[e.detail.value] )})
    if(e.detail.value=='0'){
      that.setData({
          array2: ['游泳','高尔夫球（18 洞）','公路骑自行车（＞30min）','园艺（例如种花草、种菜）','保龄球运动','球拍类运动（例如羽毛球、乒乓球)','长距离行走/竞走','跳舞/广场舞','伸展运动类（例如太极）']
      });

    }else{
      that.setData({
        array2: ['举重训练','腿部屈伸训练','台阶踩踏训练','健身脚踏车训练','健身跑训练','腿部推蹬训练','椭圆练习仪训练','有氧健身训练']
    }); 
      
    }
   
    
 
 
   },

  sent:function(){
    var that = this;
    console.log(that.data.message);
    //that.data.wxchatLists.concat(that.data.message);

    this.setData({chatItems: that.data.chatItems.concat(that.data.message)})
    console.log(that.data.chatItems);
    that.setData({
      message: "",
    })

    var len = 1
    that.setData({
        top: 1200 * len 
    });
    // that.setData({
    //   wxchatLists: list,
    // })



   

    setTimeout(function () {
      that.setData({
        showOne: '10'
      });
     }, 1000) //延迟时间 这里是1秒

  },

  message: function(e) {
    let that = this;
  
     that.setData({
      message: e.detail.value,
     })
   
  },
  bindViewTapUrlOne: function(res) {
    let that = this;
    console.log(res.currentTarget.dataset.cap);
    this.setData({chatItems: that.data.chatItems.concat(res.currentTarget.dataset.cap)})
    var len = 1
    that.setData({
        top: 1200 * len 
    });


    //console.log(res);
  },
  textButton: function () {
    var that = this;
      chatInput.setTextMessageListener(function (e) {
        let content = e.detail.value;
        console.log(content);
        var list = that.data.wxchatLists;
        var temp = {
          userImgSrc: '../../image/chat/extra/close_chat.png',
          textMessage: content,
          dataTime: utils.formatTime(new Date()),
          msg_type: 'text',
          type: 1
        };
        list.push(temp);
        that.setData({
          wxchatLists: list,
        })
      });
    
  },
  voiceButton: function () {
    var that = this;
    chatInput.recordVoiceListener(function (res, duration) {
      let tempFilePath = res.tempFilePath;
      let vDuration = duration;
      console.log(tempFilePath);
      console.log(vDuration+"这是voice的时长");

      var list = that.data.wxchatLists;
      var temp = {
        userImgSrc: '../../image/chat/extra/close_chat.png',
        voiceSrc: tempFilePath,
        voiceTime: vDuration,
        dataTime: utils.formatTime(new Date()),
        msg_type: 'voice',
        type: 1
      };
      list.push(temp);
      that.setData({
        wxchatLists: list,
      })
    });
    chatInput.setVoiceRecordStatusListener(function (status) {
        switch (status) {
            case chatInput.VRStatus.START://开始录音

                break;
            case chatInput.VRStatus.SUCCESS://录音成功

                break;
            case chatInput.VRStatus.CANCEL://取消录音

                break;
            case chatInput.VRStatus.SHORT://录音时长太短

                break;
            case chatInput.VRStatus.UNAUTH://未授权录音功能

                break;
            case chatInput.VRStatus.FAIL://录音失败(已经授权了)

                break;
        }
    })
  },
  extraButton: function () {
      let that = this;
      chatInput.clickExtraListener(function (e) {
          console.log(e);
          let itemIndex = parseInt(e.currentTarget.dataset.index);
          if (itemIndex === 2) {
              that.myFun();
              return;
          }
          wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['compressed'],
              sourceType: itemIndex === 0 ? ['album'] : ['camera'],
              success: function (res) {
                let tempFilePath = res.tempFilePaths[0];
                console.log(tempFilePath);
                
                var list = that.data.wxchatLists;
                var temp = {
                  dataTime: utils.formatTime(new Date()),
                  userImgSrc: '../../image/chat/extra/close_chat.png',
                  sendImgSrc:tempFilePath,
                  msg_type: 'img',
                  type: 1
                };
                list.push(temp);
                that.setData({
                  wxchatLists: list,
                })
                

              }
          });
        
      });
      chatInput.setExtraButtonClickListener(function (dismiss) {
          console.log('Extra弹窗是否消息', dismiss);
      })
  },


  resetInputStatus: function () {
      chatInput.closeExtraView();
  },
  //播放录音
  playRecord: function (e) {
    let _this = this;
    // wx.playVoice({
    //   filePath: voiceSrc // src可以是录音文件临时路径
    // })
    console.log(e)
    console.log(_this)
  },
  //删除单条消息
  delMsg: function (e) {
    var that = this;
    var magIdx = parseInt(e.currentTarget.dataset.index);
    var list = that.data.wxchatLists;

    wx.showModal({
      title: '提示',
      content: '确定删除此消息吗？',
      success: function (res) {
        if (res.confirm) {
          console.log(e);
          list.splice(magIdx, 1);
          that.setData({
            wxchatLists: list,
          });
          // wx.showToast({
          //   title: '删除成功',
          //   mask: true,
          //   icon: 'none',
          // })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    

    
  },
  //点击图片 预览大图
  seeBigImg: function (e) {
    var that = this;
    var idx  = parseInt(e.currentTarget.dataset.index);
    var src = that.data.wxchatLists[idx].sendImgSrc;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
});