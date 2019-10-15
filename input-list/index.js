// components/input-list/index.js
Component({
    styleIsolation: 'apply-shared',
    // externalClasses: ['input-class'],
    /**
   * 启用插槽
   */
    options: {
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        sort: {
            type: Array,
            value: [
                // {
                //   type: 'text',
                //   
                // }
            ]
        },
        param: {
            type: Object,
            // observer(newval, oldval) {
            //     // console.log(newval,oldval,')))))))))))))))))))))))))')
            //     // this.setData({param:newval});
            // }
        }
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
        __checkEmpty() {

        },
        __write__(e){
            const { id } = e.currentTarget;
            const { value } = e.detail;
            this.data.param[id] = value;
            console.log(e,'&&&&&&&&&&&&&&&&&&&&&')
            // this.data.param = 
            this.triggerEvent('write', this.data.param);
        }
    }
})