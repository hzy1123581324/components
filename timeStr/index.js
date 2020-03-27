// components/timeStr/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        format: {
            type: String,
            value: 'yyyy-MM-dd HH:mm:ss'
        },
        value: {
            type: [String, Number],
            value: '',
            observers(newval){
                const date = new Date(newval * 1000);
                this.__format(date);
            }

        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        timeStr: '',
    },
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
        ready() {
            const date = new Date(this.data.value ? this.data.value * 1000 : new Date().getTime());
            this.__format(date);
        },
    },
    // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
    attached: function () {
        // 在组件实例进入页面节点树时执行
    },
    detached: function () {
        // 在组件实例被从页面节点树移除时执行
    },
    ready(){
        const date = new Date(this.data.value ? this.data.value * 1000 : new Date().getTime());
        this.__format(date);
    },
    /**
     * 组件的方法列表
     */
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
            let timeStr = this.data.format;
            timeStr = timeStr
                .replace(/yyyy/, year)
                .replace(/MM/, zeroize(month))
                .replace(/dd/, zeroize(day))
                .replace(/HH/, zeroize(hour))
                .replace(/mm/, zeroize(minute))
                .replace(/ss/, zeroize(second));
            // switch (this.data.format) {
            //     case 'yyyy-MM-dd HH:mm:ss':
            //         timeStr = `${year}-${zeroize(month)}-${zeroize(day)} ${zeroize(hour)}:${zeroize(minute)}:${zeroize(second)}`;
            //         break;
            //     case 'yyyy/MM/dd HH:mm:ss':
            //         timeStr = `${year}/${zeroize(month)}/${zeroize(day)} ${zeroize(hour)}:${zeroize(minute)}:${zeroize(second)}`;
            //         break;
            //     case 'yyyy-MM-dd':
            //         timeStr = `${year}-${zeroize(month)}-${zeroize(day)}`;
            //         break;
            //     case 'yyyy/MM/dd':
            //         timeStr = `${year}/${zeroize(month)}/${zeroize(day)}`;
            //         break;
            //     case 'HH:mm:ss':
            //         timeStr = `${zeroize(hour)}:${zeroize(minute)}:${zeroize(second)}`;
            //         break;
            // }

            this.setData({
                timeStr
            })

        }
    }
})
