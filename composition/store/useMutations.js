import { mapMutations, createNamespacedHelpers } from 'vuex';
import {useActionMapper} from './useMapper'
/**
 * 
 * @param {*} moduleName 模块名称
 * @param {*} mapper 方法名集合 ['fn1', 'fn2']
 * @returns 
 */
export function useMutations( mapper,moduleName,) {
    let mapperFn = mapMutations;
    
	// 如果使用模块化，则使用vuex提供的createNamespacedHelpers方法找到对应模块的mapMutations方法
    if (Object.prototype.toString.call(moduleName) === "[object String]" && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapMutations
    }
    return useActionMapper(mapper, mapperFn)
}