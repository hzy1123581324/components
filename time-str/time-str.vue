<template>
    <text>{{timeStr}}</text>
</template>

<script>
    /**
     * time-str 异步按钮
     * @description 接口返回才可以再次点击，接口请求中保持点击状态
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {String} format 输出格式
     * @property {String,Number} value精确到秒的时间戳，不传默认是当前时间 
     * @example  <time-str :value=""></time-str>
     * @example  <time-str :value="1111111111" :format="'HH:mm:ss'" ></time-str>
     */
    export default {
        name: 'time-str',
        props: {
            // 输出格式
            format: {
                type: String,
                default: 'yyyy-MM-dd HH:mm:ss'
            },
            // 要转换的时间戳
            value: {
                type: [String, Number],
                default: '',
            }
        },
        data() {
            return {
                timeStr: '',
            }
        },
        beforeMount(){
            const date = new Date(this.value?this.value * 1000:new Date().getTime());
            this.__format(date);
        },
        methods: {
            __format(date) {
                const year = date.getFullYear();
                const month = date.getMonth() * 1 + 1;
                const day = date.getDate();
                const hour = date.getHours();
                const minute = date.getMinutes();
                const second = date.getSeconds();
                let zeroize = (val) => {
                    if (val < 10) {
                        return '0' + val;
                    } else {
                        return val;
                    }
                }
                let timeStr = this.format;
                timeStr = timeStr
                .replace(/yyyy/, year)
                .replace(/MM/, zeroize(month))
                .replace(/dd/, zeroize(day))
                .replace(/HH/, zeroize(hour))
                .replace(/mm/, zeroize(minute))
                .replace(/ss/, zeroize(second));
                this.timeStr = timeStr
                
            }
        },
        watch: {
            value(newval, oldval) {
                const date = new Date(newval * 1000);
                this.__format(date);
            }
        },
        computed: {

        }
    }
</script>
<style scoped lang="stylus">
</style>

