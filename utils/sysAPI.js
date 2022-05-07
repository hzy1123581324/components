
import {
  parseParam
} from '../utils/queryParams.js';
import {getCurrentInstance} from 'vue';
// 设置粘贴板
export function setCopy(data = "", title = '复制成功', duration = 2000) {
  // #ifndef H5
  uni.setClipboardData({
    data,
    success: () => {
      toast(title, duration);
    }
  });
  // #endif

  // #ifdef H5
  const textarea = document.createElement('textarea')
  textarea.value = data
  textarea.readOnly = true
  document.body.appendChild(textarea)
  textarea.select()
  textarea.setSelectionRange(0, data.length)
  document.execCommand('copy')
  textarea.remove()
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
  // #endif
}
// 获取黏贴版
//  deme
// 需要使用 await
// await getCopy()
export async function getCopy() {
  console.warn('需要使用 await');
  let data = "";
  // #ifndef H5
  data = await uni.getClipboardData().then(res => res.data);
  // #endif

  // #ifdef H5
  // try {
    // console.log('44444444444')
    data = await navigator.clipboard.readText().then(res => {
      // console.log(res);
      return res;
    }).catch(err => console.log(err,'5555555'))
  // } catch (error) {
  //   fail(error)
  // }
  // #endif
  // console.log/('会打印两次不知道为什么')
  return data;
}

// 通用跳转
export function jump(url, {
  type = 'navigateTo',
  message = '待开放'
} = {}) {
  if (url == '' || url == '#') {
    toast(message)
  }

  switch (type) {
    case 'navigateTo':
    case 'redirectTo':
    case 'switchTab':
    case 'reLaunch':
      // 'switchTab','reLaunch' 参数传递不了
      // 以下没效果
      // if (['switchTab', 'reLaunch'].indexOf(type) > -1) {
      //   console.log( getCurrentPages()[0].$route,'8888888888855555555555')
      //   const param = parseParam(url);
      //   const router = {
      //     param,
      //     path: url.split(',')[0],
      //     fullPath: url,
      //   }
      //   uni.setStorageSync('lastRouter', router);
      // }

      uni[type]({
        url,
        fail() {
          if (process.env.NODE_ENV === 'development') {
            uni.showToast({
              title: '页面未注册',
              icon: "error"
            })
          }
          
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
          if (process.env.NODE_ENV === 'development') {
            uni.showToast({
              title: '页面未注册',
              icon: "error"
            })
          }
        }
      })
      //#endif
      // #ifdef H5
      window.open(url, '_blank')
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

// 获取节点信息
export function getElQueryFields(className,component = null,fields={size: true,
        rect: true,
        scrollOffset: true,}, ) {
  // 组件内需要传component 
  // const { proxy } = getCurrentInstance();
  // component = proxy
  return new Promise((resolve,reject) => {
    let queryInfo = '';
    // 获取元素节点信息，请查看uniapp相关文档
    // https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefboundingclientrect
    queryInfo = uni.createSelectorQuery().in(component);
    //#ifdef MP-ALIPAY
    queryInfo = uni.createSelectorQuery();
    //#endif
    queryInfo.select(className).fields(fields, data => {
        // console.log( "得到布局位置信息" + JSON.stringify(data));
        // console.log("节点离页面顶部的距离为" + data.top);
        if (data) {
          resolve(data);
        }else{
          reject(data);
        }
    }).exec();
  });
}
