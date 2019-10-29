// components/html/index.js
const wxParse = require('./wxParse/wxParse.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data:{
            type: String,
            observer(newVal, oldVal) {
                // 属性值变化时执行
                wxParse.wxParse('article', 'html', newVal, this, 5);
            }
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

    }
})
