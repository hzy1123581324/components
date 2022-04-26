import {
  ref,
} from "vue";
import {parseParam} from '../utils/queryParams.js';
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
export const systemInfo =  uni.getSystemInfoSync();

export function resetScroll() {
  page.value = 1;
  hasmore.value = true;
}

export function clearObject(obj) {
  for (let key in obj) {
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
      //  'switchTab','reLaunch' 参数传递不了
      if(['switchTab','reLaunch'].indexOf(type)>-1){
       const  param =  parseParam(url);
       const router = {
         param,
         path: url.split(',')[0],
         fullPath: url,
       }
        uni.setStorageSync('lastRouter',router);
      }
      
      uni[type]({
        url,
        fail() {
          uni.showToast({
            title: '页面未注册',
            icon: "error"
          })
        }
      });
      break;
    case 'navigateBack':
      // 返回上一页url 是数字
      uni.navigateBack({
        delta: url
      });
      // 第三方外部链接 
    case "outLink":
      // #ifndef H5
      // 跳转到webview页面
      uni.navigateTo({
        url: '/pages/webview/webview?url=' + url,
        fail() {
          uni.showToast({
            title: '页面未注册',
            icon: "error"
          })
        }
      })
      //#endif
      // #ifdef H5
      window.open(url,'_blank')
      //#endif
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
export function setCopy(data = "",title='复制成功',duration = 2000) {

  uni.setClipboardData({
    data,
    success: () => {
      toast(title,duration);
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
export function getElQuery(className, component = null) {
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




/*
 * 下划线转换驼峰
 */
export function underlineToHump(str) {
  // 如果首字母是_，执行 replace 时会多一个_，这里需要去掉
  if (str.slice(0, 1) === '_') {
    str = str.slice(1);
  }
  return str.replace(/([^_])(?:_+([^_]))/g, function($0, $1, $2) {
    return $1 + $2.toUpperCase();
  });
}

/*
 * 驼峰转换下划线
 */
export function humpToUnderline(str) {
  let temp = str.replace(/[A-Z]/g, function(match) {
    return "_" + match.toLowerCase();
  });
  // 如果首字母是大写，执行replace时会多一个_，这里需要去掉
  if (temp.slice(0, 1) === '_') {
    temp = temp.slice(1);
  }
  return temp;
}

/**
 *  对象key驼峰转下划线
 */
export function objKeyHumpToUnderline(obj) {
  const newObj = {};
  
  for(let key in obj){
    newObj[humpToUnderline(key)] = obj[key];
  }
  return newObj;
}

/**
 *  对象key下划线转驼峰
 */
export function objKeyUnderlineToHump(obj) {
  const newObj = {};
  
  for(let key in obj){
    newObj[underlineToHump(key)] = obj[key];
  }
  return newObj;
}


