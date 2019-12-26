
<!-- 
 
 -->
<template>
	<view class="pay-item">
		<view class="password-items">
			<view :class="['password-item',pwd_.length>index&&'active']" v-for="(item,index) in 6" :key="item">
				
			</view>
		</view>
		<view class="pay-item-input">
			<input class="pay-item-init" :type="inputType" maxlength="6" v-model="pwd_" @input="pwdChange" />
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			inputType:{
				type: String,
				default: 'number',
			},
			pwd: {
				type: String,
				default: '',
			},
			color: {
				type: String,
				default: '',
			},
			bgcolor: {
				type: String,
				default: '',
			},
			
		},
		watch:{
			pwd(newval){
				this.pwd_ = newval;
			}
		},
		data() {
			return {
				pwd_: '',
			};
		},
		methods:{
			pwdChange(e){
				console.log(e,'*************');
				let pwd =e.detail.value;
				// if(pwd.length==6){
					this.$emit('update:pwd', pwd);
				// }
				
			},
		}
	}
</script>

<style >
	.pay-item{
		position: relative;
		line-height: 1;
		display: inline-block;
	}
	.pay-item view{
		line-height: inherit;
	}
	.password-item{
		display: inline-block;
		width: 54upx;
		height: 54upx;
		background-color: #F3F3F3;
		border-radius: 2upx;
		margin-right: 30upx;
		position: relative;
	}
	.password-item.active::after{
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -6upx;
		margin-top: -6upx;
		width: 12upx;
		height: 12upx;
		border-radius: 12upx;
		background-color:#101010;
		box-sizing: border-box;
	}
	.pay-item-input{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}
	.pay-item-init{
		width: 100%;
		height: 100%;
		min-height: 100%;
		opacity: 0;
	}
</style>
