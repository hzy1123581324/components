import { ref,defineEmits } from "vue";
// import {defer} from "../utils/optimize.js";
// export const publicProps ={
//     before: {
//         type: Function,
//         default: defer,
//     },
// }
// // console.log(defineEmits);
// export const publicEmit = defineEmits(['update:modelValue','change']);

// 上拉加载更多
const pageInit = 1;
export let page = ref(pageInit);
export let hasmore = ref(true);
export let limit = ref(10);



// emits 广播事件
export const updateEmit = defineEmits(['update:modelValue','update:index']);
export const publicEmit = defineEmits(['confirm',]);