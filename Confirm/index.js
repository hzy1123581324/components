// components/Confirm/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: {
            type: [Boolean],
            value: false,
            observer(newval){
                this.setData({
                    show: newval
                })
            }
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        __sure() {
      
            // this.$emit("update:show", false);
            // this.$emit("sure");
            this.setData({
                show: false,
            })
            this.triggerEvent('sure');
        },
        __cancel() {
    
            // this.$emit("update:show", false);
            // this.$emit("cancel");
            this.setData({
                show: false,
            })
            this.triggerEvent('cancel');
        }
    }
})
