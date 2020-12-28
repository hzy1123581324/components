<template>
    <view class="icon-mode-box"></view>
</template>

<script>
    /**
     * z-icon-mode
     * @description 图标变色，使用前提： 图片的底色为白色，主色为黑色 
     * @tutorial https://ext.dcloud.net.cn/plugin?id=985
     * @example <z-icon-mode class="icon-mode"></z-icon-mode>
     * 
     * <style>
        .icon-mode{
            --icon-mode-bg-img  要改变颜色的图标
            --icon-mode-color  图标颜色。默认主题色
            --icon-mode-size  图标大小默认36rpx
        } 
        
     </style>
     */
</script>
    
<style scoped>
    .icon-mode-box{
        --size: 36rpx;
        display: inline-flex;
        height: var(--icon-mode-size,var(--size));
        text-align: center;
        background-size: cover;
        mix-blend-mode: difference;
       /* background-image: url(https://user-images.githubusercontent.com/8554143/34239266-232bdfc0-e641-11e7-8792-408782aaa78e.png), linear-gradient(deeppink, deeppink); */
       background-image: var(--icon-mode-bg-img),var(--icon-mode-color);
        background-blend-mode: lighten;
        background-size: cover;
    }
</style>
<!-- 
 <style>
     .g-flex {
         display: flex;
         flex-direction: row;
         flex-wrap: nowrap;
         width: 100vw;
         justify-content: space-between;
         overflow: hidden;
     }
 
     .pic {
         flex: 0 0 200px;
         height: 200px;
         margin: 10px;
         text-align: center;
         font-size: 24px;
         line-height: 160px;
         background-image: url(https://user-images.githubusercontent.com/8554143/34239266-232bdfc0-e641-11e7-8792-408782aaa78e.png);
         background-size: cover;
         mix-blend-mode: difference;
         color: #fff;
     }
 
     .pic1 {
         background-image: url(https://user-images.githubusercontent.com/8554143/34239266-232bdfc0-e641-11e7-8792-408782aaa78e.png), linear-gradient(deeppink, deeppink);
         background-blend-mode: lighten;
         background-size: cover;
     }
 
     .pic2 {
         background-image: url(https://user-images.githubusercontent.com/8554143/34239266-232bdfc0-e641-11e7-8792-408782aaa78e.png), linear-gradient(yellowgreen, yellowgreen);
         background-blend-mode: lighten;
         background-size: cover;
     }
 
     .pic3 {
         background-image: url(https://user-images.githubusercontent.com/8554143/34239266-232bdfc0-e641-11e7-8792-408782aaa78e.png), linear-gradient(#f00, #00f);
         background-blend-mode: lighten;
         background-size: cover;
     }
 </style>
 </head>
 
 <body>
      使用前提： 图片的底色为白色，主色为黑色 
 
     <div class="g-flex">
         <div class="pic">原图</div>
         <div class="pic pic1">粉色</div>
         <div class="pic pic2">绿色</div>
         <div class="pic pic3">渐变</div>
     </div>
 </body>
 -->