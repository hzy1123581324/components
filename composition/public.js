import {
  ref,
} from "vue";
//要在js中使用国际化
// import { useI18n } from 'vue-i18n';
// const { t as $t } = useI18n()
// 上拉加载更多
const pageInit = 1;
export let page = ref(pageInit);
export let hasmore = ref(true);
export let limit = ref(10);
// emits 广播事件
// export function emitBuilder(defineEmits){
//   return {
//     updateEmit: defineEmits(['update:modelValue','update:index']),
//     publicEmit: defineEmits(['confirm',]),
//   }
// }

export function jump(url, {
  type = 1,
}) {
  if (url == '' || url == '#') {
    toast('待开发')
  }
  let openType = ['navigateTo','redirectTo','switchTab',"reLaunch"];
  switch (type) {
    case 1:
    case 2:
    case 3:
    case 4:
    uni[openType-1]({url});
    break;
    case 5:
    // 返回上一页
    uni.navigateBack({delta:url});
    default:
      break;
  }
}

// 只有文本的提示框
export function toast(title,duration=1500) {
  return uni.showToast({
    title,
    icon: "none",
    duration
  })
}
