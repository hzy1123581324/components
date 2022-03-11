<template>
	<view v-if="modelValue" class="popup" :class="[popupstyle]" @touchmove.stop.prevent="clear">
		<z-transition class="mask" v-if="maskShow" :mode-class="['fade']" :duration="duration" :show="showTrans"
			@click="onTap" />
		<z-transition class="transition-block" :mode-class="ani" :styles="transClass" :duration="duration"
			:show="showTrans" @click="onTap">
			<view class="popup-wrapper-box" @click.stop="clear">
				<slot></slot>
			</view>
		</z-transition>
	</view>
</template>

<script>
	import popup from './popup.js';
	/**
	 * PopUp 弹出层
	 * @description 弹出层组件，为了解决遮罩弹层的问题
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} type = [top|center|bottom|left|right] 弹出方式
	 *     @value top 顶部弹出
	 *     @value center 中间弹出
	 *     @value bottom 底部弹出
	 *     @value left 左边弹出
	 *     @value right 右边弹出
	 *     @value message 消息提示
	 *     @value dialog 对话框
	 *     @value share 底部分享示例
	 * @property {Boolean} animation = [ture|false] 是否开启动画
	 * @property {Boolean} maskClick = [ture|false] 蒙版点击是否关闭弹窗
	 * @event {Function} change 打开关闭弹窗触发，e={show: false}
	 * @example <z-popup ref="popup"></z-popup>
	 * <style>
	    .popup{
	        --popup-index: 定义popup组件的层级
	    }
	 *</style>
	 */

	export default {
		name: 'z-popup',
		props: {
			modelValue: {
				type: Boolean,
				default: false,
			},
			// 开启动画
			animation: {
				type: Boolean,
				default: true
			},
			// 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；left: 左弹出框；right：右弹出框；center：全屏弹出层
			// message: 消息提示 ; dialog : 对话框
			type: {
				type: String,
				default: 'center',
				validator: function(value) {
					// 这个值必须匹配下列字符串中的一个
					return ['top', 'bottom', 'right', 'left', 'center', 'message', 'dialog', ].indexOf(value) !== -1
				}
			},
			// maskClick
			maskClick: {
				type: Boolean,
				default: true
			}
		},
		provide() {
			return {
				popup: this
			}
		},
		mixins: [popup],
		watch: {
			/**
			 * 监听type类型
			 */
			type: {
				handler: function(newVal) {
					this[this.config[newVal]]()
				},
				immediate: true
			},
			/**
			 * 监听遮罩是否可点击
			 * @param {Object} val
			 */
			maskClick(val) {
				this.mkclick = val
			},
			modelValue(newval) {
				this.$emit('update:modelValue', newval);
				if (newval) {
					this.open();
				} else {
					this.close();
				}
			}
		},
		data() {
			return {
				duration: 300,
				ani: [],
				// showPopup: false,
				showTrans: false,
				transClass: {
					'position': 'fixed',
					'left': 0,
					'right': 0,
				},
				maskShow: true,
				mkclick: true,
				popupstyle: 'top'
			}
		},
		created() {
			this.mkclick = this.maskClick
			if (this.animation) {
				this.duration = 300
			} else {
				this.duration = 0
			}
			if (this.modelValue) {
				this.open()
			} else {
				this.close();
			}
		},
		methods: {
			clear(e) {
				// TODO nvue 取消冒泡
				e.stopPropagation();
			},
			open() {
				// this.showPopup = true
				this.$emit('input', true);
				this.$nextTick(() => {
					new Promise(resolve => {
						clearTimeout(this.timer)
						this.timer = setTimeout(() => {
							this.showTrans = true
							// fixed by mehaotian 兼容 app 端
							this.$nextTick(() => {
								resolve();
							})
						}, 50);
					}).then(res => {
						// 自定义打开事件
						// clearTimeout(this.msgtimer)
						// this.msgtimer = setTimeout(() => {
						//     this.customOpen && this.customOpen()
						// }, 100)
						if (this.type == 'left' || this.type == 'right') {
							uni.hideTabBar()
						}
						this.$emit('change', {
							show: true,
							type: this.type
						})
					})
				})
			},
			close(type) {
				this.showTrans = false
				this.$nextTick(() => {
					this.$emit('change', {
						show: false,
						type: this.type
					})

					if (this.type == 'left' || this.type == 'right') {
						uni.showTabBar()
					}
					clearTimeout(this.timer)
					// 自定义关闭事件
					// this.customOpen && this.customClose()
					this.timer = setTimeout(() => {
						// this.showPopup = false
						this.$emit('update:modelValue', false);
					}, 300)
				})
			},
			onTap() {
				this.mkclick && this.close()
			},
			/**
			 * 顶部弹出样式处理
			 */
			top() {
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
			bottom() {
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
			center() {
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
			left() {
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
			right() {
				this.popupstyle = 'right'
				this.ani = ['slide-right']
				this.transClass = {
					'position': 'fixed',
					'bottom': 0,
					'right': 0,
					'top': 0,
				}
			}

		}
	}
</script>
<style lang="scss" scoped>
	.popup {
		position: fixed;
		/* #ifndef APP-NVUE */
		z-index: var(--popup-index, 999);
		/* #endif */
		// height: 100vh;
		
	}

	.popup-mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--popup-mask-bg-color, rgba(0, 0, 0, 0.4));
		opacity: 0;
	}

	.mask {
		margin-top: var(--mask-top, 0);
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		backgroundColor: rgba(0, 0, 0, 0.4);
	}

	.transition-block {
		margin-top: var(--mask-top, 0);
	}

	.mask-ani {
		transition-property: opacity;
		transition-duration: 0.2s;
	}

	.top-mask {
		opacity: 1;
	}

	.bottom-mask {
		opacity: 1;
	}

	.center-mask {
		opacity: 1;
	}

	.popup-wrapper {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: absolute;
	}

	.top {
		/* #ifdef H5 */
		top: var(--window-top);
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
	}

	.bottom {
		bottom: 0;
	}

	.popup-wrapper-box {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: relative;
		/* iphonex 等安全区设置，底部安全区适配 */
		/* #ifndef APP-NVUE */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
	}

	.content-ani {
		// transition: transform 0.3s;
		transition-property: transform, opacity;
		transition-duration: 0.2s;
	}


	.top-content {
		transform: translateY(0);
	}

	.bottom-content {
		transform: translateY(0);
	}

	.center-content {
		transform: scale(1);
		opacity: 1;
	}
</style>
