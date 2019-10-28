// components/html/index.js
Component({
    styleIsolation: 'apply-shared',
    options: {
        // multipleSlots: true 
    },
    /**
     * 组件的属性列表
     */
    properties: {
        time:{
            type:[String,Number],
            value: 300,
            observer(newVal, oldVal) {
                // 属性值变化时执行
            }
        },
    },
    /**
     * 组件的初始数据
     */
    data: {
        canClick: true,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        __tap(e){
            let {time} = this.data;
            this.setData({
                canClick: false,
            })
            setTimeout(() => {
                this.setData({
                    canClick: true,
                })
            }, time)
        }
    }
})
