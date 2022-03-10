/// 推迟执行
/*
 * @dev 用于延迟执行
 * @param {Number} time 延时的时间
 * @param {Boolean} done 传递的参数
 * @return {Function} Promised对象
*/ 
export default function defer(time, done) {
	
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
