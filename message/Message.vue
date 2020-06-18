<template>
  <transition name="fade">
    <div class="message" :class="type" v-if="visible">
      <i class="icon-type iconfont" :class="'icon-'+type"></i>
      <div class="content">
        {{content||'99999999999999'}}
        <i
          v-if="hasClose"
          class="btn-close iconfont icon-close"
          @click="visible=false"
        ></i>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MyMessage",
  data() {
    return {
      content: "4444444",
      time: 3000,
      visible: false,
      type: "info", //'success','warning','error'
      hasClose: false
    };
  },
  mounted() {
    this.close();
  },
  methods: {
    close() {
      window.setTimeout(() => {
        this.visible = false;
      }, this.time);
    }
  }
};
</script>
<style>
</style>