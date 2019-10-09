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
           type: [String,Number],
            observer(newval,oldval){
                const date = new Date(newval*1000);
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

    /**
     * 组件的方法列表
     */
    methods: {
        __format(date){
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
            let timeStr;
            
            switch (this.data.format){
                case 'yyyy-MM-dd HH:mm:ss':
                timeStr = `${year}-${zeroize(month)}-${zeroize(day)} ${zeroize(hour)}:${zeroize(minute)}:${zeroize(second)}`;
                break;
                case 'yyyy-MM-dd':
                timeStr = `${year}-${zeroize(month)}-${zeroize(day)}`;
                break;
            }
            this.setData({
                timeStr
            })  
        }
    }
})
