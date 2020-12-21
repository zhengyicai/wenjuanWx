

## 写在前面：
 - 网上搜集了很多这方面的案例，但不是报错就是不完整，我更新的这个案例是纯前端静态的Demo
 - 这份更新是基于一位大佬的部分代码，下方有文章链接
 - 仿照微信，包括文字聊天、发送图片并预览、录音（录音的播放功能未完善）
 - 发送视频还没有做，目前业务没有这个需求
 - 语音消息录制过短过长的判断（该接口暂时还未开放）
 - 点击每条信息的×即可删除该条信息

## 效果图
<img src="1.png" width="200"> 

### 微信小程序即时通讯组件
#### 集成方式 博客 https://blog.csdn.net/sinat_27612147/article/details/78456363
#### 关于实现方式及原理 请看 https://blog.csdn.net/sinat_27612147/article/details/78476241

*聊天内图片可翻页查看  

## 集成

### 一、导入SDK相关文件




导入SDK时一定要用图中所示的路径，不然的话你就自己挨个修改wxml和wxss里面的文件路径哈。

图片文件总共大概是45kb，chat-input文件夹总共大概41kb。<font color=red>这就是SDK所有的文件，一共在90kb左右</font>。


----------


### 二、集成到聊天页面

#### 1.	在聊天页面中导入chat-input文件

 - 在聊天页的js文件中导入 `let chatInput = require('../../modules/chat-input/chat-input');`
 - 在聊天页的wxml文件中引入布局
```
<import src="../../modules/chat-input/chat-input.wxml"/> 
<template is="chat-input" data="{{inputObj:inputObj,textMessage:textMessage,showVoicePart:true}}"/>
```
 - 在聊天页的wxss文件中引入样式表`@import "../../modules/chat-input/chat-input.wxss";`
**<font color=red>根据你的路径来导入这些内容</>**

#### 2. 初始化`chatInput`

```
chatInput.init(page, {
			systemInfo: wx.getSystemInfoSync(),
			minVoiceTime: 1,//秒，最小录音时长，小于该值则弹出‘说话时间太短’
            maxVoiceTime: 60,//秒，最大录音时长，大于该值则按60秒处理
            startTimeDown: 56,//秒，开始倒计时时间，录音时长达到该值时弹窗界面更新为倒计时弹窗
            format:'mp3',//录音格式，有效值：mp3或aac，仅在基础库1.6.0及以上生效，低版本不生效
            sendButtonBgColor: 'mediumseagreen',//发送按钮的背景色
            sendButtonTextColor: 'white',//发送按钮的文本颜色
            extraArr: [{
                picName: 'choose_picture',
                description: '照片'
            }, {
                picName: 'take_photos',
                description: '拍摄'
            }, {
                picName: 'close_chat',
                description: '自定义功能'
            }],
            tabbarHeigth: 48
        });
```

 
 - `page`：这个是指当前的page。
 - `systemInfo`：<font color=red>必填</font>。手机的系统信息，用于控件的适配。
 -`minVoiceTime`: 最小录音时长，秒，小于该值则弹出‘说话时间太短’
 -`maxVoiceTime`: 最大录音时长，秒，填写的数值大于该值则按60秒处理。录音时长如果超过该值，则会保存最大时长的录音，并弹出‘说话时间超时’并终止录音
 -`startTimeDown`: 开始倒计时时间，秒，录音时长达到该值时弹窗界面更新为倒计时弹窗
 - `extraArr`：非必填。点击右侧加号时，显示的自定义功能。`picName`元素的名字就是对应`image/chat/extra`文件夹下的`png格式`的图片名称，用于展示自定义功能的图片。`description`元素用于展示自定义功能的文字说明。
 - `tabbarHeight`：非必填。这个也是用于适配。如果你的小程序有tabbar，那么需要填写这个字段，填48就行。如果你的小程序没有tabbar，那么就不要填写这个字段。原因我会在第二篇讲到。
 - `format`: 录音格式，有效值：mp3或aac，仅在基础库1.6.0及以上生效，低版本不生效
 - `sendButtonBgColor`: 发送按钮的背景色
 - `sendButtonTextColor`: 发送按钮的文本颜色

#### 3. 监听获取输入的信息
在初始化控件之后，监听信息的输入，即可获取到指定类型的信息

##### 文本信息：

```
//文本信息的输入监听
chatInput.setTextMessageListener(function (e) {
            let content = e.detail.value;//输入的文本信息
           
        });  
```

##### 语音信息：

```
//获取录音之后的音频临时文件
chatInput.recordVoiceListener(function (res, duration) {
         let tempFilePath = res.tempFilePath;//语音临时文件的路径
         let vDuration = duration;//录音时长
     });
//监听录音状态
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
```


##### 自定义功能：

```
//收起自定义功能窗口
chatInput.closeExtraView();

//自定义功能点击事件
chatInput.clickExtraListener(function (e) {
            let itemIndex = parseInt(e.currentTarget.dataset.index);//点击的自定义功能索引
            if (itemIndex === 2) {
                that.myFun();//其他的自定义功能
                return;
            }
            //选择图片或拍照
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['compressed'],
                sourceType: itemIndex === 0 ? ['album'] : ['camera'],
                success: function (res) {
                    let tempFilePath = res.tempFilePaths[0];
                }
            });
        });
//新增右下角加号button点击事件
chatInput.setExtraButtonClickListener(function (dismiss) {
            console.log('Extra弹窗是否消息', dismiss);
        })

```
### 至此，SDK的集成就完成了！

github地址https://github.com/unmagic/wechat-im

----------

### 更新日志：

2018-07-04
 - 新增右下角发送按钮，在输入框获取焦点时，会自动切换到发送按钮。点击发送按钮事件和点击键盘右下角发送按钮事件均为一个事件`setTextMessageListener`。
 - 新增发送按钮样式，如下：
 ```
 chatInput.init(pageContext, {
             sendButtonBgColor: 'mediumseagreen',
             sendButtonTextColor: 'white'
         });
 ```
 - 修复在自定义菜单弹出时，切换到文本输入并发送文本后，自定义弹窗依旧存在的问题。

2018-06-29
 - 加入`wx.getRecorderManager()`以支持小程序基础库1.6.0以上。
 - 兼容长按事件，根据版本调用`longpress`或`longtap`。
 - `init`方法参数新增`format`字段，用于管理录音格式，只在基础库1.6.0及以上生效，低版本不生效。有效格式为 aac或mp3 , 默认值为'mp3'，如下：
 ```
 chatInput.init(pageContext, {
            systemInfo: systemInfo,
            format: 'mp3'//aac/mp3
        });
 ```
 - 修复css高度样式错误问题。

2018-06-26
 - 新增右下角加号button点击事件
```
chatInput.setExtraButtonClickListener(function (dismiss) {
            console.log('Extra弹窗是否消息', dismiss);
        })
```

