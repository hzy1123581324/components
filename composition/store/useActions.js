import { mapActions, createNamespacedHelpers } from 'vuex';
import {useActionMapper} from './useMapper'
/**
 * 
 * @param {*} moduleName 模块名称
 * @param {*} mapper 方法名集合 ['fn1', 'fn2']
 * @returns 
 */
export function useActions(mapper=[],moduleName="",) {
    let mapperFn = mapActions;
    // console.log(mapper);
	// 如果使用模块化，则使用vuex提供的createNamespacedHelpers方法找到对应模块的mapActions方法
    if (Object.prototype.toString.call(moduleName) === "[object String]" && moduleName.length > 0) {
        mapperFn = createNamespacedHelpers(moduleName).mapActions
    }
    // console.log(mapperFn,'%%%%%%%%%');
    // console.log(useActionMapper(mapper, mapperFn));
    return useActionMapper(mapper, mapperFn)
}