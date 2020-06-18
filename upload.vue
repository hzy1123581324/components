<template>
  <div class="upload-box">
    <div class="img-box" v-for="item in images" :key="item" v-show="images.length>0">
      <img :src="item" alt />
    </div>
    <div class="upload-img-box img-box" v-show="images.length<5">
      <img src="@images/upload-image.svg" />
      <input type="file" ref="fileInt" @change="imagesUpload" />
    </div>
  </div>
</template>

<script>
/**
 * uplaod 上传
 * @description 图片上传
 * @tutorial https://www.uviewui.com/components/button.html
 * @property {String} imgs 上传的图片路径
 * @example <upload :imgs.sync="list"></upload>
 */
import maxIndex from "@mixins/index.js";
export default {
  name: "upload",
  props: {
    imgs: { type: String, default: "" }
  },
  components: {},
  computed: {},
  data() {
    return {
      images: []
    };
  },
  mixins: [maxIndex],
  mounted() {
    let images = this.imgs.split(",") || [];
    for (let i = 0; i < images.length; i++) {
      if (images[i]) {
        this.images.push(images[i]);
      }
    }
  },
  watch: {},
  destroyed() {},
  methods: {
    imagesUpload() {
      const file = this.$refs.fileInt.files[0];
      this.updateImg(file, res => {
        this.images.push(res.data.url);
        this.$emit("update:imgs", this.images.join());
      });
    }
  }
};
</script>

<style scoped>
.upload-box,
.img-items {
  display: flex;
  flex-wrap: wrap;
}
.img-box {
  width: 1.2rem;
  height: 1.4rem;

  margin-right: 0.3rem;
  margin-top: 0.3rem;
  border-radius: 0.04rem;
}
.img-box img {
  width: 100%;
  height: 100%;
}
.upload-img-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #f7f7f7;
}
.upload-img-box img {
  width: 0.42rem;
  height: 0.34rem;
}
.upload-img-box input {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  width: 100%;
}
</style>
