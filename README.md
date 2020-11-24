## 组件目录结构详细说明
~~~
  components
    ├─ avatar
    │    └─ avatar  头像组件
    ├─ biometrics
    │    └─ biometrics  指纹解锁,人脸识别（未完）
    ├─ button
    │    └─ button  按钮组件
    ├─calendar
    │    ├─ calendar.js  @1900-2100区间内的公历、农历互转
    │    ├─ calendar.vue  日历组件
    │    ├─ calendar-item  日历单元
    │    └─util.js  公共方法
    ├─ chat 
    │    └─ chat 聊天室(功能未完善)
    ├─ codeTxt 
    │    └─ codeTxt 发送验证码
    ├─ countDown 
    │    └─ countDown  倒计时
    ├─ iconShadow 
    │    └─ iconShadow  png图片实现变色
    ├─ imageCube
    │    └─ imageCube  图片魔方
    ├─ increase 
    │    └─increase  递增递减（未完）
    ├─ keyboard
    │    ├─ car-keyboard  车牌键盘（未完）
    │    ├─ number-keyboard  数字键盘（未完）
    │    └─keyboard  键盘（未完）
    ├─ lineTitle
    │    └─ lineTitle  左右有图片的标题
    ├─ loading
    │    └─ loading  加载中
    ├─ magnifier
    │    └─ magnifier  图片放大镜
    ├─ mverify
    │    ├─ iconfont.css  css样式
    │    ├─ mverify  右滑验证
    │    └─ README.md  描述
    ├─ noData
    │    └─ noData  暂无数据
    ├─ numeral
    │    └─ numeral  数字转中文繁体|加逗号
    ├─ payItem
    │    └─ payItem  6位数字密码输入框
    ├─ payment
    │    └─ payment  仿支付宝支付密码组件
    ├─ popup   ---------(未实际应用过)
    │    ├─ message.js
    │    ├─ popup.js
    │    ├─ popup
    │    ├─ popup-dialog
    │    ├─ popup-message  
    │    └─ popup-share   分享弹出框
    ├─ postpone
    │    └─ postpone  有限制异步按钮
    ├─ previewPhone
    │    └─ previewPhone  手机模型
    ├─ progress
    │    └─ progress  进度条（*************未完成*******************）
    ├─ readMore
    │    └─ readMore  阅读更多
    ├─ rolling
    │    └─ rolling  滚动盒子
    ├─ semiCircle
    │    └─ semiCircle  半圆渐变背景
    ├─ skeleton
    │    └─ skeleton  骨架屏
    ├─ slideNavigation
    │    └─ slideNavigation  滑动导航
    ├─ square
    │    └─ square  正方形skeleton
    ├─ sticky
    │    └─ sticky  吸顶
    ├─ switch
    │    └─ switch  开关
    ├─ textGradient 
    │    └─ textGradient  文字渐变
    ├─ themeBox
    │    └─ themeBox  修改风格组件
    ├─ timeStr
    │    └─ timeStr  时间戳格式化
    ├─ transition
    │    └─ transition  过渡组件
    ├─ unScrollBar
    │    └─ unScrollBar 隐藏滚动条
    ├─ utils
    │    ├─ color  颜色变量
    │    ├─ colorGradient  渐变颜色
    │    ├─ guid  全局唯一标识符
    │    ├─ hex2str  字符串转16进制
    │    ├─ md5  MD5加密
    │    ├─ prototype  原型链
    │    ├─ queryParams  参数处理
    │    ├─ random  四舍五入
    │    ├─ randomArray  随机数组
    │    ├─ route  路由变量
    │    ├─ test  正则验证
    │    ├─ timeFormat  时间格式化
    │    ├─ timeFrom  时间戳转为多久之前
    │    ├─ toast  提示框
    │    ├─ trim  去空格
    │    ├─ type2icon  类型转icon 
    │    └─ 待续
    │
    ├─ waterfall
    │    └─ waterfall  瀑布流
    │
    │
    │
    ├─ textareaHZY  重写textarea（未完）
    └─ 敬请期待

~~~

## 组件props传值
- 能用var样式变量的就不用js处理





## 备忘录

- IOS苹果 自定义组件嵌套多层，底层组件最外层元素样式丢失，需要在页面重新定义样式，很奇怪的是绝对定位没事