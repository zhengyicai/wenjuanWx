// chat.js
// let toast = require('../../utils/toast.js');
let chatInput = require('../../modules/chat-input/chat-input');
var utils = require("../../utils/util.js")

const app = getApp()

const url = app.globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxchatLists: ['test1','test2'],
    wxchatListsTest: [{name:"zhangsan",age:"21"},{name:"zhangsan2",age:"22"}],
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
    showOne:"20",
    color:"#339900",
    type:"10",
    answerList:[],  //显示问题list
    answerCount:0,  //显示当前题目
    selectanswerList:[], //显示答案list
    selectanswerList1:[], //显示答案list
    listCount:0, //显示行数

    showType:"10", //显示的类型
    showFor:"10", //显示for循环
    showForList:[],
    selectItemCount:0, //多项的次数
    selectCount:"",  //多选选中
    selectItemList:[], //选中list

    manyList:[],  //多选的选项
    manyCount:0,
    height1:500,
    select1:"",
    selectItem:"",


    updateCho:"0",  //0:否 1:是
    updateIndex:0,  //下标
    testList:[],
    threeShow:0, //是否为最后多选项
    message1:-1    
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

    this.setData({
      type1:options.type1,
    })

    wx.setStorageSync('type1',options.type1);  //问卷类型

   
    
    _this.initData();
      //获取屏幕的高度
      wx.getSystemInfo({
        success(res) {
          _this.setData({
            height: wx.getSystemInfoSync().windowHeight,
            chatHeight: wx.getSystemInfoSync().windowHeight-100
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
      that.loadData();
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


  loadData:function(e){

    var that = this;
    // that.setData({
    //       title: this.data.array[e.detail.value]
    // });

    var solt = "";
    if(wx.getStorageSync("type1")=="10"||wx.getStorageSync("type1")=="20"){
      solt = "10";
    }else{
      solt = "20";
    }

    wx.request({
      url: url+'/appQuestions/findAll', 
      data: {'type':"10",'solt':solt},
      header: {
      
      'content-type': 'application/json' // 默认值
      
      },success: function(res) {
         
        that.setData({
            answerList: res.data.data
        });

        that.setData({
          testList: res.data.data
      });


        
        
        

      // console.log(res.data.data[0].answer);

      //  console.log(that.data.answerList.answer1);

       var types = "20";   
        if(types=="30"){
          var test1 = {name:that.data.answerList[0].title,message:"",type:"10"};
          
          var cc = [];  

          var count11=0;
          for(var i=0;that.data.answerList.length;i++){
            // var ccount  =   that.data.answerList[i].answer.length;
            console.log(that.data.answerList);
            //count11=count11+ccount;

          }


          // for(var i =1;i<=count11;i++){
          //     cc.push({answer:i});
          // }

          that.setData({
            selectanswerList:cc
          });
  
          that.setData({chatItems: that.data.chatItems.concat(test1)})
   
        }else{
          var test1 = {id:that.data.answerList[0].id,remark:"",name:that.data.answerList[0].title,message:"",type:"10"};
          that.setData({chatItems: that.data.chatItems.concat(test1)})

        }

      

        that.setData({
          answerCount:0
        });



        var countSize  = 0;
        

        countSize  = parseInt(res.data.data[0].answer.length);

        // if(parseInt(res.data.data[0].answer.length%2)==0){
        //   countSize  = parseInt(res.data.data[0].answer.length/2);
        // }else{
        //   countSize  = parseInt(res.data.data[0].answer.length/2)+1;
        // }

        that.setData({
          chatHeight: wx.getSystemInfoSync().windowHeight-countSize*50-40
        })



        //显示多个选项
        if(parseInt(res.data.data[0].answer.length)>=10){

          that.setData({
            chatHeight: wx.getSystemInfoSync().windowHeight-countSize*50
          });
          that.setData({
            showType: 20 
          })

        }else if((parseInt(res.data.data[0].answer.length)==0)){
          that.setData({
            showType: 30 
          })
        }else{
          that.setData({
            showType: 10 
          })
        }


        if(types!='30'){

          that.setData({
            selectanswerList:res.data.data[0].answer
          });
  
        }
        
       
        
     
      }
      
    })


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

   alertTitle:function(){
    wx.showToast({
      title: '请选择数字按钮',
      icon: 'none',
      duration: 2000
    })


   },

  sent:function(){
    var that = this;
    console.log(that.data.message);
    var date = new Date().getTime();
    //that.data.wxchatLists.concat(that.data.message);

  
    //赋值
    var list1 = that.data.answerList;
    list1[that.data.answerCount].message  = that.data.message;


    
    
    
    that.data.answerCount++;
    if(list1.length== that.data.answerCount){
      var count11 = that.data.answerCount;
      var chatItem = that.data.chatItems;
      chatItem[3].message  = that.data.message;

      this.setData({chatItems: chatItem})
     // console.log(parseInt(count11)-1);
    }else{
      var chatItem = that.data.chatItems;
      chatItem[that.data.answerCount].message  = that.data.message;




      this.setData({answerList:list1})
      this.setData({chatItems:chatItem})
      
      

     
      var currList = list1[that.data.answerCount]; 
      console.log(that.data.answerCount);

      var test1 = {name:currList.title,message:""};


      this.setData({chatItems: that.data.chatItems.concat(test1)})
    }

    



   



   
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



   


  },

  message: function(e) {
    let that = this;
  
     that.setData({
      message: e.detail.value,
     })
   
  },


  checked11: function(res) {
    let that = this;
    var list = that.data.showForList;

    list[res.currentTarget.dataset.cap].type='20';

    that.setData({
      showForList:list
    });


    that.setData({
      selectItemCount: that.data.selectItemCount+1
    })


    var person1 = {name:list[res.currentTarget.dataset.cap].title,message:""};

    var selItem =  that.data.selectItemList;
    
    selItem.push(person1);
    that.setData({
      selectItemList: selItem
     });


     if(that.data.selectItemCount==3){

          var list1 =that.data.chatItems;
          //console.log(that.data.answerCount);
         // list1[that.data.answerCount].message  = that.data.selectCount;
          var chatItem = that.data.chatItems;  

          
          this.setData({answerList:list1})
          this.setData({chatItems:list1})
      //   console.log("dd"+that.data.selectItemList);


        that.setData({
          chatHeight: wx.getSystemInfoSync().windowHeight-6*50-40
        })


          

          setTimeout(function () {
            
            var len = 1
            that.setData({
                top: 100000 * len 
            });
          }, 300) //延迟时间 这里是1秒
          return;
    }   
  

    //console.log(res.currentTarget.dataset.cap)

     
   
  },
  success1: function(res) {

    let that = this;
    console.log("success");


    var remark = "";
    var chatItem = that.data.chatItems;
    for(var i=0;i<that.data.selectanswerList.length;i++){
     // console.log(chatItem[that.data.answerCount].message+";"+that.data.selectanswerList[i].answer);
      if(chatItem[that.data.answerCount].message==that.data.selectanswerList[i].answer){
          remark= that.data.selectanswerList[i].remark;
         
          break;
        }
    }
    //console.log("asdfdff"+ remark);

    
    chatItem[that.data.answerCount].remark  = remark;

    this.setData({chatItems:chatItem});

    console.log(that.data.chatItems);



    var person1 = {
       name: wx.getStorageSync("name"),
       phone:wx.getStorageSync("phone"),
       sysResidentId:wx.getStorageSync("residentId"),
       type1:wx.getStorageSync("type2"),   //左脚 右脚
       classes:wx.getStorageSync('type'),   //医生 患者
       type:wx.getStorageSync("type1"),   //术前 术后
       cardNo:wx.getStorageSync("cardNo"),   //术前 术后
       results: JSON.stringify(that.data.chatItems)  
    }


    console.log(person1);


    wx.request({
      url: url+'/sysResidentAnswer/add', 
      data: person1,
      method:"post",
      header: {
      
      'content-type': 'application/json' // 默认值
      
      },success: function(res) {
        if(res.data.code =='0000'){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../home/home'
            })
                
          },2000);  
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
       
      }
    })    




   

  },

  bindViewTapUrlOne1: function(res) {
    let that = this;



    if(that.data.updateCho=='1'){
      
      var list2 = that.data.chatItems;
      list2[that.data.threeShow].message  = res.currentTarget.dataset.cap;



     

      
      that.setData({
        chatItems:list2
      });


      console.log("xxxx"+that.data.threeShow);
      console.log(list2);
      
    that.setData({
      updateCho:"0"
    });

    that.setData({
      updateIndex:0
    });


    setTimeout(function () {

      if(that.data.manyCount>=2){
        that.setData({
          showType: 60
        })

        that.setData({
          chatHeight: wx.getSystemInfoSync().windowHeight-0*50-40
        })

        return;
      }


      if(that.data.threeShow!=0){
        that.setData({
          selectanswerList: that.data.answerList[that.data.answerList.length-1].answer
        }) 

      }else{
        that.setData({
          selectanswerList: that.data.answerList[that.data.answerCount].answer
        })  

      }
     
      that.setData({
        chatHeight: wx.getSystemInfoSync().windowHeight-that.data.selectanswerList.length*50-40
      })


     

      if(that.data.selectItemList.length>=10){
        that.setData({
          showType: 20
        })
      }else{
        that.setData({
          showType: 10
        })
      }

      console.log(that.data.threeShow+":"+that.data.chatItems.length);

      if((that.data.threeShow+1)==that.data.chatItems.length){
        that.setData({
          showType: 60
        })

        that.setData({
          chatHeight: wx.getSystemInfoSync().windowHeight-0*50-40
        })
      }

      


  },1000);    


      return ;
    }


    var list1 = that.data.answerList;
    var chatItem = that.data.chatItems;

    that.setData({answerCount:that.data.answerCount+1});

   console.log("answerCount"+that.data.answerCount);

   that.setData({selectItem:res.currentTarget.dataset.cap});



   var remark = "";
   for(var i=0;i<that.data.selectanswerList.length;i++){
     
     if(res.currentTarget.dataset.cap==that.data.selectanswerList[i].answer){
         remark= that.data.selectanswerList[i].remark;
        
         break;
       }
   }


    chatItem[that.data.answerCount].message  = res.currentTarget.dataset.cap;
    chatItem[that.data.answerCount].remark = remark;

    that.setData({select1:"2"});
    
    
    console.log("data"+that.data.select1);


    //console.log(that.data.selectItemList[1].name.title);
  //  var currList = list1[that.data.answerCount]; 
  //  var titles = currList.name.split(",");


  //结束
  if(that.data.manyCount>=2){
    that.setData({chatItems:chatItem});

      var len = 1
      that.setData({
        top: 100000 * len 
    });
    that.setData({
      showType:"60"
    });

    that.setData({
      chatHeight: wx.getSystemInfoSync().windowHeight-1*45
    })
      return;
  }


  



    
    that.setData({
      manyCount: that.data.manyCount+1
    });

    


   
    


   

      var list2 =  that.data.showForList;

      console.log(list2);
      var titles = list2;


      // if( that.data.selectItemList[that.data.manyCount].name.title<=9){
      //   var test1 = {name:titles[that.data.selectItemList[that.data.manyCount].name+1],message:"",type:"10"};
      //   that.setData({chatItems:chatItem});
      //   that.setData({chatItems: that.data.chatItems.concat(test1)});
      // }else{
      //   var test1 = {name:titles[that.data.selectItemList[that.data.manyCount].name+2],message:"",type:"10"};
      //   that.setData({chatItems:chatItem});
      //   that.setData({chatItems: that.data.chatItems.concat(test1)});

      // }


     

     console.log("test"+that.data.selectItemList[that.data.manyCount].name);
     

      var test1 = {id:that.data.selectItemList[that.data.manyCount].id,remark:"",name:that.data.selectItemList[that.data.manyCount].name,message:"",type:"10"};
      that.setData({chatItems:chatItem});
    

      
      setTimeout(function () {
        that.setData({chatItems: that.data.chatItems.concat(test1)});
        that.setData({selectItem:""});
      
       }, 300) //延迟时间 这里是1秒

       setTimeout(function(){
        var len = 1
        that.setData({
            top: 100000 * len 
        });
       },1000)
     //console.log(that.data.showForList); 
    
  },
  bindViewTapUrlOne: function(res) {


    



    let that = this;
    that.setData({selectItem:res.currentTarget.dataset.cap});
    // setTimeout(function(){

    //   console.log("answercount"+that.data.answerCount);

    //   if(that.data.answerCount>27){

    //   }else{
    //     that.setData({
    //       selectanswerList:[]
    //     });
    //   }
     
    // },299);    


    setTimeout(function(){
     

      if(that.data.updateCho=='1'){
      
        var list2 = that.data.chatItems;
        list2[that.data.updateIndex].message  = res.currentTarget.dataset.cap;
  
        
        that.setData({
          chatItems:list2
        });
        that.setData({
          updateCho: "0"
        });
  
        
      that.setData({
        updateCho: "0"
      });
  
      that.setData({
        updateIndex:0
      });
  
  
  
      setTimeout(function () {
  
        if(that.data.manyCount>=2){
          that.setData({
            showType: 60
          })
  
          that.setData({
            chatHeight: wx.getSystemInfoSync().windowHeight-0*50-40
          })
          return;
        }
          that.setData({
            selectanswerList: that.data.answerList[that.data.answerCount].answer
          })
  
          that.setData({
            chatHeight: wx.getSystemInfoSync().windowHeight-that.data.selectanswerList.length*50-40
          })
  
          if(that.data.selectItemList.length>=10){
            that.setData({
              showType: 20
            })
            
            
            
  
            
          }else{
            that.setData({
              showType: 10
            })
          }
      },1000);    
  
        return ;
      }
  
  
  
  
      console.log(res.currentTarget.dataset.cap);
     
    //  this.setData({chatItems: that.data.chatItems.concat("1,3,"+res.currentTarget.dataset.cap)})
    
  
      var remark = "";
      for(var i=0;i<that.data.selectanswerList.length;i++){
        
        if(res.currentTarget.dataset.cap==that.data.selectanswerList[i].answer){
            remark= that.data.selectanswerList[i].remark;
           
            break;
          }
      }
  
      
      
    
      // var len = 1
      // that.setData({
      //     top:    1200 * len
      // });
  
     // console.log("test"+parseInt(1200 * len) +parseInt(that.data.height1));
  
      that.setData({
        height1: that.data.height1+500
      });
  
  
      that.setData({
        color: "#666666" 
      });
  
      setTimeout(function () {
        that.setData({
          showOne: '10'
        });
        var len = 1
      that.setData({
          top: 100000 * len 
      });
       }, 300) //延迟时间 这里是1秒
  
  
  
       //赋值
      var list1 = that.data.answerList;
      list1[that.data.answerCount].message  = res.currentTarget.dataset.cap;
      list1[that.data.answerCount].remark = remark;
  
  
      console.log(list1);
  
      
     
  
      
      var chatItem = that.data.chatItems;
      chatItem[that.data.answerCount].message  = res.currentTarget.dataset.cap;
      chatItem[that.data.answerCount].remark  = remark;
  
  
     
      
      
  
     
  
      
         
      that.data.answerCount++
      
     
  
  
      var currList = list1[that.data.answerCount]; 
      //console.log(currList);
  
      var test1 = {name:currList.title,message:""};
  
  
  
     
  
  
      
      
  
      var countSize =0;
      
  
      countSize  = parseInt(list1[that.data.answerCount].answer.length);
      // if(parseInt(list1[that.data.answerCount].answer.length%2)==0){
      //   countSize  = parseInt(list1[that.data.answerCount].answer.length/2);
      // }else{
      //   countSize  = parseInt(list1[that.data.answerCount].answer.length/2)+1;
      // }
  
      
      that.setData({
        chatHeight: wx.getSystemInfoSync().windowHeight-countSize*50-40
      })
  
      if(countSize==0){
  
        that.setData({
          chatHeight: wx.getSystemInfoSync().windowHeight-1*50-40
        })
      }
  
  
      //显示多个选项
      if(parseInt(list1[that.data.answerCount].answer.length)>=10){
  
        that.setData({
          chatHeight: wx.getSystemInfoSync().windowHeight-countSize*50
        })
  
      }
  
      
  
  
  
     
  
     
   //  console.log( 1400 * that.data.chatItems.length);
  
      if(parseInt(list1[that.data.answerCount].answer.length)==0){
        that.setData({
          showType: 30 
        })
  
        console.log("dd"+parseInt(list1[that.data.answerCount].answer.length));
  
      }else if(parseInt(list1[that.data.answerCount].answer.length)>10){
  
        that.setData({
          top: 1400*2
        });
  
        that.setData({
          showType: 20 
        })
       // console.log("ee"+parseInt(list1[that.data.answerCount].answer.length));
  
      }else{
        that.setData({
          showType: 10 
        })
      }
  
     // console.log("123");
     // console.log(currList);
  
      if(currList.title.length>100){
        
        
        var test1 = {id:currList.id, remark:"", name:currList.title,message:"",type:"20"};
        that.setData({chatItems: that.data.chatItems.concat(test1)})
  
  
        console.log("1111");
       // console.log(that.data.chatItems);
        
        
        var list1 = (currList.title+"").split(",");
  
        var list2 = [];
  
        for(var i=0;i<list1.length;i++){
          var person = {
            type:"10",
            title:list1[i]
          }
  
          list2.push(person);
  
  
        }
  
        that.setData({
          showForList: list2
        })
  
  
  
  
  
        that.setData({
          manyList: currList.answer
        })
  
  
  
  
  
        var counta = [];
        var person = {title:"",type:""};
        for(var i = 1;i<list1.length-2;i++){
             
          counta.push({title:i,type:""});
        }
  
  
        that.setData({
          selectanswerList1: counta
        })
        that.setData({
          showType:"40"
        })
        that.setData({
          chatHeight: wx.getSystemInfoSync().windowHeight-2*50-40
        })
  
  
        
  
        
      }else{
       
  
        var test1 = {id:currList.id,remark:"",name:currList.title,message:"",type:"10"};  
        setTimeout(function(){
         
       
       // setTimeout(function(){
          that.setData({
            selectanswerList:list1[that.data.answerCount].answer
          });   
       // }, 100);
       
          
        
          that.setData({chatItems: that.data.chatItems.concat(test1)})
          that.setData({selectItem:""});
       }, 300);
  
        setTimeout(function(){
         
          var len = 1
          that.setData({
              top: 100000 * len 
          });
        
        }, 1000);
  
       
  
  
        
        console.log("2222");
        console.log(that.data.chatItems);
  
        that.setData({
          showFor: "10"
        })
  
      //   setTimeout(function(){
        
      // }, 1000);
      } 
  
  
      if(that.data.answerList[that.data.answerCount].title.length>100){
        
        console.log("bbbbb");
        that.setData({
          chatHeight: that.data.chatHeight+310
        });
      }

     },200)


    

    
    

   
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
  bindSelect:function(res){

    var that = this; 

   


    var  selectList1 = that.data.selectanswerList1;



    selectList1[res.currentTarget.dataset.cap.title-1].type='10';
    that.setData({
      selectanswerList1: selectList1
    })


    that.setData({
      selectCount: that.data.selectCount+res.currentTarget.dataset.cap.title+","
    })




    that.setData({
      selectItemCount: that.data.selectItemCount+1
    })


    var person1 = {name:res.currentTarget.dataset.cap,message:""};

    var selItem =  that.data.selectItemList;
    
    selItem.push(person1);
    that.setData({
      selectItemList: selItem
     });


    if(that.data.selectItemCount==3){

      var list1 =that.data.chatItems;
      //console.log(that.data.answerCount);
      list1[that.data.answerCount].message  = that.data.selectCount;
      var chatItem = that.data.chatItems;  

      
      this.setData({answerList:list1})
      this.setData({chatItems:list1})
   //   console.log("dd"+that.data.selectItemList);


    that.setData({
      chatHeight: wx.getSystemInfoSync().windowHeight-3*50-40
    })


      

      setTimeout(function () {
        
        var len = 1
        that.setData({
            top: 100000 * len 
        });
       }, 300) //延迟时间 这里是1秒
  
      
      var currList = list1[that.data.answerCount]; 

    //  console.log("ss"+currList.name);

    

      var titles = currList.name.split(",");

     
      //console.log(res.currentTarget.dataset.cap.title);

     // console.log("list"+JSON.stringify(list1[2]))



      // if(res.currentTarget.dataset.cap<=9){
      //   var test1 = {titles:curr1,message:"",type:"10"};
      //   this.setData({chatItems: that.data.chatItems.concat(test1)})

      

      //   that.setData({
      //     selectanswerList:list1[that.data.answerCount].answer
      //   });
    

      

     // console.log("fuck ");
      // }

      if(that.data.selectItemList[0].name.title<=9){
      

      //  console.log("selectanswerList"+ JSON.stringify(that.data.manyList) )

          that.setData({
            showType: "50"
        });
        var test1 = {name:titles[that.data.selectItemList[0].name.title+1],message:"",type:"10"};
        this.setData({chatItems: that.data.chatItems.concat(test1)});

        this.setData({selectanswerList: that.data.manyList});
        var len = 1
        that.setData({
            top: 1200 * len 
        });
      
      
      }else{

      
      

          console.log("selectanswerList"+ JSON.stringify(that.data.manyList) )
  
            that.setData({
              showType: "50"
          });
          var test1 = {name:titles[that.data.selectItemList[0].name.title+2],message:"",type:"10"};
          this.setData({chatItems: that.data.chatItems.concat(test1)});
  
          this.setData({selectanswerList: that.data.manyList});



         
          that.setData({
            chatHeight:that.data.chatHeight+300
          })  



          var len = 1
          that.setData({
              top: 1200 * len 
          });
        
        
        

      }
     

       //var test1 = {name:that.data.selectItemList[0].name.title,message:"",type:"10"};
     //  this.setData({chatItems: that.data.chatItems.concat(test1)})
      
      return;
    }

    


  


    console.log(res.currentTarget.dataset.cap);

  },

  //删除单条消息
  delMsg: function (e) {
    var that = this;
    var magIdx = parseInt(e.currentTarget.dataset.index);
    var list = that.data.wxchatLists;

    

    
    wx.showModal({
     
      content: '确定修改吗？',
      success: function (res) {
        if (res.confirm) {
        
          
        that.setData({
            message1:e.currentTarget.dataset.index,
        })

        that.setData({
            updateCho:"1",
        })

        console.log(e.currentTarget.dataset);  

        that.data.answerList = that.data.testList;
        //console.log("aaaa"+e.currentTarget.dataset.index+":"+that.data.answerList.length);
        var  length1=0;
        //当如果是最后三种的话  
        if(e.currentTarget.dataset.index>=that.data.answerList.length){


          length1 = that.data.testList[that.data.answerList.length-1].answer.length;



          

          that.setData({
            threeShow: e.currentTarget.dataset.index,
          });
          
          console.log(that.data.testList[that.data.answerList.length-1].answer)

          
          that.setData({
            showType: "50",
          });

          that.setData({
            selectanswerList: that.data.testList[that.data.answerList.length-1].answer
          })

          that.setData({
            chatHeight: wx.getSystemInfoSync().windowHeight-length1*50-40
          })
          
          
         return;


        }else{
          length1 = that.data.answerList[magIdx].answer.length;

        }

        // answerList
       

          console.log("length"+length1);

          that.setData({
            updateIndex:magIdx
          })


      

          if(length1>=10){
            

            that.setData({
              showType: "20",
            })
           


            
            

          }else{
            that.setData({
              showType: "10",
            })            
          }
          
          
          that.setData({
            threeShow: "0",
          });   
        
          
          console.log("length"+length1);

          if(length1.length==0){
            that.setData({
              selectanswerList: that.data.answerList[that.data.answerList.length-1].answer
            })

            that.setData({
              chatHeight: wx.getSystemInfoSync().windowHeight-length1*50-40
            })

          }else{
            that.setData({
              selectanswerList:that.data.answerList[magIdx].answer
            })

            that.setData({
              chatHeight: wx.getSystemInfoSync().windowHeight-length1*50-40
            })

          }

         

         
          
         
        } else if (res.cancel) {
          that.setData({
            chatHeight: wx.getSystemInfoSync().windowHeight-0*50-40
          })
          that.setData({
            selectanswerList: []
          })
        }


        
      }
    })
    

    
  },


  bindSelect1:function(res){

    
    let that = this;
    var list = that.data.showForList;

    console.log(res.currentTarget.dataset.cap);
    if(res.currentTarget.dataset.cap=='0'){
      return;
    }

    list[res.currentTarget.dataset.cap].type='20';

    that.setData({
      showForList:list
    });


    that.setData({
      selectItemCount: that.data.selectItemCount+1
    })


    
   
   // var  selectList1 = that.data.selectanswerList1;
    var str11 = list[res.currentTarget.dataset.cap].title ;
   if(res.currentTarget.dataset.cap>=1 && res.currentTarget.dataset.cap<=9){
    str11 =  (list[res.currentTarget.dataset.cap].title+"").substr(1,list[res.currentTarget.dataset.cap].title.length-1);
   }else if(res.currentTarget.dataset.cap>=10){
    str11 =  (list[res.currentTarget.dataset.cap].title+"").substr(2,list[res.currentTarget.dataset.cap].title.length-1);
  
   }


   var person1 = {name:"请问“"+str11+"”的时候，您的膝关节对您的活动有多大影响？",message:""};
   var selItem =  that.data.selectItemList;  
   selItem.push(person1);
   that.setData({
     selectItemList: selItem
    });


    console.log(that.data.selectItemList);


    if(that.data.selectItemCount==3){
      var list1 =that.data.chatItems;

      console.log(list1);
   
     // list1[that.data.answerCount].message  = that.data.selectCount;
      var chatItem = that.data.chatItems;  

      
      this.setData({answerList:list1})
      this.setData({chatItems:list1})

      that.setData({
        showType: "50"
      });
      var test1 = {id:"",remark:"",name:that.data.selectItemList[0].name,message:"",type:"10"};
      this.setData({chatItems: that.data.chatItems.concat(test1)});


      

      that.setData({"selectItem":""});

      that.setData({
        chatHeight: wx.getSystemInfoSync().windowHeight-6*50-40
      })
  


      setTimeout(function () {
        
        var len = 1
        that.setData({
            top: 100000 * len 
        });
       }, 300) //延迟时间 这里是1秒
  



    
    }



    return;

   


   


    console.log(selectList1[res.currentTarget.dataset.cap.title-1]);


    selectList1[res.currentTarget.dataset.cap.title-1].type='10';
    that.setData({
      selectanswerList1: selectList1
    })


    that.setData({
      selectCount: that.data.selectCount+res.currentTarget.dataset.cap.title+","
    })




    that.setData({
      selectItemCount: that.data.selectItemCount+1
    })


    var person1 = {name:res.currentTarget.dataset.cap,message:""};

    var selItem =  that.data.selectItemList;
    
    selItem.push(person1);
    that.setData({
      selectItemList: selItem
     });


    if(that.data.selectItemCount==3){

      var list1 =that.data.chatItems;
   
      list1[that.data.answerCount].message  = that.data.selectCount;
      var chatItem = that.data.chatItems;  

      
      this.setData({answerList:list1})
      this.setData({chatItems:list1})
  


    that.setData({
      chatHeight: wx.getSystemInfoSync().windowHeight-3*50-40
    })


      

      setTimeout(function () {
        
        var len = 1
        that.setData({
            top: 100000 * len 
        });
       }, 300) //延迟时间 这里是1秒
  
      
      var currList = list1[that.data.answerCount]; 


      var titles = currList.name.split(",");



      if(that.data.selectItemList[0].name.title<=9){
      

          that.setData({
            showType: "50"
        });
        var test1 = {name:titles[that.data.selectItemList[0].name.title+1],message:"",type:"10"};
        this.setData({chatItems: that.data.chatItems.concat(test1)});

        this.setData({selectanswerList: that.data.manyList});
        var len = 1
        that.setData({
            top: 1200 * len 
        });
      
      
      }else{

      
      

          console.log("selectanswerList"+ JSON.stringify(that.data.manyList) )
  
            that.setData({
              showType: "50"
          });
          var test1 = {name:titles[that.data.selectItemList[0].name.title+2],message:"",type:"10"};
          this.setData({chatItems: that.data.chatItems.concat(test1)});
  
          this.setData({selectanswerList: that.data.manyList});
          var len = 1
          that.setData({
              top: 1200 * len 
          });
        
        
        

      }
     

       //var test1 = {name:that.data.selectItemList[0].name.title,message:"",type:"10"};
     //  this.setData({chatItems: that.data.chatItems.concat(test1)})
      
      return;
    }

    


  


    console.log(res.currentTarget.dataset.cap);

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