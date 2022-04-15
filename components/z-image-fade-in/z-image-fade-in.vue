<template>
    <view v-bind="$attrs" :class="['image-fade-in',state]" >
        <image v-bind="$attrs" :class="['image-target', state ]" :src="src" :mode="mode" @error="imageErr" @load="imageLoad" ></image>
    </view>
</template>

<script setup>
    import {ref,reactive,watchEffect,onBeforeUnmount} from "vue";
    const props = defineProps({
      src: {
        type: String,
      },
      mode:{
        type: String,
      }
    })
    //只有 'place','error',active 三个值
    let state = ref('place');
    const stop = watchEffect(()=>{
      if(!props.src){
        state.value = 'place';
      }
    })
    onBeforeUnmount(()=>{
      stop()
    })
    
    function imageErr(e){
      // console.log(e,'报错了')
      state.value = 'error';
    }
    function imageLoad(e){
      // console.log(props.src,'加载成功了');
      state.value = 'active';
      // 下面的暂时没用到
      // 
      return ;
      switch (props.mode){
        case 'widthFix':
          break;
        default:
          break;
      }
    }
</script>

<style scoped>
  .image-fade-in{
    border-radius: var(--image-fade-radius,inherit);
  }
  /* 可以通过伪类+高斯模糊实现动画效果 */
  .place,.error{
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .place{
    background-image: var(--image-fade-place);
  }
  .error{
    background-image: var(--image-fade-error);
  }
  .image-target{
     opacity: 0;
     width: 100%;
     height: 100%;
     border-radius: inherit;
  }
  .image-target.active{
    opacity: 1;
  }
</style>
