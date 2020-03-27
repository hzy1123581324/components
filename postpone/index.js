// components/postpone/index.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        title: {
            type: String,
            value: "确定"
        },
        once: {
            type: [String, Number],
            value: -1 //无限
        },
        delay: {
            type: [String, Number],
            value: 0 //毫秒级别
        },
        tapfunc: {
            type: Function,
            required: true
            // default:(resolve, reject)=>{
            // 这个是实例
            // 	console.log(111)
            // 	setTimeout(()=>{
            // 		resolve();
            // 	},10000)
            // }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        canclicks: 0, //可点击次数
        status: false, //按钮状态,
        delay_tiem: 0 //按钮延迟时间
    },
    ready() {
        // const date = new Date(this.data.value ? this.data.value * 1000 : new Date().getTime());
        // this.__format(date);
        // this.canclicks = this.once;
        // this.status = parseInt(this.once) != 0;

        this.setData({
            canclicks: this.data.once,
            status: parseInt(this.data.once) != 0,
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        __change() {
            let {
                canclicks,
                status,
                delay_tiem,
                delay
            } = this.data;
            const now = new Date().getTime();
            if (status && parseInt(canclicks) != 0) {
                this.setData({
                    status: false,
                    delay_tiem: parseInt(now) + parseInt(delay)
                })
                // console.log("^^^^^^^^^^^^^");
                // const res = this.data.tapfunc();
                this.triggerEvent('tapfunc', () => {
                    this.setData({
                        status: true,
                    })

                });


            }
        }
    }
})