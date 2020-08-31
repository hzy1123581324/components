<template>
  <view class="chat-box">
    <!-- 聊天室主体 -->
    <view>
      <view v-for="item in chatRecord" :key="item.id"></view>
    </view>
    <!-- 输入框 -->
    <view></view>
  </view>
</template>

<script>
/**
 * counter 聊天室
 * @description 商品自增自减
 * @tutorial https://www.uviewui.com/components/button.html
 * @property {String,Number} time 倒计时时间
 * @example <chat></chat>
 */

export default {
  name: "chat",
  props: {},
  data() {
    return {
      chatRecord: [
        {
          date: 1010101,
          id: 1,
          originId: 1,
          type: 1, //1文本，2图片，3视频，4.
        },
      ],
    };
  },
  onLoad() {},
  mounted() {},
  methods: {},
  watch: {},
  computed: {},
};
</script>
<style scoped >
</style>

