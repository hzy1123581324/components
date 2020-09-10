<template>
    <view class="counter-box">
        <view :class="['del', Num - min <= 0 && 'undel']" @click="(Num - min > 0 && (Num = Sub(Num, step)))"></view>
        <view class="intobox">
            <!-- <input type="text" v-model="Num" @blur.prevent="intoBlur($event)" /> -->
            <input type="text" :value="Num" @blur.prevent="intoBlur($event)" />
        </view>
        <view :class="['add', max != 0 && Num - max >= 0 && 'unadd']" @click="(Num - (max || 0) < 0 || max == 0) && (Num = Add(Num, step))"></view>
    </view>
</template>

<script>
    /**
 * counter 自增自减计数器
 * @description 商品自增自减
 * @tutorial https://www.uviewui.com/components/button.html
 * @property {String,Number} min 最小值
 * @property {String,Number} max 最大值
 * @property {String,Number} num 初始化的值
 * @example <counter :num.sync="num"></counter>
 * @example <counter class="couter" :num.sync="num"></counter>
 * <style>
 *  .couter{
  --size: 0.42rem;
  --border-w: 0.01rem;
  --width: 1.8rem;
  --icon-size: calc(var(--size) - var(--border-w) * 2);
  --icon-height: calc(var(--border-w) * 2);
  --icon-width: calc(var(--icon-size) * 0.35);
 * }
 * </style>
 */

    export default {
        name: 'counter',
        props: {
            min: {
                type: [String, Number],
                default: 1
            },
            max: {
                type: [String, Number],
                default: 0
            },
            num: {
                type: [String, Number]
            },
            step: {
                type: [String, Number],
                default: 1
            }
        },
        components: {},
        computed: {},
        data() {
            return {
                Num: 0
            };
        },
        mounted() {
            this.Num = this.num || this.min;
        },
        watch: {
            Num(newval, oldval) {
                this.$emit('update:num', newval);
                this.$emit('change', newval, oldval);
                this.$emit('getNumber', this.Num);
            }
        },
        destroyed() {},
        methods: {

            intoBlur(e) {
                console.log(e.target.value);
                let val = e.target.value;
                let {
                    min,
                    max
                } = this;
                if (!val) {
                    val = min;
                }
                if (val - max > 0) {
                    val = max;
                }
                this.Num = val;
                // console.log(this.Num, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
            },
            //加法函数，用来得到精确的加法结果
            //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
            //调用：$h.Add(arg1,arg2)
            //返回值：arg1加上arg2的精确结果
            Add(arg1, arg2) {
                arg2 = parseFloat(arg2);
                var r1, r2, m;
                try {
                    r1 = arg1.toString().split('.')[1].length;
                } catch (e) {
                    r1 = 0;
                }
                try {
                    r2 = arg2.toString().split('.')[1].length;
                } catch (e) {
                    r2 = 0;
                }
                m = Math.pow(100, Math.max(r1, r2));
                return (this.Mul(arg1, m) + this.Mul(arg2, m)) / m;
            },
            //减法函数，用来得到精确的减法结果
            //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
            //调用：$h.Sub(arg1,arg2)
            //返回值：arg1减去arg2的精确结果
            Sub(arg1, arg2) {
                arg1 = parseFloat(arg1);
                arg2 = parseFloat(arg2);
                var r1, r2, m, n;
                try {
                    r1 = arg1.toString().split('.')[1].length;
                } catch (e) {
                    r1 = 0;
                }
                try {
                    r2 = arg2.toString().split('.')[1].length;
                } catch (e) {
                    r2 = 0;
                }
                m = Math.pow(10, Math.max(r1, r2)); //动态控制精度长度
                n = r1 >= r2 ? r1 : r2;
                return ((this.Mul(arg1, m) - this.Mul(arg2, m)) / m).toFixed(n);
            },
            /*乘法函数，用来得到精确的乘法结果
             **说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
             **调用：$h.Mul(arg1,arg2)
             **返回值：arg1乘以arg2的精确结果
             */
            Mul(arg1, arg2) {
                arg1 = parseFloat(arg1);
                arg2 = parseFloat(arg2);
                var m = 0,
                    s1 = arg1.toString(),
                    s2 = arg2.toString();
                try {
                    m += s1.split('.')[1].length;
                } catch (e) {
                    // console.log(e);
                }
                try {
                    m += s2.split('.')[1].length;
                } catch (e) {
                    // console.log(e);
                }
                return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
            },
            /*
             *除法函数，用来得到精确的除法结果
             *说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
             *调用：$h.Div(arg1,arg2)
             *返回值：arg1除以arg2的精确结果
             */
            Div(arg1, arg2) {
                arg1 = parseFloat(arg1);
                arg2 = parseFloat(arg2);
                var t1 = 0,
                    t2 = 0,
                    r1,
                    r2;
                try {
                    t1 = arg1.toString().split('.')[1].length;
                } catch (e) {
                    // console.log(e);
                }
                try {
                    t2 = arg2.toString().split('.')[1].length;
                } catch (e) {
                    // console.log(e);
                }
                r1 = Number(arg1.toString().replace('.', ''));
                r2 = Number(arg2.toString().replace('.', ''));
                return (r1 / r2) * Math.pow(10, t2 - t1);
            }
        }
    };
</script>

<style scoped>
    .counter-box {
        --size: 0.38rem;
        --border-w: 0.01rem;
        --width: 1.8rem;
        --icon-size: calc(var(--size) - var(--border-w) * 2);
        --icon-height: calc(var(--border-w) * 2);
        --icon-width: calc(var(--icon-size) * 0.35);
        --input-color: #4f4f4f;
        --input-font: 0.16rem;
        border: var(--border-w) solid var(--border-color);
        height: var(--size);
        max-width: 100%;
        width: var(--width);
        border-radius: var(--radius);
        display: flex;
    }

    .add,
    .del {
        width: var(--icon-size);
        height: var(--icon-size);
        position: relative;
        cursor: pointer;
        flex-shrink: 0;
    }

    .add::before,
    .add::after,
    .del::before {
        content: '';
        width: var(--icon-width);
        height: var(--icon-height);
        background-color: var(--color-main);
        position: absolute;
        left: calc((var(--icon-size) - var(--icon-width)) / 2);
        top: calc((var(--icon-size) - var(--icon-height)) / 2);
    }

    .add::after {
        transform: rotate(90deg);
    }

    .undel,
    .unadd {
        --color-main: var(--color-grey);
        /* pointer-events: none; */
        cursor: not-allowed;
    }

    .intobox {
        border: var(--border-w) solid var(--border-color);
        border-top: 0;
        border-bottom: 0;
        height: 100%;
        flex-grow: 1;
        width: 30%;
        flex-shrink: 2;
        font-size: var(--input-color);
        color: var(--input-color);
        box-sizing: border-box;
    }

    .intobox input {
        padding: 0 0.5em;
        height: 100%;
        max-width: 100%;
        text-align: center;
        box-sizing: border-box;
    }
</style>
