<template>
    <view :class="['place','error']" >
        <image :class="['image-target', show&&'active']" :src="src" :mode="mode" @error="imageErr" @load="imageLoad" ></image>
    </view>
</template>

<script setup>
    import {ref,reactive} from "vue";
    const props = defineProps({
      src: {
        type: String,
      },
      mode:{
        type: String,
      }
    })
    let state = ref('place');
    
    function imageErr(){}
    function imageLoad(e){
      
    }
</script>

<style scoped>
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
  }
  .image-target.active{
    opacity: 1;
  }
</style>
