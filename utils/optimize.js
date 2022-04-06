// 性能优化优化

/// 防抖
export function debounce(fn,wait) {
    let timeout = null; // 创建一个标记用来存放定时器的返回值
    return (res)=> {      
        clearTimeout(timeout); //清除定时器
        //创建新的 setTimeout
        timeout = setTimeout(()=>{
            fn(res);
        }, wait);
    };
}

// 节流
export function throttle(fn, delay) {
    let canRun = true;//通过闭包保存该变量
    // console.log('999999999999++++');
    return (res)=> {
      // console.log('--------------++++');
			// console.log(canRun,'7777777777777');
        if (!canRun) return;//立刻返回
        canRun = false;
        setTimeout(()=> {
            fn(res);
            canRun = true;
        }, delay);
    };
}

/// 推迟执行
/*
 * @dev 用于延迟执行
 * @param {Number} time 延时的时间
 * @param {Boolean} done 传递的参数
 * @return {Function} Promised对象
*/ 
export function defer(time = 0, done = "") {
  // console.log(time);
  // console.log('%%%%%%%%%%')
	/// 如果延迟时间小于等于0,直接执行
	if(Number(time.toString())<=0){
		return new Promise(resolve=>{
			resolve();
		})
	}
	return new Promise(function(resolve) {
		
		setTimeout(resolve, time, done); 
		/* === === == 》定时结束，*/
	})
};


// timeout(1000, '红灯亮了').then(function(value) {
		
// 		console.log(value);
// 		//            return new Promise(function(resolve){
// 		//                setTimeout(resolve,1000,'绿灯亮了');

// 		return timeout(1000, '绿灯亮了')

// 	})
// 	.then(function(value) {
		
// 		console.log(value);
// 		//                return new Promise(function(resolve){
// 		//                setTimeout(resolve,1000,'蓝灯亮了');
// 		return timeout(1000, '蓝灯亮了')

// 	})
// 	.then(function(value) {
		
// 		console.log(value);
// 		//              

// 	})


// console.log("a");
// var p = new Promise(function(resolve) {
	
// 	console.log("b");
// 	resolve();
// });
// console.log("c");
// p.then(function() {
	
// 	console.log("d");
// });
//依次打印 a -> b -> c -> e -> d

//快速排序
export function  quickSort(arr) { 
		//如果数组的个数小于等于1，就返回该数组
		if (arr.length <= 1) {
			return arr;
		} else {
			//否则，取得该数组的中间位置，保存在变量c中
			let c = Math.floor(arr.length / 2);
			//将变量c位置的值取出来存入变量center中
			let center = arr.splice(c, 1)[0];
			//声明两个空数组left、right
			let left = [];
			let right = [];
			//然后遍历arr数组将每个数与center做比较，大的放在right中，小的放在left中
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] <= center) {
					left.push(arr[i]);
				} else {
					right.push(arr[i]);
				}
			}
			//最后返回左边和右边的数组，并对其做相同操作，直到递归完成
			// return quickSort(left).concat(center).concat(quickSort(right));
			return [...quickSort(left), ...quickSort(center), ...quickSort(right)]
		}
	}