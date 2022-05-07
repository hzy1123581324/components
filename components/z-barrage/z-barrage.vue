<template>
  <view class="barrage-wrapper">
    <view :class="['barrage-main',state]">
      <template v-for="(item,id) in barrageList" :key="id" >
        <view class="barrage-item" :style="channelStyle(item)"
          @animationend="animationend($event,item)" @webkitAnimationEnd="webkitAnimationEnd($event,item)">
          <slot name="barrageItem" :item="item">{{item[keyName]}}</slot>
        </view>
      </template>
      
    </view>
  </view>
</template>

<script>
  import {
    reactive,
    computed,
    watch,
    watchEffect,
    onBeforeUnmount,
    onMounted,
    h
  } from 'vue';
  import {
    guid
  } from '../../utils/guid.js';
  import {
    defer
  } from '../../utils/optimize.js';
  import {
    random
  } from '../../utils/random.js';
  /**
   * @description  弹幕
   * @property {type} prop_name 
   * @example 
   * <z-barrage :list='barrageList'></z-barrage>
   */
  export default {
    name: 'barrage',
    emits: ['update:list', 'update:state'],
    props: {
      // 弹幕源数组
      list: {
        type: Array,
        default: () => [],
        // validator(items) {
        //   console.log();
        //   for(let i=0;i<items.length;i++){
        //     if(!items[i].content){
        //       console.warn('内容不能为空')
        //       console.log(`在下标为${i}出现错误`)
        //       return false
        //     }
        //   }
        //   return true
        // }
      },
      keyName: {
        type: String,
        default: 'content'
      },
      channel: {
        type: [Number, String],
        default: 5,
        validator(val) {
          return !isNaN(val);
        }
      },
      maxBarrage: {
        type: [Number, String],
        default: 5,
        validator(val) {
          return !isNaN(val);
        }
      },
      delay:{
        type: [Number, String],
        default: 1000,
        validator(val) {
          return !isNaN(val);
        }
      },
      speed: {
        type: [Number, String],
        default: 5,
        validator(val) {
          return !isNaN(val);
        }
      },
      loop: {
        type: Boolean,
        default: false
      },
      // 弹幕是否暂停状态
      state: {
        type: String,
        default: 'autoPlay',
        validator(value) {
          return ['play', 'autoPlay', 'pause'].indexOf(value) > -1
        }
      },

    },
    setup(props, {
      emit
    }) {
      const MaxChannel = 5;
      // console.log('333333333333')
      const cacheList = reactive([]);
      let timer = null;
      const watchstop = watchEffect(() => {
         console.log(props.list,'99999999999999999')
        for (let i = 0; i < props.list.length; i++) {
          if (!props.list[i].id) {
            props.list[i].id = guid();
          }
          cacheList.push(props.list[i]);
        }
        // console.log(cacheList,'99999999999999999')
        props.list.length=0;
        emit('update:list', props.list);
        if (props.state != 'pause') {
          run();
        }
      })

      // const barrageItem = h("view",{className:'barrage-item',style: channelStyle(item) },[renderSlot(slots,'list',{item})])

      // const barrageList = reactive(JSON.parse('['+'[]'.repeat(props.channel).replaceAll('][','],[').split(',')+']'))
      const barrageList = reactive({});
      // 记录通道数量
      const channel = [];
      // const barrageList = computed(() => {
      //   const list = [];
      //   // 创建通道
      //   for(let i=0;i<props.channel;i++){
      //     const cacheItem  = cacheList.splice(0,props.maxBarrage); 
      //     list.push([...cacheItem])
      //   }
      //   return list;
      // });
      onMounted(() => {
        run();
      })
      // const channelStyle = computed(()=>{
      //   return (item)=>`
      //     top: ${MaxChannel>=channel ? 'unset': 100 / MaxChannel *  (channel % MaxChannel) +'%'};
      //   `;
      // })
      function channelStyle(item) {
        return `
          top: ${item.top * 100 / props.channel }%;
          --barrage-delay: ${item.delay||0}ms;
          --barrage-speed: ${props.speed}s;
        `;
      }

      function run() {
        clearInterval(timer);
        timer = setInterval(async () => {
          if (cacheList.length == 0) {
            clearInterval(timer);
            timer = null;
            return ;
          }
          const cacheItem = cacheList[0];
          let isfull = false;
          // 定位弹幕通道
          while (true) {
            if (channel.length>0&&channel.reduce((a=0, b=0) => a + b) == props.channel * props.maxBarrage) {
              isfull = true;
              break
            }
            // console.log(cacheItem);
            cacheItem.top = random(0, props.channel - 1);
            cacheItem.delay = channel[cacheItem.top] * props.delay;
            // console.log(cacheItem.top,'随机通道')
            if (channel[cacheItem.top] && channel[cacheItem.top] < props.maxBarrage) {
              channel[cacheItem.top] = channel[cacheItem.top] + 1;
              break;
            } else if (channel[cacheItem.top] >= props.maxBarrage) {
              continue;
            } else {
              channel[cacheItem.top] = 1;
              break;
            }

          }
          
          if (isfull) {
            // console.log('弹幕已经满了');
            return ;
          }

          // console.log(cacheItem,'**********++++++++');
          barrageList[cacheItem.id] = cacheItem;
          // barrageList.push(cacheItem)
          

          // console.log(barrageList, '**********');
          cacheList.splice(0,1)
          
          // console.log(JSON.stringify(barrageList));


        }, 800)
      }

      function animationend(e, item) {
        // console.log('animationend')
        // console.log(e);
        if (props.loop) {
          setTimeout(()=>{
           
            delete barrageList[item.id];
            item.id = guid();
            channel[item.top] = channel[item.top]-1;
            cacheList.push(item);
            run();
          },3000)
          
        }

      }

      function webkitAnimationEnd(e, item) {
        // console.log('webkitAnimationEnd')
        // console.log(e);
        if (props.loop) {
          setTimeout(()=>{
           
            delete barrageList[item.id];
            item.id = guid();
            channel[item.top] = channel[item.top]-1;
            cacheList.push(item);
            run();
          },3000)
          
        }


      }
      onBeforeUnmount(() => {
        watchstop()
        clearInterval(timer);
      })
      return {
        channelStyle,
        barrageList,
        animationend,
        webkitAnimationEnd,
      }
    }
  };
</script>
<style scoped>
  .barrage-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .barrage-main {
    height: var(--barrage-view-height, 80%);
    position: relative;

  }

  .barrage-item {
    position: absolute;
    animation: barrage-run var(--barrage-speed, 5s) var(--barrage-delay, 0s) linear;
    opacity: 0;
    left: 750rpx;
    transform: translate3d(100%, 0, 0);
  }

  .barrage-item:hover {
    animation-play-state: paused;
  }

  @keyframes barrage-run {
    0% {
      opacity: 1;
      left: 750rpx;
      transform: translate3d(100%, 0, 0);
    }

    100% {
      opacity: 1;
      left: 0;
      transform: translate3d(-100%, 0, 0);
    }
  }
</style>
