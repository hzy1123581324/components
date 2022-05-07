export * from "../utils/sysAPI.js";
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
export const systemInfo = uni.getSystemInfoSync();

// 重新设置分页
export function resetScroll() {
  page.value = 1;
  hasmore.value = true;
}

export function clearObject(obj) {
  for (let key in obj) {
    delete obj[key];
  }
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

  for (let key in obj) {
    newObj[humpToUnderline(key)] = obj[key];
  }
  return newObj;
}

/**
 *  对象key下划线转驼峰
 */
export function objKeyUnderlineToHump(obj) {
  const newObj = {};

  for (let key in obj) {
    newObj[underlineToHump(key)] = obj[key];
  }
  return newObj;
}
