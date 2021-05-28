<template>
    <view class="waterfall-box flex" :style="`--waterfall-column:${ column}`">
        <view class="items-box" v-for="(items,index) in columnList" :key="index">
            <view class="item-box" v-for="(item,index2) in items" :key="item.id" @click="point(item,index2,index)">
                <slot :item="item" :index="index2*column+index" :row="index2" :col="index" :column="column"></slot>
            </view>
        </view>
    </view>
</template>

<script>
    /**
     * waterfall 瀑布流组件
     * @description 瀑布流组件
     * @tutorial https://www.uviewui.com/components/button.html
     * @property {String,Number} column 列数
     * @property {Array} list 要展示数据
     * @example
     * <waterfall :list='list' :column="column">
     *   <template v-slot="{item,index,row,col,column}">
     *       ...
     *   </template>
     * </waterfall>
     */
    export default {
        name: "waterfall",
        props: { 
            column: {
                type: [String, Number],
                default: 2,
            },
            list: {
                type: Array,
                default: () => {
                    return [];
                },
            },
        },
        
        components: {},
        computed: {
            columnList() {
                let _list = [];
                let column = this.column;
                
                let list = this.list || [];
                for (let i = 0; i < list.length; i++) {
                    _list[i % column] || (_list[i % column] = []);
                    _list[i % column].push(list[i]);
                }

                return _list;
            },
        },
        data() {
            return {};
        },

        mounted() {},
        watch: {},
        destroyed() {},
        methods: {
            //点击事件
            point(item,rowindex,colindex){
                this.$emit('point',{item,rowindex,colindex});
            }
        },
    };
</script>

<style scoped>
    .waterfall-box {
        /* width: 100%; */
        --fall-pad: 30rpx;
        overflow-x: hidden;
        width: 100%;
        padding: var(--waterfall-pad,var(--fall-pad)) ;
        display: flex;
        justify-content: space-between;
    }

    .items-box {
        --space : var(--waterfall-space,var(--waterfall-pad,var(--fall-pad)));
        width: calc( (100% - var(--space) * ( var(--waterfall-column) - 1) ) / var(--waterfall-column));
    }
    .items-box+.items-box{
        margin-left: var(--space) 0;
    }
    .item-box {
        margin-bottom: var(--space);
        display: flex;
        flex-direction: column;
    }
</style>
