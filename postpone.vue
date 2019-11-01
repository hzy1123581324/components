<template>
	<view :class="['btn',!canclick&&'active']" hover-class="none" @click="__change"><slot>确定</slot></view>
</template>

<script>
	export default {
		props:{
			tap:{
				type: Function,
				// default:(resolve, reject)=>{
				// 这个是实例
				// 	console.log(111)
				// 	setTimeout(()=>{
				// 		resolve();
				// 	},10000)
				// }
			},
		},
		data() {
			return {
				canclick: true,
			}
		},
		onLoad() {
	
		},
		methods: {
			__tap(){
				return new Promise((resolve, reject)=> {
					this.tap(resolve,reject)	
				})
			},
			__change(){
				let {canclick} = this;
				console.log('&&&&&&&&&&&&&')
				if(canclick){
					if(this.tap){
						this.canclick = false;
						this.__tap().then(()=>{
							console.log(4444)
							this.canclick = true;
						}).catch(()=>{
							console.log(5555)
							this.canclick = true;
						});
					}else{
						uni.showToast({
							title: '还没有设置方法',
							icon: 'none'
						})
					}
				}else{
					uni.showToast({
						title: '请不要重复点击',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style scoped lang="stylus">
	.btn
		width auto
		margin 0 30upx
		height 80upx
		text-align center
		line-height 80upx
		color #FFFFFF
		background-color #f55
		font-size 32upx
		border-radius 10upx
		cursor pointer
	&.active
		opacity 0.4
</style>
<!-- 
demo
 <postpone :tap="send"></postpone>
 -->