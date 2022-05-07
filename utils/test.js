export const pattern = {
  email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
  phone: /^1[23456789]\d{9}$/,
  url: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
  dateISO: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
  number: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
  idCard: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
}

// is image URL?
const  iExt = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'].map(f => '.' + f);
function isImage(url) {

  return iExt.reduce((ret, ext) => ret || url.endsWith(ext), false);

}
/**
 * 验证电子邮箱格式
 */
export function isEmail(value) {
    return pattern.email.test(value);
}

/**
 * 验证手机格式
 */
export function isMobile(value) {
    return pattern.phone.test(value)
}
/**
 * 验证URL格式
 */
export function isUrl(value) {
    return pattern.url.test(value)
}
/**
 * 是否数组
 */
export function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]';
}
/**
 * 是否数组
 */
export function isArray(value) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value)
    }
    return Object.prototype.toString.call(value) === '[object Array]'
}
/**
 * 是否对象
 */
export function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 是否为空对象
 */
export function isEmptyObject(obj) {
    return Object.keys(obj).length == 0;
}
/**
 * 验证日期格式
 */
export function isDate(value) {
    return !/Invalid|NaN/.test(new Date(value).toString())
}

/**
 * 验证ISO类型的日期格式
 */
export function isDateISO(value) {
    return pattern.dateISO.test(value)
}

/**
 * 验证十进制数字
 */
export function isNumber(value) {
    return pattern.number.test(value)
}
/**
 * 验证是否是数字
 */
export function isNum(value) {
    if(!value){
      return false;
    }
    return !isNaN(parseFloat(val));
}
/**
 * 验证整数
 */
export function isDigits(value) {
    return /^\d+$/.test(value)
}

/**
 * 验证身份证号码
 */
export function isIdCard(value) {
    return pattern.idCard.test(value)
}

/**
 * 是否车牌号
 */
export function isCarNo(value) {
    // 新能源车牌
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    // 旧车牌
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
        return creg.test(value);
    } else if (value.length === 8) {
        return xreg.test(value);
    } else {
        return false;
    }
}

/**
 * 金额,只允许2位小数
 */
export function isAmount(value) {
    //金额，只允许保留两位小数
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0.\d{1,2}$/.test(value);
}

/**
 * 中文
 */
export function isChinese(value) {
    let reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
}

/**
 * 只能输入字母
 */
export function isLetter(value) {
    return /^[a-zA-Z]*$/.test(value);
}

/**
 * 只能是字母或者数字
 */
export function isEnOrNum(value) {
    //英文或者数字
    let reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
}

/**
 * 验证是否包含某个值
 */
export function isContains(value, param) {
    return value.indexOf(param) >= 0
}

/**
 * 验证一个值范围[min, max]
 */
export function isRange(value, param) {
    return value >= param[0] && value <= param[1]
}

/**
 * 验证一个长度范围[min, max]
 */
export function isRangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1]
}

/**
 * 判断是否为空
 */
export function isEmpty(value){
    switch (typeof value) {
        case 'undefined':
            return true;
        case 'string':
            if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
            break;
        case 'boolean':
            if (!value) return true;
            break;
        case 'number':
            if (0 === value || isNaN(value)) return true;
            break;
        case 'object':
            if (null === value || value.length === 0) return true;
            for (var i in value) {
                return false;
            }
            return true;
    }
    return false;    
}
/**
 * 判断是否是JSON字符串
 */
export function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return (true,obj);
            }else{
                return false;
            }

        } catch(e) {
            // console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    return false
    
}
