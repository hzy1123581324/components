/**
 * 对象转url参数
 * @param {*} data,对象
 * @param {*} isPrefix,是否自动加上"?"
 * @param {string} arrayFormat 规则 indices|brackets|repeat|comma
 * @return {string} 返回拼接好的字符串 如 "name=1234&name3=1234"
 */
export function queryParams(data = {}, isPrefix = true, arrayFormat = 'brackets') {
  let prefix = isPrefix ? '?' : ''
  let _result = []
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
  for (let key in data) {
    let value = data[key]
    // 去掉为空的参数,不使用 ！value是有可能值为零
    if (['', undefined, null].indexOf(value) >= 0) {
      continue;
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i])
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(_value => {
            _result.push(key + '[]=' + _value)
          })
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(_value => {
            _result.push(key + '=' + _value)
          })
          break;
        case 'comma':
          // 结果: ids=1,2,3
          let commaStr = "";
          value.forEach(_value => {
            commaStr += (commaStr ? "," : "") + _value;
          })
          _result.push(key + '=' + commaStr)
          break;
        default:
          value.forEach(_value => {
            _result.push(key + '[]=' + _value)
          })
      }
    } else {
      _result.push(key + '=' + value)
    }
  }
  return _result.length ? prefix + _result.join('&') : ''
}

/**
 * 获取某一项url参数
 * @param {*} data,对象
 * @return {string} 
 */
export function getUrlParam(url = window.location.search.substr(1), name) {
  if(url.indexOf('?')>-1){
    url = url.split('?')[1];
  }
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = url.match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
/*
demo
 this.code = this.getUrlParam('code'); // 截取code
  this.state = this.getUrlParam('state'); // 截取code
*/

/**
 * 返回参数对象
 * @param {string} url,地址
 * @return {object} 返回参数对象
 */
export function parseParam(url) {
  // 将浏览器地址中 ‘?’ 后面的字符串取出来
  let paramsStr;
  if(url.indexOf('?')>-1){
     paramsStr = /.+\?(.+)$/.exec(url)[1];
  }else{
    return {}
  }
  // 将截取的字符串以 ‘&’ 分割后存到数组中
  const paramsArr = paramsStr.split('&');
  // 定义存放解析后的对象
  let paramsObj = {};
  // 遍历
  paramsArr.forEach(param => {
    // 判断是否含有key和value
    if (/=/.test(param)) {
      // 结构获取对象的key和value
      let [key, val] = param.split('=');
      // 解码
      val = decodeURIComponent(val);
      // 判断是否转为数字
      val = /^\d+$/.test(val) ? parseFloat(val) : val;
      // 判断存放对象中是否存在key属性
      if (paramsObj.hasOwnProperty(key)) {
        // 存在的话就存放一个数组
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else {
        // 不存在就存放一个对象
        paramsObj[key] = val;
      }
    } else {
      // 没有value的情况
      paramsObj[param] = true;
    }
  })
  return paramsObj;
}


export default queryParams;
