<template>
    <view class="content">
        <button type="primary" @click="checkIsSupportSoterAuthentication">检查支持的认证方式</button>
        <button type="primary" @click="checkIsSoterEnrolledInDeviceFingerPrint">检查是否录入指纹</button>
        <button type="primary" @click="checkIsSoterEnrolledInDeviceFaceID">检查是否录入FaceID</button>
        <button type="primary" @click="startSoterAuthenticationFingerPrint">开始指纹认证</button>
        <button type="primary" @click="startSoterAuthenticationFaceID">开始FaceID认证</button>
    </view>
</template>

<script>
	/*
	* magnifier 生物认证
	* @description  指纹解锁，人脸识别
	* @tutorial https://www.uviewui.com/components/button.html
	* @property {String} src 图片路径
	* @example <biometrics></biometrics>
	*/
    export default {
		name: 'biometrics',
        data() {
            return {
            }
        },
        onLoad() {

        },
        methods: {
			// 检查支持的认证方式
            checkIsSupportSoterAuthentication() {
                uni.checkIsSupportSoterAuthentication({
                    success(res) {
                        console.log(res);
                    },
                    fail(err) {
                        console.log(err);
                    },
                    complete(res) {
                        console.log(res);
                    }
                })
            },
			// 检查是否录入指纹
            checkIsSoterEnrolledInDeviceFingerPrint() {
                uni.checkIsSoterEnrolledInDevice({
                    checkAuthMode: 'fingerPrint',
                    success(res) {
                        console.log(res);
                    },
                    fail(err) {
                        console.log(err);
                    },
                    complete(res) {
                        console.log(res);
                    }
                })
            },
			// 检查是否录入FaceID
            checkIsSoterEnrolledInDeviceFaceID() {
                uni.checkIsSoterEnrolledInDevice({
                    checkAuthMode: 'facial',
                    success(res) {
                        console.log(res);
                    },
                    fail(err) {
                        console.log(err);
                    },
                    complete(res) {
                        console.log(res);
                    }
                })
            },
			// 开始指纹认证
            startSoterAuthenticationFingerPrint() {
                uni.startSoterAuthentication({
                    requestAuthModes: ['fingerPrint'],
                    challenge: '123456',
                    authContent: '请用指纹解锁',
                    success(res) {
                        console.log(res);
                    },
                    fail(err) {
                        console.log(err);
                    },
                    complete(res) {
                        console.log(res);
                    }
                })
            },
			// 开始FaceID认证
            startSoterAuthenticationFaceID() {
                uni.startSoterAuthentication({
                    requestAuthModes: ['facial'],
                    challenge: '123456',
                    authContent: '请用FaceID解锁',
                    success(res) {
                        console.log(res);
                    },
                    fail(err) {
                        console.log(err);
                    },
                    complete(res) {
                        console.log(res);
                    }
                })
            }
        }
    }
</script>

<style>
    button {
        width: 200px;
        margin: 20px auto;
    }
</style>