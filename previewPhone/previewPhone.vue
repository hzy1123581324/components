<template>
  <div class="preview-phone podmk">
    <div class="preview-top">
      <i></i>
      <span></span>
    </div>
    <div class="preview-home"></div>
    <div class="preview-view">
      <iframe id="iframeBox" :src="url" frameborder="0" scrolling="yes" style="height:100%"></iframe>
    </div>
  </div>
</template>

<script>
/**
 * previewPhone 手机模型
 * @description 手机容器模型
 * @tutorial https://www.uviewui.com/components/button.html
 * @property {String,Number} ratio 模型比例
 * @property {String,Number} url iframe地址
 * @example  <previewPhone :tapfun="send"></previewPhone>
 */
export default {
  name: "previewPhone",
  props: {
    // 模型比例
    ratio: {
      type: [String, Number],
      default: 2.5,
    },
    // iframe地址
    url: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      canclick: true,
    };
  },
  onLoad() {},
  mounted() {},
  methods: {},
  watch: {},
  computed: {},
};
</script>

<style scoped>
html,
body,
input {
  font-size: 14px;
  font-family: "Century Gothic", "Microsoft yahei";
  color: #323232;
}
* {
  margin: 0;
  padding: 0;
  border: 0;
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}
.header,
.main-wrap,
.header .cate,
.reward-like,
.main-wrap,
.post-meta ul,
.local,
.art-img,
.container-fluid,
.info-img img,
.entry-content img,
.login-bot .qq-login i,
.login-bot .wb-login i,
.footer-men-title i,
.tool a i,
.login-title,
.login-title span,
.comment .com-list li,
.com-page .com-page-next,
.com-reply i,
.biaoqiang-window ul,
.biaoqiang-window ul li:hover,
#footer,
.jquery-men,
.user-main,
.login-menu,
.preview-phone2,
.preview-landscape,
.preview-portrait,
.preview-phone,
.work-list-box .list-content ul li,
.flexslider form,
.tool-list a.tool-list-btn {
  position: relative;
}
.header .head-fixed,
.fixed-show .has-border,
.demo-dow,
.header .search,
.header .cate ul li,
.header .cate ul li a,
.art-a .art-img a img,
.art-a .art-img a h5,
.likes ul li img,
.mark,
.login-window .login-div,
.login-window .login-bot,
.login-title:after,
.login-window .login-div .login-input input,
.mask2,
.tool-small ul li,
.preview-phone-block,
.preview-phone .preview-top,
.preview-portrait .preview-top,
iframe {
  width: 100%;
}
.preview-phone {
  width: 407px;
  height: 811px;
}
.preview-phone,
.preview-phone2,
.preview-landscape,
.preview-portrait {
  margin: 0 auto;
  border-radius: 40px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.preview-phone .preview-top,
.preview-portrait .preview-top {
  height: 76px;
  padding-top: 26px;
}
.preview-top i,
.preview-top span,
.preview-home {
  background: #e3e3e3;
}
.preview-top i {
  margin: 0 auto;
  height: 11px;
  width: 11px;
  font-style: normal;
  text-decoration: none;
  display: block;
  margin-bottom: 6px;
}

.preview-portrait .preview-top span,
.preview-phone .preview-top span {
  margin: 0 auto;
  height: 8px;
  width: 86px;
  border-radius: 30px;
  display: block;
}
.preview-phone .preview-home,
.preview-portrait .preview-home {
  bottom: 20px;
  margin-left: -21px;
  width: 42px;
  height: 42px;
  left: 50%;
  background: #e3e3e3;
  border-radius: 50%;
  position: absolute;
}
.preview-portrait .preview-view,
.preview-phone .preview-view {
  top: 76px;
  left: 16px;
  width: 375px;
  height: 660px;
  position: absolute;
}

.header .head-fixed,
.fixed-show .has-border,
.demo-dow,
.header .search,
.header .cate ul li,
.header .cate ul li a,
.art-a .art-img a img,
.art-a .art-img a h5,
.likes ul li img,
.mark,
.login-window .login-div,
.login-window .login-bot,
.login-title:after,
.login-window .login-div .login-input input,
.mask2,
.tool-small ul li,
.preview-phone-block,
.preview-phone .preview-top,
.preview-portrait .preview-top,
iframe {
  width: 100%;
  border: none;
  background-color: #fff;
}
</style>
