import {
	ref,
	reactive,
} from "vue"
export default popupType() {
	
	/**
	 * 顶部弹出样式处理
	 */
	function top() {
		this.popupstyle = 'top'
		this.ani = ['slide-top']
		this.transClass = {
			'position': 'fixed',
			'left': 0,
			'right': 0,
		}
	},
	/**
	 * 底部弹出样式处理
	 */
	function bottom() {
		this.popupstyle = 'bottom'
		this.ani = ['slide-bottom']
		this.transClass = {
			'position': 'fixed',
			'left': 0,
			'right': 0,
			'bottom': 0
		}
	},
	/**
	 * 中间弹出样式处理
	 */
	function center() {
		this.popupstyle = 'center'
		this.ani = ['zoom-out', 'fade']
		this.transClass = {
			'position': 'fixed',
			/* #ifndef APP-NVUE */
			'display': 'flex',
			'flexDirection': 'column',
			/* #endif */
			'bottom': 0,
			'left': 0,
			'right': 0,
			'top': 0,
			'justifyContent': 'center',
			'alignItems': 'center'
		}
	},
	/**
	 * 左边弹出样式处理
	 */
	function left() {
		this.popupstyle = 'left'
		this.ani = ['slide-left']
		this.transClass = {
			'position': 'fixed',
			'bottom': 0,
			'left': 0,
			'top': 0,

		}
	},
	/**
	 * 左边弹出样式处理
	 */
	function right() {
		this.popupstyle = 'right'
		this.ani = ['slide-right']
		this.transClass = {
			'position': 'fixed',
			'bottom': 0,
			'right': 0,
			'top': 0,
		}
	},
	return {
		top,
		bottom,
		center,
		left,
		right,
	}
}
