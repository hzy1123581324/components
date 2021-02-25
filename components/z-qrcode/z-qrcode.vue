<template>
    <view>
        <canvas :id="cid" :canvas-id="cid" :style="{width: `${size}px`, height: `${size}px`}" />
    </view>
</template>

<script>
    /**
     * qrcode 二维码组件
     * @description 用于字符串转二维码
     * @tutorial https://www.uviewui.com/components/popup.html
     * @property {String} cid canvasid 必传
     * @property {Boolean} text 要转换的字符串
     * @property {Boolean} size 二维码尺寸大小  默认590
     * @property {Boolean} margin 边距，二维码实际尺寸会根据所设边距值进行缩放调整（默认：0）
     * @property {Boolean} backgroundColor 背景色
     * @property {Boolean} foregroundColor 前景色（默认：'#000000'）
     * @property {Boolean} backgroundImage 二维码背景图
     * @property {Boolean} logo 二维码中间的logo  默认false
     * @property {Boolean} makeOnLoad 监听页面显示隐藏  默认false
     * @property {Boolean} saveImg 是否保存图片到相册  默认false
     * @event {Function} makeComplete 返回二维码图片
     * @example <z-qrcode
                    ref="qrcode"
                    class="qrcode-img"
                    cid="qrcode2218"
                    :text="addr"
                    :size="size"
                    :makeOnLoad="makeOnLoad"
                    @makeComplete="makeComplete"
                ></z-qrcode>
     */
    import uQRCode from './uqrcode.js'

    export default {
        props: {
            cid: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            size: {
                type: Number,
                default: uni.upx2px(590)
            },
            margin: {
                type: Number,
                default: 0
            },
            backgroundColor: {
                type: String,
                default: '#ffffff'
            },
            foregroundColor: {
                type: String,
                default: '#000000'
            },
            backgroundImage: {
                type: String
            },
            logo: {
                type: String
            },
            makeOnLoad: {
                type: Boolean,
                default: false
            },
            saveImg: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                temporaryPath: ''
            }
        },
        watch: {
            text() {
                this.make();
                
            },
            temporaryPath(){
                this.saveImg&&this.saveImageToPhotosAlbum();
            }
        },
        mounted() {
            if (this.makeOnLoad) {
                this.make()
            }
        },
        methods: {
            async make() {
                var options = {
                    canvasId: this.cid,
                    componentInstance: this,
                    text: this.text,
                    size: this.size,
                    margin: this.margin,
                    backgroundColor: this.backgroundImage ? '#fff' : this.backgroundColor,
                    foregroundColor: this.foregroundColor
                }
                var filePath = await this.makeSync(options)

                if (this.backgroundImage) {
                    filePath = await this.drawBackgroundImageSync(filePath)
                }

                if (this.logo) {
                    filePath = await this.drawLogoSync(filePath)
                }

                this.makeComplete(filePath)
            },
            makeComplete(filePath) {
                // 导出base64
                this.$emit('makeComplete', filePath)
                // 导出临时文件地址
                this.base64ToPath(data).then(res => {
                    // console.log(res,'99999999999++++++++++');
                    this.temporaryPath = res;
                    // this.$emit('exportfilePath', res)
                    // this.template = res;
                });
            },
            saveImageToPhotosAlbum(){
                uni.saveImageToPhotosAlbum({
                    filePath: this.temporaryPath,
                    success: function () {
                        // console.log('save success');
                        this.$emit("update:saveImg",false);
                        uni.showToast({
                            title:"保存成功"
                        })
                    }
                });
            },
            drawBackgroundImage(options) {
                var ctx = uni.createCanvasContext(this.cid, this)

                ctx.drawImage(this.backgroundImage, 0, 0, this.size, this.size)

                ctx.drawImage(options.filePath, 0, 0, this.size, this.size)

                ctx.draw(false, () => {
                    uni.canvasToTempFilePath({
                        canvasId: this.cid,
                        success: res => {
                            options.success && options.success(res.tempFilePath)
                        },
                        fail: error => {
                            options.fail && options.fail(error)
                        }
                    }, this)
                })
            },
            async drawBackgroundImageSync(filePath) {
                return new Promise((resolve, reject) => {
                    this.drawBackgroundImage({
                        filePath: filePath,
                        success: res => {
                            resolve(res)
                        },
                        fail: error => {
                            reject(error)
                        }
                    })
                })
            },
            fillRoundRect(ctx, r, x, y, w, h) {
                ctx.save()
                ctx.translate(x, y)
                ctx.beginPath()
                ctx.arc(w - r, h - r, r, 0, Math.PI / 2)
                ctx.lineTo(r, h)
                ctx.arc(r, h - r, r, Math.PI / 2, Math.PI)
                ctx.lineTo(0, r)
                ctx.arc(r, r, r, Math.PI, Math.PI * 3 / 2)
                ctx.lineTo(w - r, 0)
                ctx.arc(w - r, r, r, Math.PI * 3 / 2, Math.PI * 2)
                ctx.lineTo(w, h - r)
                ctx.closePath()
                ctx.setFillStyle('#ffffff')
                ctx.fill()
                ctx.restore()
            },
            drawLogo(options) {
                var ctx = uni.createCanvasContext(this.cid, this)

                ctx.drawImage(options.filePath, 0, 0, this.size, this.size)

                var logoSize = this.size / 4
                var logoX = this.size / 2 - logoSize / 2
                var logoY = logoX

                var borderSize = logoSize + 10
                var borderX = this.size / 2 - borderSize / 2
                var borderY = borderX
                var borderRadius = 5

                this.fillRoundRect(ctx, borderRadius, borderX, borderY, borderSize, borderSize)

                ctx.drawImage(this.logo, logoX, logoY, logoSize, logoSize)

                ctx.draw(false, () => {
                    uni.canvasToTempFilePath({
                        canvasId: this.cid,
                        success: res => {
                            options.success && options.success(res.tempFilePath)
                        },
                        fail: error => {
                            options.fail && options.fail(error)
                        }
                    }, this)
                })
            },
            async drawLogoSync(filePath) {
                return new Promise((resolve, reject) => {
                    this.drawLogo({
                        filePath: filePath,
                        success: res => {
                            resolve(res)
                        },
                        fail: error => {
                            reject(error)
                        }
                    })
                })
            },
            async makeSync(options) {
                return new Promise((resolve, reject) => {
                    uQRCode.make({
                        canvasId: options.canvasId,
                        componentInstance: options.componentInstance,
                        text: options.text,
                        size: options.size,
                        margin: options.margin,
                        backgroundColor: options.backgroundColor,
                        foregroundColor: options.foregroundColor,
                        success: res => {
                            resolve(res)
                        },
                        fail: error => {
                            reject(error)
                        }
                    })
                })
            },

            base64ToPath(base64) {
                return new Promise(function(resolve, reject) {
                    if (typeof window === 'object' && 'document' in window) {
                        base64 = base64.split(',');
                        var type = base64[0].match(/:(.*?);/)[1];
                        var str = atob(base64[1]);
                        var n = str.length;
                        var array = new Uint8Array(n);
                        while (n--) {
                            array[n] = str.charCodeAt(n);
                        }
                        return resolve(
                            (window.URL || window.webkitURL).createObjectURL(
                                new Blob([array], {
                                    type: type
                                })
                            )
                        );
                    }
                    var extName = base64.match(/data\:\S+\/(\S+);/);
                    if (extName) {
                        extName = extName[1];
                    } else {
                        reject(new Error('base64 error'));
                    }
                    var fileName = Date.now() + '.' + extName;
                    if (typeof plus === 'object') {
                        var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now());
                        bitmap.loadBase64Data(
                            base64,
                            function() {
                                var filePath = '_doc/uniapp_temp/' + fileName;
                                bitmap.save(
                                    filePath,
                                    {},
                                    function() {
                                        bitmap.clear();
                                        resolve(filePath);
                                    },
                                    function(error) {
                                        bitmap.clear();
                                        reject(error);
                                    }
                                );
                            },
                            function(error) {
                                bitmap.clear();
                                reject(error);
                            }
                        );
            
                        return;
                    }
                    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
                        var filePath = wx.env.USER_DATA_PATH + '/' + fileName;
                        wx.getFileSystemManager().writeFile({
                            filePath: filePath,
                            data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
                            encoding: 'base64',
                            success: function() {
                                resolve(filePath);
                            },
                            fail: function(error) {
                                reject(error);
                            }
                        });
                        return;
                    }
                    reject(new Error('not support'));
                });
            },
        
        
        
        }
    }
</script>
