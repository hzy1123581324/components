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
     * @tutorial https://www.zviewui.com/components/biometrics.html
     * @example <z-biometrics></z-biometrics>
     */
    export default {
        name: 'biometrics',
        setup(){
          // 检查支持的认证方式
          function checkIsSupportSoterAuthentication() {
              uni.checkIsSupportSoterAuthentication({
                  success(res) {
                      // console.log(res);
                  },
                  fail(err) {
                      // console.log(err);
                  },
                  complete(res) {
                      // console.log(res);
                  }
              })
          }
          // 检查是否录入指纹
         function checkIsSoterEnrolledInDeviceFingerPrint() {
              uni.checkIsSoterEnrolledInDevice({
                  checkAuthMode: 'fingerPrint',
                  success(res) {
                      // console.log(res);
                  },
                  fail(err) {
                      // console.log(err);
                  },
                  complete(res) {
                      // console.log(res);
                  }
              })
          }
          // 检查是否录入FaceID
          function checkIsSoterEnrolledInDeviceFaceID() {
              uni.checkIsSoterEnrolledInDevice({
                  checkAuthMode: 'facial',
                  success(res) {
                      // console.log(res);
                  },
                  fail(err) {
                      // console.log(err);
                  },
                  complete(res) {
                      // console.log(res);
                  }
              })
          }
          // 开始指纹认证
         function startSoterAuthenticationFingerPrint() {
              uni.startSoterAuthentication({
                  requestAuthModes: ['fingerPrint'],
                  challenge: '123456',
                  authContent: '请用指纹解锁',
                  success(res) {
                      // console.log(res);
                  },
                  fail(err) {
                      // console.log(err);
                  },
                  complete(res) {
                      // console.log(res);
                  }
              })
          }
          // 开始FaceID认证
        function  startSoterAuthenticationFaceID() {
              uni.startSoterAuthentication({
                  requestAuthModes: ['facial'],
                  challenge: '123456',
                  authContent: '请用FaceID解锁',
                  success(res) {
                      // console.log(res);
                  },
                  fail(err) {
                      // console.log(err);
                  },
                  complete(res) {
                      // console.log(res);
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
