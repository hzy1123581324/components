<template>
	<view :class="['btn',!canclick&&'active']" hover-class="none" @click="_chenge">
		<slot>{{title}}</slot>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '确定'
			},
			tapfun: {
				type: Function,
				required: true,
				// default:(resolve, reject)=>{
				// 这个是实例
				// 	console.log(111)
				// 	setTimeout(()=>{
				// 		resolve();
				// 	},10000)
				// }
			},
			canClick: {
				type: Boolean,
				default: true,
			}
		},
		data() {
			return {
				canclick: true,
			}
		},
		onLoad() {

		},
		mounted() {
			this.canclick = this.canClick;
		},
		methods: {
			
			
			async _chenge(){
				let {
					canclick
				} = this;
				
				if (canclick) {
						this.canclick = false;
						if (this.tapfun) {
							await  this.tapfun();
							this.canclick = true;
							
						} else {
							this.toast(this.i18n.funNull)
						}
					} else {
						canClick&&this.toast(this.i18n.dianji)
					}
				
				// const res = await this.tapfun();
				
				// if(res){
					
				// }else{
					
				// }
			},
			
			
			
			
			async __tap() {

				//this.$parent.send();

				return new Promise((resolve, reject) => {
					// console.log('******neibu*********');
					// console.log(this);
					this.tapfun(this.$parent.$root, resolve, reject)
				});
				// console.log('&&&&&&&&&&&&&&&&&&&****************&&&&&&&&&&&&&&&&&')
				// this.canclick = true;
			},
			async __change() {
				let {
					canclick
				} = this;
				if (canclick) {
					this.canclick = false;
					if (this.tapfun) {
						this.__tap().then(() => {
							console.log('调用成功了');
							this.canclick = true;
						}).catch(() => {
							console.log('这是报错了');
							this.canclick = true;
						});
					} else {
						uni.showToast({
							title: this.i18n.funNull,
							icon: 'none'
						})
					}
				} else {
					if (this.canClick) {
						uni.showToast({
							title: this.i18n.dianji,
							icon: 'none'
						})
					}
				}
			}

		},
		watch: {
			canClick(newValue, oldValue) {
				this.canclick = newValue;
			}
		},
		computed: {},
	}
</script>

<style scoped lang="stylus">
	.btn 
		width:100%;
		height:100%;
		display: flex;
		align-items: center;
		justify-content:center;
		// background:linear-gradient(0deg,rgba(249,178,36,1) 0%,rgba(255,222,98,1) 100%);
		box-shadow:var(--btn-shadow);
		border-radius: var(--btn-radius);
		font-size:32upx;
		font-family:PingFang SC;
		font-weight: 500;
		color: #fff;
		background: var(--btn-bg);
		letter-spacing: 8upx;
		&.active 
			opacity 0.4

	/*************弥散投影按钮** 开始************/
	.bnt_ms {
		outline: none;
		/*display: inline-block;*/
		border-radius: 4px;
		color: #ffffff;
		position: relative;
		transition: all 0.3s ease-out;
		user-select: none;
		-webkit-user-select: none;
		z-index: 0;
		width: 91.4666666vw;
		height: 10.666666vw;
		margin: 14.9333333vw 0;
	}

	.bnt_ms:before {
		content: "";
		background: inherit;
		width: calc(100% - 6rem);
		height: 2rem;
		border-radius: 4px;
		display: inline-block;
		position: absolute;
		left: 3rem;
		bottom: 0;
		z-index: -1;
		filter: blur(0.6rem);
		-webkit-filter: blur(0.6rem);
	}

	/********************弥散投影按钮** 结束**************************/
</style>

<style>
	.btn{
		margin: 0 auto;
	}
	
</style>
<!-- 
demo
 <postpone :tapfun="send"></postpone>
demo 初始不能点击
 <postpone :tapfun="send" :canClick="false" ></postpone>
 -->
