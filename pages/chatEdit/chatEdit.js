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
  
  

    showType:"10", //显示的类型
    showCount:0,
    answerList:[],
    answerCount:0,
    showTitle:[],
    showAnswer:[],
    charItmes:[],
    selectCount:30,
    text3:"1.4 关节活动度范围",
    listHeight:0,
    goTitle:"下一题",
    btn:"20",
    text2:"",
    text1:"",
    tureCho:"20",
    choList:[],
    chatItems:[],
    test1:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    this.setData({
      type1:options.type1,
    })

    wx.setNavigationBarTitle({
      title: '医生体格检查' 
    })

    wx.setStorageSync('type1',options.type1);  //问卷类型

    _this.loadData();
  },
  success1: function(res) {
    let that = this;

    var list =  that.data.answerList;
    list[that.data.answerCount].answer1= that.data.selectCount;


   

    var test = {id:that.data.answerList[that.data.answerCount].id,remark:that.data.answerList[that.data.answerCount].answer[that.data.selectCount].remark,name:that.data.answerList[that.data.answerCount].title,message:that.data.answerList[that.data.answerCount].answer[that.data.selectCount].answer,type:"10"};

    var cholist1 = that.data.choList;
    cholist1[that.data.answerCount]   = test;


    console.log("11111");
    console.log(cholist1);

    that.setData({
      choList:cholist1
    });



    that.setData({
      answerList:list
    });


   


   wx.request({
    url: url+'/sysResidentAnswer/updateAnswer', 
    method:"post",
    data: {'type':wx.getStorageSync('type1'),"sysResidentId":wx.getStorageSync('residentId'),classes:"20",results:JSON.stringify(that.data.choList)},
    header: {
    
    'content-type': 'application/json' // 默认值
    
    },success: function(res) {


      wx.showToast({
        title: res.data.message,
        icon: 'success',
        duration: 2000
      })

      setTimeout(function () {
        wx.navigateTo({
          url: '../type1/type1'
        })
            
      },2000);  

      


    }
  });  
 



    



  },
  handleInputChange1: function(e){
    let that = this;
    // 取出定义的变量名
   let targetData = e.currentTarget.dataset.modal; 
  

  // console.log(e.detail.value);
  that.setData({
    tureCho:"20"
  });

    if(e.detail.value<0 || e.detail.value>135){
      that.setData({
        tureCho:"20"
      });
      wx.showToast({
        title: '范围为0-135',
        icon:"none",
        duration: 2000
      })
      return ;
    }

    that.setData({
      text1:e.detail.value
    });
    


    console.log(that.data.text1);


    if(that.data.text2=='' ||  that.data.text1==''){
      console.log("asdf")
      that.setData({
        tureCho:"20"
      });
      return;
    }else{
      that.setData({
        tureCho:"10"
      });
    }


   
     // 取出定义的变量名
   let currentValue = e.detail.value; 
    


    
   

    that.setData({
      tureCho:"10"
    });

  
 
    
  },
  handleInputChange2: function(e){
    let that = this;
    // 取出定义的变量名
   let targetData1 = e.currentTarget.dataset.modal; 




   var currentValue1 = e.detail.value; 
    
   if(e.detail.value<0 || e.detail.value>135){
    that.setData({
      tureCho:"20"
    });
      wx.showToast({
        title: '范围为0-135',
        icon:"none",
        duration: 2000
      })
      return;
    } 
    that.setData({
      text2:currentValue1
    });

    console.log(that.data.text1);
    if(that.data.text1=='' || that.data.text2==''){
      
      that.setData({
        tureCho:"20"
      });
      return;
    }else{
      that.setData({
        tureCho:"10"
      });
    }


    

   
    
    that.setData({
      tureCho:"10"
    });
  

    
  
   // 取出定义的变量名
  

  },

  go2:function(){
    let that = this;
    that.setData({
      answerCount:that.data.answerCount-1
    });

   var list =  that.data.answerList;
    

   console.log(that.data.answerList);

  that.setData({
      showTitle: that.data.answerList[that.data.answerCount].title
  });

    that.setData({
      showAnswer:  that.data.answerList[that.data.answerCount].answer
  });


 

   console.log("count"+that.data.showAnswer[that.data.answerList[that.data.answerCount].answer1].answer) ;
  
  that.data.answerList[that.data.answerCount].answer1 = that.data.showAnswer[that.data.answerList[that.data.answerCount].answer1].answer;
 // console.log("aa"+that.data.answerList[that.data.answerCount].answer1);

 
 
  // that.setData({
  //     test1:  that.data.answerList[that.data.answerCount].answer1
  // });


  var list1 = that.data.answerList;

  list1[that.data.answerCount].answer1 = that.data.answerList[that.data.answerCount].answer1;

    that.setData({
      answerList:  list1
  });
      console.log(that.data.answerList);



  },
  go1:function(){
    let that = this;

    console.log("count2"+that.data.answerCount);

    var list =  that.data.answerList;
    list[that.data.answerCount].answer1= that.data.selectCount;


    //console.log("test"+);
    //console.log(that.data.answerList[that.data.answerCount].answer[that.data.selectCount].answer); 


    

    //console.log(that.data.answerList);

    

    


   


    var test = {};
    if(that.data.tureCho!="20"){
        if(that.data.text1>=that.data.text2){
          wx.showToast({
            title: '范围输入有误',
            icon:"none",
            duration: 2000
          })
          return;
        }else{
          var list =  that.data.answerList;
          list[that.data.answerCount].answer1= that.data.text1+","+that.data.text2;

          that.setData({
            answerList:list
          });

          that.setData({
            tureCho:"20"
          });


          var remark = "";
          for(var i = 0;i<that.data.showAnswer.length;i++){
            if(that.data.answerList[that.data.answerCount].title==that.data.showAnswer[i].answer){
              remark= that.data.showAnswer[i].remark;
             
              break;
            }
          }
         
          
          
          test = {id:that.data.answerList[that.data.answerCount].id,remark:"",name:that.data.answerList[that.data.answerCount].title,message:list[that.data.answerCount].answer1,type:"30"};



        }
    }else{


     
     
      test = {id:that.data.answerList[that.data.answerCount].id,remark:that.data.answerList[that.data.answerCount].answer[that.data.selectCount].remark,name:that.data.answerList[that.data.answerCount].title,message:that.data.answerList[that.data.answerCount].answer[that.data.selectCount].answer,type:"10"};


    }


   
    
     
    var cholist1 = that.data.choList;

    

    // that.setData({
    //   choList:cholist1.concat(test)
    // });


    that.data.choList[that.data.answerCount] = test;

    that.setData({
      answerList:list
    });

    that.setData({
      answerCount:that.data.answerCount+1
    });


    var list1 = that.data.answerList;

  list1[that.data.answerCount].answer1 = that.data.answerList[that.data.answerCount].answer1;

    that.setData({
      answerList:  list1
  });



  //console.log(answerList);


    if(that.data.answerCount==that.data.listHeight-1){
      that.setData({
        goTitle:"提交"
      });
     // return 
    }


    that.setData({
        showTitle: that.data.answerList[that.data.answerCount].title
    });

    that.setData({
      selectCount:30
    });

      that.setData({
        showAnswer:that.data.answerList[that.data.answerCount].answer
    });

    that.setData({
      btn:"20"
  });


  },

  select1:function(res){


    console.log(res.currentTarget.dataset.cap);
     
      let that = this;
      that.setData({
        selectCount:res.currentTarget.dataset.cap
    });

    that.setData({
      btn:"10"
  });

  

  },

  loadData:function(){
    let that = this;

    var solt="";


    that.setData({
      choList:[]
    });


    if(wx.getStorageSync("type1")=="10"||wx.getStorageSync("type1")=="20"){
      solt = "10";
    }else{
      solt = "20";
    }

    wx.request({
      url: url+'/appQuestions/findAll', 
      data: {'type':"20",'solt':solt},
      header: {
      
      'content-type': 'application/json' // 默认值
      
      },success: function(res) {
         
        that.setData({
            answerList: res.data.data
        });
        
        

      that.setData({
          listHeight: res.data.data.length
      });



        that.setData({
            showTitle: res.data.data[0].title
        });

          that.setData({
            showAnswer: res.data.data[0].answer
        });
        


        


        that.setData({
          answerCount:0
        });



        var countSize  = 0;


        that.setData({
          text1:""
      });

        that.setData({
          text2:""
      });

          wx.request({
                    url: url+'/sysResidentAnswer/getAnswer', 
                    //data: {'type': wx.getStorageSync('type1'),"residentId": wx.getStorageSync('residentId')},
                    data: {'type': wx.getStorageSync('type1'),"residentId": wx.getStorageSync('residentId'),classes:"20"},
                    header: {
                    
                    'content-type': 'application/json' // 默认值
                    
                    },success: function(res1) {
            
                     
                        for(var i=0;i<res1.data.data.length;i++){
                          if(res1.data.data[i].classes=="20"){
                            that.setData({chatItems: res1.data.data[i].answerList});
                          }
                        }
            
                       
            
            
                        var currlist1 =that.data.answerList;
                        var currlist2 = that.data.chatItems;


                        console.log(that.data.chatItems.length);
            
                        for(var i=0;i<that.data.chatItems.length;i++){

                          //console.log(currlist1[i]);
                          currlist1[i].answer1 = currlist2[i].message;
                        }


            
                          that.setData({
                              answerList: currlist1
                          });

            
                    }
          });  
          

       
        
     
      }
      
    })

  }


  
});