<template>
  <div class="image-cube-box">
    <div :class="['image-cube-item lf',]" v-for="item in _list" :key="item">
      <slot :item="item"></slot>
    </div>
  </div>
</template>
<script>
  /**
     * ImageCube 图片魔方
     * @description 根据传入数量改变
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {Array} list
     * @example <image-cube :list="list">
         <template v-slot:default="{ item }">
           <!-- <div
             :class="['imageCubeBox-item', item.type]"
             :style="'--bg:url(' + item.img + ')'"
             @click="goto(item)"
           >
             <p>{{ item.title }}</p>
             <p>{{ item.subhead }}</p>
           </div>-->
           <img style="width: 100%;height: 100%;" :src="item.img" alt @click="goto(item)" />
         </template>
     </image-cube>
     */
  import {
    computed
  } from 'vue';
  export default {
    props:{
      list: {
        type: Array,
      }
    },
    setup(props,){
      const _list = computed(() => {
        let list = props.list || [];
        let len = props.list.length;
        list.forEach((item, index) => {
          // console.log(item, index);
          if (index == 0) {
            item.type = "large";
          } else if (index == 1 && len - 1 == index) {
            item.type == "large";
          } else if (index > 0 && len - 1 == index) {
            item.type = "middle";
          } else {
            item.type = "small";
          }
          return item;
        });
        return list;
      });
      
      return _list;
    }
  }
  
</script>
<style scoped>
  .image-cube-box {
    --margin: 0.2rem;
    --width-1: 100%;
    /*一份*/
    --width-2: calc((100% - var(--margin)) / 2);
    /*两份*/
    --width-4: calc((var(--width-2) - var(--margin)) / 2);
    /* 四份*/
    --height-1: 100%;
    --height-2: var(--width-2);
    --width: var(--width-1);
    --height: var(--height-1);
  }

  .image-cube-item {
    width: var(--width);
    height: var(--height);
  }

  .image-cube-item:last-child:first-child {
    --width: var(--width-1);
    --height: var(--height-1);
  }

  /* 第一个且不是最后一个 */
  .image-cube-item:first-child:not(:last-child) {
    --width: var(--width-2);
    --height: var(--height-1);
  }

  .image-cube-item+.image-cube-item {
    margin-left: var(--margin);
  }

  .image-cube-item {
    --width: var(--width-4);
    --height: var(--height-2);
  }

  /* 第三个开始是最好一个 */
  .image-cube-item:nth-child(2)~.image-cube-item:last-child {
    margin-top: var(--margin);
    --width: var(--width-2);
  }

  /* 第二个且是倒数第二个 */
  .image-cube-item:nth-child(2):nth-last-child(2) {
    --width: var(--width-2);
  }

  /* 第二个且是最后一个 */
  .image-cube-item:nth-child(2):last-child {
    --width: var(--width-2);
    --height: var(--height-1);
  }
</style>
