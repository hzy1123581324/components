function overwriteCancelAnimationFrame(id) {
			clearTimeout(id)
		}
function overwriteRequestAnimationFrame(callback, element) {
			var currTime = new Date().getTime()
      // 为了使setTimteout的尽可能的接近每秒60帧的效果
			var timeToCall = Math.max(0, 16 - (currTime - lastTime))
			var id = window.setTimeout(function () {
				callback(currTime + timeToCall)
			}, timeToCall)
			lastTime = currTime + timeToCall
			return id
		}
(function () {
	var lastTime = 0
	var vendors = ['ms', 'moz', 'webkit', 'o']
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
		window.cancelAnimationFrame =
			window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = overwriteRequestAnimationFrame 

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = overwriteCancelAnimationFrame
})()

export {
  overwriteRequestAnimationFrame as requestAnimationFrame,
  overwriteCancelAnimationFrame as cancelAnimationFrame
}