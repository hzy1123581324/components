
/**
 * @description 去除空格
 * @param String str 需要去除空格的字符串
 * @param String pos both(左右)|left|right|all 默认both
 */
export function trim(str, pos = 'both') {
    str = String(str)
    if (pos == 'both') {
        return str.replace(/^\s+|\s+$/g, "");
    } else if (pos == "left") {
        return str.replace(/^\s*/, '');
    } else if (pos == 'right') {
        return str.replace(/(\s*$)/g, "");
    } else if (pos == 'all') {
        return str.replace(/\s+/g, "");
    } else {
        return str;
    }
}
