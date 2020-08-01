<template>
	<view class="code-box" @click="__getcode">
		<text class="code-active" v-show="active_time>0">{{active_time}}s</text>
		<text class="code-default" v-show="active_time<=0">
			<slot>{{i18n&&i18n.$validation.getCode}}</slot>
		</text>
	</view>
</template>

<script>
	let timer = '';
	export default {
		props: {
			time: {
				type: [String, Number],
				default: 60,
			},
			getcodefun:{
				type: Function,
				// required: true,
				
				// default:(resolve, reject)=>{
				// 	console.log(222222)
				// 	setTimeout(()=>{
				// 		resolve();
				// 	},1000)
				// }
			},
			// title:{
			// 	type: String,
			// 	default: ,
			// },
			codetype: {
				type: [Number,String],
				default: 1,//1=电话，2邮箱
			},
			quhao:{
				//区号
				type: [String,Number],
				default: '',//1=电话，2邮箱
			},
			phone:{
				type: [String, Number],
				// required: true,
			},
			email:{
				type: [String],
				// required: true,
			},
			trigger:{
				//接口调用后立即处于可点击状态
				type: [Boolean,Number,],
				default: false,
			},
		},
		data() {
			return {
				active_time: 0,
			}
		},
		onLoad() {

		},
		mounted() {

		},
		methods: {
			async __getcode() {
				// console.log(this.quhao);
				// return ;
				// console.log('++++++++++++++++++++')
				// if(this.getcodefun){
				// 	const res = await this.getcodefun();
				// }else{
					
				// }
				let {active_time} = this;
				
				if(active_time<=0){
					console.log('************');
					
					let res = '';
					if(this.getcodefun){
							
						res = await this.getcodefun();
					}else{
						res = await this.getcode()
					}
	
					if(res){
						this.active_time = this.time;
						timer=setInterval(()=>{
							let {active_time} = this;
							this.active_time--;
							if(this.active_time<=0){
								clearInterval(timer);
							}
						},1000)
					}else{
						
						if(this.trigger){
							this.active_time = 0;
							clearInterval(timer);
						}
					}
					
					// new Promise((resolve, reject)=> {
					// 	if(this.getcode){
					// 		this.active_time = this.time;
					// 		console.log(this.active_time,this.time);
					// 		timer=setInterval(()=>{
					// 			let {active_time} = this;
					// 			this.active_time--;
					// 			if(this.active_time<=0){
					// 				clearInterval(timer);
					// 			}
					// 		},1000)
					// 		// console.log('&&&&&&&&&&&&&&')
					// 		this.getcode(resolve,reject);
					// 	}else{
					// 		return uni.showToast({
					// 			title: '?????????',
					// 			icon: 'none',
					// 			success() {
					// 				//防止Promise占用内存，这个不确定
					// 				reject('Promise ');
					// 			}
					// 		})
					// 	}
					// }).then(()=>{
					// 	if(this.trigger){
					// 		this.active_time = 0;
					// 		clearInterval(timer);
					// 	}	
					// })
					// .catch((err)=>{
					// 	console.log(err);
					// 	if(this.trigger){
					// 		this.active_time = 0;
					// 		clearInterval(timer);
					// 	}
					// })
					
				}else{
					
					return this.toast(this.i18n.$validation.getCoded)
					// uni.showToast({
					// 	title: this.i18n.phone1,
					// 	icon: 'none'
					// })
				}
			},
			async getcode(resolve,reject){
				let {codetype} = this;
				let {active_time,phone,email} = this;
				if(!phone&&codetype==1){
					return uni.showToast({
								title: this.i18n.phone,
								icon: 'none',
							})
				}
				if(!email&&codetype==2){
					return uni.showToast({
								title: this.i18n.email,
								icon: 'none',
							})
				}
				// if(!(/^1[3456789]\d{9}$/.test(phone+''))&&codetype==1){
				// 	return uni.showToast({
				// 			title: '手机号码有误，请重填',
				// 			icon: 'none',
				// 			success:()=> {
				// 				// this.$emit("checkphone", false);
				// 				// 以下支持双向数据绑定打开，以上关闭
				// 				this.$emit("update:phone", '');
				// 			}
				// 		})
				// }
				if(!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email))&&codetype==2){
					return uni.showToast({
							title: this.i18n.email1,
							icon: 'none',
							success:()=> {
								// this.$emit("checkphone", false);
								// 以下支持双向数据绑定打开，以上关闭
								this.$emit("update:email", '');
							}
						})
				}
				console.log('&&&&&&&&&&&&&&&&&12341234')
				if(codetype==1){
					console.log('***************');
					return  this.tel_code(resolve,reject);
				}else{
					return  this.email_code(resolve,reject);
				}
			},
			tel_code(resolve,reject){
				var that = this;
				var data ={action:'authen',xfrom:'reg'};
				 data.mobile =this.quhao+this.phone;
				 this.$net.ajax("/service/sms",data,"POST").then((result)=>{
				 		// console.log(result)
					if(result === false){
						reject();
					}else{
						resolve();
					}
				 })
			},
			email_code(resolve,reject){
				var that = this;
				var data ={};
				data.email =this.email;
				this.$net.ajax("/service/send_email",data,"POST").then((result)=>{
					// console.log(result)
						if(result === false){
							reject();
						}else{
							resolve();
						}
					
				})
			},
		},
		watch: {

		},
		computed: {
		},
	}
</script>
<style scoped lang="stylus">
	.code-box
		display flex
		width 100%
		height 100%
		justify-content center
		align-items center
		font-size inherit
	.code-active
		color #2E74F3
		
	.code-default
		cursor pointer
</style>

<!-- demo -->
<!-- <code-txt class='color_main' :phone.sync="电话号码" :getcode="接口方法"></code-txt> -->