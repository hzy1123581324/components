<!-- 仿支付宝支付密码组件 -->
<template>
    <!-- 点击区域 -->
		<view v-bind="$attr" class="w_100" @click="showPayment = !showPayment" v-if="type=='embed'">
			<slot></slot>
		</view>
    
    <z-popup  v-bind="$attr" v-model='showPayment' type="bottom">
      <view class="paymentTitleBox lh98 bg_f9 txt-c bor-btm bor-e2" @click.stop>
      		<!-- <view class="absolute-rg-center  size38 z_9999 mar-lf-30 color_97" @click="showPayment = !showPayment">{{i18n.cancel_txt}}</view> -->
      		<!--取消-->
      		<view class="color_13 paymentTitle">{{i18n.$validation.into_payPwd}}</view>
      		<!--请输入支付密码-->
      	</view>
      	<view class="bg_f9 clear" @click.stop>
      		<view class="payment-init-box h98 flex radius-10">
      			<view :class="['payment-init',passWord.length-1>=index&&'satisfy']" v-for="(item,index) in 6"
      				:key="item"></view>
      		</view>
      		<view class="payment-forget" v-show="forget">
      			<view class="txt-rg fs32 mar-rg-30" @click="forget">{{i18n.$validation.forgetPwd}}</view>
      			<!--忘记密码-->
      		</view>
      	</view>
      
      	<view class="payment-keyboard flex flex-center flex-wrap" @click.stop>
      		<view class="w_33 txt-c payment-numcell color_31" hover-class="payment-numcell-active"
      			hover-stay-time="300" v-for="item in nums" :key="item" @click="passWord += item">{{item}}</view>
      		<view class="payment-cancel w_33 lh98 h98 " @click=" passWord = passWord.slice(0,-1)">
      			<svg class="payment-cancel-item" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.67 253">
      				<g>
      					<path d="M54.63,136.23,148.12,253V0L54.63,116.77A12.54,12.54,0,0,0,54.63,136.23Z" />
      					<path
      						d="M388,0H147.67V253h240a13,13,0,0,0,13-13V12.72A12.73,12.73,0,0,0,388,0ZM330.74,166.1a12,12,0,0,1-17,17l-39.6-39.6-39.6,39.6a12,12,0,0,1-17-17l39.6-39.6L217.6,86.9a12,12,0,1,1,17-17l39.6,39.6,39.6-39.6a12,12,0,0,1,17,17l-39.6,39.6Z" />
      				</g>
      			</svg>
      		</view>
      	</view>
      
    </z-popup>
</template>

<script>
	/**
     * payment 
     * @description 商品自增自减
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {String,Number} min 最小值
     * @property {String,Number} max 最大值
     * @property {String,Number} num 初始化的值
     * @example <payItem class="payItem" :pwd.sync="pwd"></payItem>
     * 修改样式,修改不成功，注意是否是优先级的问题
     * <style>
        .payItem{
            --cell-size: 54rpx;
            --cell-radius: 2rpx;
            --cell-bg: #F3F3F3;
            --cell-gauge: 30rpx;
            --dot-size: 12rpx;
            --dot-bg: #101010;
        }
     </style>
     */
	export default {
		name: 'payment',
		props: {
			password: {},
			pay: {
				type: Function,
			},
			forget: {
				type: Function,
			},
			showpayment: {
				type: [Boolean, String, Number],

			},
			type: {
				type: String,
				default: 'trigger',
				validator: function(value) {
					// 这个值必须匹配下列字符串中的一个
					return ['embed', 'trigger'].indexOf(value) !== -1
				}
			}
		},
		data() {
			return {
				showPayment: false,
				passWord: '',
				nums: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
			}
		},
		mounted() {},
		methods: {
			getpayword() {
				this.forget();
			}
		},
		computed: {

		},
		watch: {
			showpayment(newval) {
				this.showPayment = newval;
			},
			showPayment(newval) {
				this.passWord = '';
				if (!newval) {
					this.$emit("update:showpayment", newval);
				}
			},
			passWord(newval) {
				if (newval.length >= 6) {
					this.pay && this.pay(newval);
					this.$emit("update:password", newval);
					this.$emit("passworded", newval);
					setTimeout(() => {
						this.showPayment = false;
					}, 500)
				}


			}
		}
	}
</script>

<style>
	/* 仿支付宝 输入支付密码组件 */



	.paymentTitle {
		line-height: 98rpx;
	}



	.payment-init-box {
		/* border:.13333vw solid #d2d2d2; */
		box-shadow: 0 0 0 0.26667vw #e7e7e7;
		margin: 7.2vw 4vw;
		overflow: hidden;
		display: flex;
	}

	.payment-init-box .payment-init {
		flex-grow: 1;
		flex-shrink: 0;
		position: relative;
	}

	.payment-init-box .payment-init.satisfy::before {
		content: '';
		width: 24rpx;
		height: 24rpx;
		position: absolute;
		border-radius: 50%;
		background: #333;
		top: 50%;
		left: 50%;
		margin-left: -12rpx;
		margin-top: -12rpx;

	}

	.payment-forget {
		color: #2E74F3;
		margin: 6vw 0 7.2vw;
		text-decoration: underline;
	}

	.payment-init-box .payment-init+.payment-init {
		box-shadow: -0.26667vw 0 0 0.26667vw #efefef;
	}

	.payment-numcell {
		font-size: 40rpx;
		line-height: 98rpx;
		height: 98rpx;
		box-shadow: 0 0 0 2rpx #e7e7e7;
		background-color: #fff;
	}

	.payment-numcell-active {
		background-color: #aaa;
	}

	.payment-keyboard {
		position: relative;
	}

	.payment-cancel {
		position: absolute;
		bottom: 0;
		right: 0;

	}

	.payment-cancel-active {}

	.payment-cancel-item {
		border-radius: 6rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		height: 36rpx;
		width: auto;
		fill: #fff;
	}
</style>
