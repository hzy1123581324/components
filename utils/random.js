// 随机操作

/**
 * @description 取一个区间随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
export function random(min, max) {
	if (min >= 0 && max > 0 && max >= min) {
		const gab = max - min + 1
		return Math.floor(Math.random() * gab + min)
	}
	return 0
}
// 打乱数组
// function randomArray(array = []) {
//     // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
//     return array.sort(() => Math.random() - 0.5);
// }
// 打乱数组
/**
 * @description 打乱数组
 * @param {array} arr 需要打乱的数组
 * @return {array}
 */
export function randomArray(arr = []) {
    const newarr = []
    while (arr.length) {
        const ran = parseInt(Math.random() * arr.length)
        newarr.push(arr[ran])
        arr.splice(ran, 1)
    }
    return newarr
}


/**
 * @description 打乱数组
 * @param {array} array 需要打乱的数组
 * @returns {array} 打乱后的数组
 */
export function randomArraySort(array = []) {
	// 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
	return array.sort(() => Math.random() - 0.5)
}

/**
 * 返回一个区间范围的值
 * @description 如果value小于min，取min；如果value大于max，取max
 * @param {number} min 
 * @param {number} max 
 * @param {number} value
 * @return {number} 
 */
export function range(min = 0, max = 0, value = 0) {
    return Math.max(min, Math.min(max, Number(value)))
}