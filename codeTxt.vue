<template>
	<view class="code-box" @click="__getcode">
		<text class="code-active" v-show="active_time>0">{{active_time}}s</text>
		<text class="code-default" v-show="active_time<=0">
			<slot>{{code_txt}}</slot>
		</text>
	</view>
</template>

<script>
	export default {
		props: {
			time: {
				type: [String, Number],
				default: 60,
			},
			getcode:{
				type: Function,
				// required: true,
				
				// default:(resolve, reject)=>{
				// 	console.log(222222)
				// 	setTimeout(()=>{
				// 		resolve();
				// 	},1000)
				// }
			},
			phone:{
				type: [String, Number],
				required: true,
			},
			trigger:{
				//接口调用后立即处于可点击状态
				type: [Boolean,Number,],
				default: true,
			},
		},
		data() {
			return {
				code_txt: '获取验证码',
				active_time: 0,
			}
		},
		onLoad() {

		},
		methods: {
			__getcode() {
				const {active_time,phone} = this;
				if(!phone){
					return uni.showToast({
								title: '请输入电话号码',
								icon: 'none',
							})
				}
				if(!(/^1[3456789]\d{9}$/.test(phone+''))){
					return uni.showToast({
							title: '手机号码有误，请重填',
							icon: 'none',
							success:()=> {
								this.$emit("checkphone", false);
								// 以下支持双向数据绑定打开，以上关闭
								// this.$emit("update:phone", '');
							}
						})
				}
				let timer = '';
				if(active_time<=0){
					console.log('************');
					new Promise((resolve, reject)=> {
						if(this.getcode){
							this.active_time = this.time;
							console.log(this.active_time,this.time);
							timer=setInterval(()=>{
								let {active_time} = this;
								this.active_time--;
								if(this.active_time<=0){
									clearInterval(timer);
								}
							},1000)
							console.log('&&&&&&&&&&&&&&')
							this.getcode(resolve,reject);
						}else{
							return uni.showToast({
								title: '没定义方法啊，混蛋',
								icon: 'none',
								success() {
									//防止Promise占用内存，这个不确定
									reject('Promise ');
								}
							})
						}
					}).then(()=>{
						if(this.trigger){
							this.active_time = 0;
							clearInterval(timer);
						}	
					})
					.catch((err)=>{
						console.log(err);
						if(this.trigger){
							this.active_time = 0;
							clearInterval(timer);
						}
					})
					
				}else{
					uni.showToast({
						title: '短信已发送，请稍后操作',
						icon: 'none'
					})
				}
			}
		},
		watch: {

		},
		computed: {

		}
	}
</script>
<style scoped lang="stylus">
	
	.code-box
		display flex
		width 100%
		height 100%
		justify-content center
		align-items center
		font-size 28upx
	.code-active
		color #333
		font-size 28upx
	.code-default
		text-decoration underline
		cursor pointer
</style>

<!-- demo -->
<!-- <code-txt class='color_main' :phone.sync="电话号码" :getcode="接口方法"></code-txt> -->