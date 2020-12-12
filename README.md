## 组件目录结构详细说明
~~~
  z-view-ui
    ├─ README.md
    │ 
    ├─ components
    │  │ 
    │  ├─z-avatar  头像
    │  │     └─ z-avatar.vue
    │  │      
    │  ├─z-biometrics 生物认证
    │  │     └─ z-biometrics.vue
    │  │      
    │  ├─z-button  按钮组件
    │  │     └─ z-button.vue
    │  │      
    │  ├─z-calendar 日历组件
    │  │    ├─  calendar-item.vue
    │  │    ├─  calendar.js
    │  │    ├─  util.js
    │  │    └─  z-calendar.vue
    │  │      
    │  ├─z-chat    聊天室组件
    │  │    └─  z-chat.vue 
    │  │      
    │  ├─z-code-txt  验证码组件
    │  │      └─z-code-txt.vue
    │  │      
    │  ├─z-count-down  倒计时组件
    │  │     └─ z-count-down.vue 
    │  │
    │  ├─z-diamond  菱形，梯形组件
    │  │     └─ z-diamond.vue  
    │  │
    │  ├─z-dropdown  下拉菜单
    │  │     └─ z-dropdown.vue   
    │  │
    │  ├─z-dropdown-item  下拉菜单子项
    │  │     └─ z-dropdown-item.vue  
    │  │ 
    │  ├─ z-flip-clock  时间翻牌组件
    │  │     ├─ flipper.vue
    │  │     └─ z-flip-clock.vue 
    │  │        
    │  ├─z-icon  icon组件
    │  │     └─ z-icon.vue
    │  │
    │  ├─z-icon-mode  图标变色组件
    │  │     └─ z-icon-mode.vue 
    │  │
    │  ├─z-icon-shadow  图标变色组件
    │  │     └─ z-icon-shadow.vue
    │  │
    │  ├─z-image-cube 图片魔方
    │  │     └─ z-image-cube.vue
    │  │      
    │  ├─z-increase  自增自减计数器
    │  │     └─ z-increase.vue
    │  │      
    │  ├─z-keyboard  键盘 组件
    │  │     ├─ car-keyboard.vue
    │  │     ├─ number-keyboard.vue
    │  │     └─ z-keyboard.vue
    │  │      
    │  ├─z-line-title  标题左右是图片
    │  │     └─ z-line-title.vue
    │  │      
    │  ├─z-loading   加载中组件
    │  │     └─ z-loading.vue
    │  │      
    │  ├─z-magnifier  放大镜
    │  │     ├─ magnifier-original.vue
    │  │     └─z-magnifier.vue
    │  │
    │  ├─z-meter  环形进度条
    │  │     └─ z-meter.vue
    │  │   
    │  ├─z-mverify   右滑验证
    │  │     ├─ iconfont.css
    │  │     ├─ README.md
    │  │     └─ z-mverify.vue
    │  │         
    │  ├─z-navbar  自定义导航栏
    │  │    └─  z-navbar.vue
    │  │      
    │  ├─z-no-data  暂无数据
    │  │     └─ z-no-data.vue
    │  │      
    │  ├─z-notice-bar  滚动公告
    │  │     └─ z-notice-bar.vue
    │  │      
    │  ├─z-notice-column  上下滚动
    │  │     └─ z-notice-column.vue
    │  │      
    │  ├─z-notice-row  左右滚动
    │  │     └─ z-notice-row.vue
    │  │      
    │  ├─z-numeral 将数字转换成其他类型
    │  │     └─ z-numeral.vue
    │  │      
    │  ├─z-parse  富文本组件
    │  │  ├─  z-parse.vue
    │  │  └─libs
    │  │      ├─    config.js
    │  │      ├─   CssHandler.js
    │  │      ├─   handler.wxs
    │  │      ├─   MpHtmlParser.js
    │  │      └─   trees.vue
    │  │          
    │  ├─z-payitem   6格数字支付密码
    │  │     └─ z-payitem.vue
    │  │      
    │  ├─z-payment  带键盘支付
    │  │     └─ z-payment.vue
    │  │      
    │  ├─z-popup  弹框
    │  │    ├─  message.js
    │  │    ├─  popup-dialog.vue
    │  │    ├─  popup-message.vue
    │  │    ├─  popup-share.vue
    │  │    ├─  popup.js
    │  │    └─  z-popup.vue
    │  │      
    │  ├─z-postpone （废弃）
    │  │     └─ z-postpone.vue
    │  │      
    │  ├─z-preview-phone  手机模型
    │  │     └─ z-preview-phone.vue
    │  │      
    │  ├─z-progress  线型进度条
    │  │      └─z-progress.vue
    │  │      
    │  ├─z-qrcode  二维码
    │  │     ├─ uqrcode.js
    │  │     └─ z-qrcode.vue
    │  │      
    │  ├─z-read-more  阅读更多
    │  │     └─ z-read-more.vue
    │  │      
    │  ├─z-rolling   滚动盒子
    │  │     └─ z-rolling.vue
    │  │      
    │  ├─z-semi-circle  半圆弧
    │  │     └─ z-semi-circle.vue
    │  │      
    │  ├─z-skeleton  骨架屏
    │  │     └─ z-skeleton.vue
    │  │      
    │  ├─z-slide-navigation   滑动导航
    │  │     └─ z-slide-navigation.vue
    │  │      
    │  ├─z-square  正方形
    │  │     └─ z-square.vue
    │  │      
    │  ├─z-sticky  吸顶
    │  │     └─ z-sticky.vue
    │  │      
    │  ├─z-switch  开关选择器
    │  │    └─  z-switch.vue
    │  │ 
    │  ├─z-tabbar  底部导航栏
    │  │    └─ z-tabbar.vue
    │  │
    │  ├─z-tabs  标签栏
    │  │     └─ z-tabs.vue
    │  │      
    │  ├─z-text-gradient  字体渐变
    │  │     └─ z-text-gradient.vue
    │  │      
    │  ├─z-textarea  导航文本
    │  │     └─ z-textarea.vue
    │  │      
    │  ├─z-theme-box  主题切换
    │  │     └─ z-theme-box.vue
    │  │      
    │  ├─z-time-str  时间戳格式化
    │  │     └─ z-time-str.vue
    │  │      
    │  ├─z-transition   过渡组件
    │  │     └─ z-transition.vue
    │  │      
    │  ├─z-unscrollbar  隐藏滚动条
    │  │     └─ z-unscrollbar.vue
    │  │      
    │  └─z-waterfall  瀑布流
    │        └─  z-waterfall.vue  
    │          
    ├─utils
    │   ├─ color.js
    │   ├─ colorGradient.js
    │   ├─ file.js
    │   ├─ guid.js
    │   ├─ hex2str.js
    │   ├─ md5.js
    │   ├─ prototype.js
    │   ├─ queryParams.js
    │   ├─ random.js
    │   ├─ randomArray.js
    │   ├─ route.js
    │   ├─ test.js
    │   ├─ timeFormat.js
    │   ├─ timeFrom.js
    │   ├─ toast.js
    │   ├─ trim.js
    │   ├─ type2icon.js
    │   └─ 待续       
    │ 
    └─ 敬请期待

~~~

## 组件props传值
- 能用var样式变量的就不用js处理





## 备忘录

- IOS苹果 自定义组件嵌套多层，底层组件最外层元素样式丢失，需要在页面重新定义样式，很奇怪的是绝对定位没事