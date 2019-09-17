//heredoc方法输出注释中的组件代码
function heredoc(fn) {
  return fn.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
}
//输出组件代码
document.write(heredoc(function () {
/*
<style>
.noMore{
  width: 16vw;
  height: 0;
  box-sizing: content-box;
  border-top: 0.13333vw solid ;
  border-bottom: 0.13333vw solid ;
}
</style>
<script type="text/x-template" id="noMore">
  <div class="fs24 flex flex_center color_87">
    <p class="noMore"></p>
    <div class="pad_lf_rg_8"><slot>暂无更多</slot></div>
    <p class="noMore"></p>
  </div>
</script>
<script>
Vue.component('noMore',{
template: "#noMore",
props: {
},
data: function () {
  return {
  }
},
mounted:function(){
},
methods: {},
computed: {}
})
</script>
*/}))
