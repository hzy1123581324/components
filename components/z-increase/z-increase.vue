<template>
    <view class="counter-box">
        <view :class="['del', Num - min <= 0 && 'undel']" @click="delFun"></view>
        <view class="intobox">
            <!-- <input type="text" v-model="Num" @blur.prevent="intoBlur($event)" /> -->
            <!-- <view :class="[!Num&&'place']" @click="test()">{{Num||holderTxt}}</view> -->
            <input ref="into" type="number"  :value="Num" @blur.prevent="intoBlur($event)" :placeholder="HolderTxt" placeholder-class="place"/>
        </view>
        <view :class="['add', max != 0 && Num - max >= 0 && 'unadd']" @click="addFun"></view>
    </view>
</template>

<script>
    /**
     * increase 自增自减计数器
     * @description 商品自增自减
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {String,Number} min 最小值
     * @property {String,Number} max 最大值
     * @property {String,Number} number 初始化的值
     * @property {String,Number} step 递增步长
     * @property {String }  holderTxt  占位符
     * @example <increase :number.sync="number"></increase>
     * @example <increase class="couter" :number.sync="number"></increase>
     * <style>
     *  .couter{
        --increase-height: 组件的高度 默认38upx
        --increase-bor-width: 组件边框宽度 默认 1px
        --increase-bor-color ： 组件边框颜色 默认 #333
        --increase-rate  递增递减按钮尺寸跟加减号的比例 默认 0.35
        --increase-icon-color 加减号颜色
        --increase-icon-disable-color 禁用加减号颜色
        --increase-icon-thick 加减号厚度
        --increase-input-font  输入框字体大小  默认 28upx
        --increase-input-color  输入框字体颜色 默认 #333；
     * }
     * </style>
    */
    import operation from '../../utils/operation.js';
    export default {
        name: 'increase',
        props: {
            min: {
                type: [String, Number],
                default: 1 //等于-1没有最小值
            },
            max: {
                type: [String, Number],
                default: 0 //等于零就是没有最大值
            },
            number: {
                type: [String, Number],
                default: '',
            },
            step: {
                type: [String, Number],
                default: 1
            },
            holderTxt: {
                type: String,
            },
            init: {
                type: Boolean,
                default: true
            },
            disable: {
                type: Boolean,
                default: false
            }
        },
        components: {},
        computed: {},
        mixins: [operation],
        data() {
            return {
                Num: '',
                HolderTxt: '',
                // autoFocus: false,
            };
        },
        mounted() {
            if(this.init){
                this.Num = this.number || this.min;
            }
            this.HolderTxt = this.holderTxt
        },
        watch: {
            number(newval){
                this.Num = newval;
            },
            holderTxt(newval){
                // 当提示语发生改变时，数量设为空
                if(newval){
                  this.HolderTxt = newval;
                  this.Num = ''
                }
            },
            Num(newval, oldval) {
                this.$emit('update:number', newval);
                this.$emit('change', newval, oldval);
                this.$emit('getNumber', this.Num);
            }
        },
        destroyed() {},
        methods: {
            test(){
                // this.$nextTick(()=>{
                //     this.$refs.into._onFocus()
                // })
                this.$nextTick(() =>{
                // console.log(this.$refs.into)
                    const into = this.$refs.into;
                    setTimeout(into.focus,500)
                    // this.$refs.into._focus();
                })
            },
            // 输入框失去焦点
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
            // 点击加号
            addFun(){
                if(this.disable){
                    return 
                }
                !this.Num&&(this.Num = 0)
                
                if(this.Num - (this.max || 0) < 0 || this.max == 0){
                    this.Num = this.Add(this.Num,this.step);
                }
            },
            // 点击减号
            delFun(){
                if(this.disable){
                    return 
                }
                !this.Num&&(this.Num = 0)
                // (Num - min > 0 && (Num = Sub(Num, step)))
                if(this.Num - this.min>0||this.min==-1){
                    this.Num = this.Sub(this.Num,this.step);
                }
            }
        }
    };
</script>

<style scoped>
    .counter-box {
        --height: 88upx;
        --icon-size: calc(var(--increase-height, var(--height)) - var(--increase-bor-width, 1px) * 2);
        /* 递增递减按钮尺寸 */
        border: var(--increase-bor-width, 1px) solid var(--increase-bor-color, #333);
        height: var(--increase-height, var(--height));
        max-width: 100%;
        border-radius: var(--radius, 4px);
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
        --icon-height: var(--increase-icon-thick, 2upx);
        --icon-width: calc(var(--icon-size) * var(--increase-rate, 0.35));
        width: var(--icon-width);
        height: var(--icon-height);
        background-color: var(--increase-icon-color, #333);
        position: absolute;
        left: calc((var(--icon-size) - var(--icon-width)) / 2);
        top: calc((var(--icon-size) - var(--icon-height)) / 2);
    }

    .add::after {
        transform-origin: center center;
        transform: rotate(90deg);
    }

    .undel,
    .unadd {
        --increase-icon-color: var(--increase-icon-disable-color, #888);
        pointer-events: none;
        cursor: not-allowed;
    }

    .intobox {
        --input-color: #333;
        --input-font: 28upx;
        border: var(--increase-bor-width, 1px) solid var(--increase-bor-color, var(--input-color));
        border-top: 0;
        border-bottom: 0;
        height: 100%;
        flex-grow: 1;
        width: 30%;
        flex-shrink: 2;
        font-size: var(--increase-input-font, var(--input-font));
        /*默认28upx*/
        color: var(--increase-input-color, var(--input-color));
        /*默认#333*/
        box-sizing: border-box;
        position: relative;
    }
    .intobox view.place{
        font-size: var(--placeholder-font-size,inherit);
        color: var(--placeholder-color,inherit);
    }
    .intobox view{
        padding: 0 0.5em;
        font-size: inherit;
        inline-size: inherit;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
    }
    .intobox input {
        padding: 0 0.5em;
        height: 100%;
        max-width: 100%;
        text-align: center;
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        font-weight: var(--increase-input-weight,400);
     /*   opacity: 0;
        pointer-events: none; */
        /* font-size: inherit; */
        /* color: inherit; */
        z-index: 10;
    }
    /* .intobox input:focus{
        opacity: 1;
        pointer-events: auto;
        color: red;
    } */
</style>
