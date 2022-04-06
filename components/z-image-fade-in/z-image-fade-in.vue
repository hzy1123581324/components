<template>
    <view :class="['place','error']">
        <image class="image-target" :src="src" mode="" @error="imageErr" @load="imageLoad"></image>
    </view>
</template>

<script setup>
    import {ref,reactive} from "vue";
    const props = defineProps({
      src: {
        type: String,
      }
    })
    let state = ref('place');
    
    function imageErr(){}
    function imageLoad(e){
      
    }
</script>

<style scoped>
  .place{
    background-image: var(--image-fade-place);
    background-size: 100% 100%;
  }
  .error{
    background-image: var(--image-fade-error);
    background-size: 100% 100%;
  }
  .image-target{
     opacity: 0;
  }
  .image-target.active{
    opacity: 1;
  }
</style>
