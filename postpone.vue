<template>
	<view :class="['btn',!canclick&&'active']" hover-class="none" @click="__change"><slot>{{title}}</slot></view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default: '确定'
			},
			tap1:{
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
			canClick:{
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
			 __tap(){
				
				//this.$parent.send();
				
				return new Promise((resolve, reject)=> {
					console.log('******neibu*********');
					console.log(this);
					this.tap1(this.$parent.$root,resolve, reject)
				});
				// console.log('&&&&&&&&&&&&&&&&&&&****************&&&&&&&&&&&&&&&&&')
				// this.canclick = true;
			},
			__change(){
				let {canclick} = this;
				if(canclick){
					this.canclick = false;
					if(this.tap1){
						this.__tap().then(()=>{
							console.log('调用成功了');
							this.canclick = true;
						}).catch(()=>{
							console.log('这是报错了');
							this.canclick = true;
						});
					}else{
						uni.showToast({
							title: this.i18n.none,
							icon: 'none'
						})
					}
				}else{
					if(this.canClick){
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
		computed: {
			i18n() {  
			    return this.$t('postpone');
			},
		
		},
	}
</script>

<style scoped lang="stylus">
	.btn
		width:630upx;
		height:80upx;
		line-height: 80upx;
		background:linear-gradient(0deg,rgba(249,178,36,1) 0%,rgba(255,222,98,1) 100%);
		box-shadow:0px 4upx 4upx 0px rgba(74,74,74,0.3);
		border-radius:40upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		margin: 0 auto;
		letter-spacing: 6upx;
	&.active
		opacity 0.4
		
	/*************弥散投影按钮** 开始************/
	.bnt_ms{
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
	.bnt_ms:before{
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
<!-- 
demo
 <postpone :tap="send"></postpone>
demo 初始不能点击
 <postpone :tap="send" :canClick="false" ></postpone>
 -->