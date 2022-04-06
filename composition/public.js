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
export function resetScroll() {
  page.value = 1;
  hasmore.value = true;

}

export function clearObject(obj){
  for(let key in obj){
    delete obj[key];
  }
}

// 通用跳转
export function jump(url, {
  type = 'navigateTo',
} = {}) {
  if (url == '' || url == '#') {
    toast('待开发')
  }

  switch (type) {
    case 'navigateTo':
    case 'redirectTo':
    case 'switchTab':
    case 'reLaunch':
      uni[type]({
        url
      });
      break;
    case 'navigateBack':
      // 返回上一页
      uni.navigateBack({
        delta: url
      });
    default:
      break;
  }
}

// 只有文本的提示框
export function toast(title, duration = 1500) {
  return uni.showToast({
    title,
    icon: "none",
    duration
  })
}

// 设置粘贴板
export function setCopy(data = "") {
  uni.setClipboardData({
    data,
    success: () => {
      uni.showToast({
        title: "复制成功",
        // title: $t("esm128"), //'复制成功',
        duration: 2000,
        icon: 'none'
      });
    }
  });
}
// 获取黏贴版
//  deme
// 需要使用 await
// await getCopy()
export async function getCopy() {
  // console.log(new Date().getTime())
  const ref = await uni.getClipboardData();
  // console.log(new Date().getTime())
  // console.log(ref.data);
  return ref.data;
}


// 获取节点信息
 export function getElQuery(className,component = null) {
    // 组件内需要传component 
    // const { proxy } = getCurrentInstance();
    // component = proxy
    return new Promise(resolve => {
      let queryInfo = '';
      // 获取元素节点信息，请查看uniapp相关文档
      // https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefboundingclientrect
      queryInfo = uni.createSelectorQuery().in(component);
      //#ifdef MP-ALIPAY
      queryInfo = uni.createSelectorQuery();
      //#endif
      queryInfo.select(className).boundingClientRect();
      queryInfo.exec(data => {
        // console.log(data);
        // console.log('%%%%%%%%%%%%%%%');
        resolve(data);
      });
    });
  }