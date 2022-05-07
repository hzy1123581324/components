<template>
    <view class="semiCircle" :style="stickyStyle" ref="semiCircle">
        <slot></slot>
    </view>
</template>

<script>
  import {ref,computed,onMounted} from 'vue';
    export default {
        name: "semiCircle",
        props: {
            bg: {
                type: String,
                default: '#f55'
            },
            radian: { //控制弧度比例
                type: String,
                default: '1.6',
            }
        },
        setup(props,{emit}){
          const { proxy } = getCurrentInstance();
          let width = ref(0);
          let height= ref(0);
          onMounted(()=>{
            const query = uni.createSelectorQuery().in(proxy);
            query.select('.semiCircle').boundingClientRect(data => {
                height.value = data.height;
                width.value = data.width;
            }).exec();
          })
          const stickyStyle = computed(()=>{
            let radius = width.value * props.radian; //半径
            let percentage = (height.value - radius) / height.value * 100;
            let bg_str =
                `radial-gradient(circle at 50% ${percentage}%,${props.bg} 0,${props.bg} ${radius}px,rgba(0, 0, 0, 0) ${radius}px)`;
            return {
                "background-image": [
                    "-moz-" + bg_str,
                    "-webkit-" + bg_str,
                    "-o-" + bg_str,
                    bg_str,
                ]
            }
          })
          return {
            width,
            height,
          }
        }
    };
</script>

<style>
    .semiCircle {}
</style>
