<template>
    <view class="kline-box">
        <!-- #ifdef APP-PLUS || H5 -->
        <view class="charts-border">
            <view @click="echarts.onClick" @touchmove="echarts.onDatazoom" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts charts"></view>
           <!-- <view class="charts-label">
                <view class="charts-MA5">MA5:{{MA5 || 0}}</view>
                <view class="charts-MA10">MA10:{{MA10 || 0}}</view>
                <view class="charts-MA30">MA30:{{MA30 || 0}}</view>
            </view>
            <view class="charts-bar-label">
                <view class="charts-MA5">MA5:{{volMA5 || 0}}</view>
                <view class="charts-MA10">MA10:{{volMA10 || 0}}</view>
            </view> -->
        </view>
        <!-- <view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
        <button @click="changeOption">更新数据</button> -->
        <!-- #endif -->
        <!-- #ifndef APP-PLUS || H5 -->
        <view>非 APP、H5 环境不支持</view>
        <!-- #endif -->
    </view>
</template>

<script>
    let that;
    // import {
    //     rawData,
    //     // tokenInfo,
    //     // dealHis,
    //     // depthList,
    //     sum,
    //     // txData,
    //     volumes,
    //     data,
    //     dates
    // } from './script/mock.js';
    // console.log({
    //     rawData,
    //     tokenInfo,
    //     dealHis,
    //     depthList,
    //     sum,
    //     txData,
    //     volumes,
    //     data,
    //     dates
    // },'88888888888888888888888888888888888888888=====================');
    import {option} from './script/setting.js';
    console.log(option,'88888888888888888888');
    
    
    var labelFont = 'bold 12px Sans-serif';
    export default {
        props: {
            list: {
                type: Array,
                default: ()=>{
                    return []
                }
            }
        },
        data() {
            return {
                MA5: '',
                MA10: '',
                MA30: '',
                volMA5: '',
                volMA10: '',
                option: option||{},
                List: []
            }
        },
        watch:{
            // 'option.dataZoom.start':function(newval){
            //     console.log(newval,'88888========88888')
            // },
            list(newval){
              this.List = newval;  
            },
            List(newval){
                const xAxis = this.option.xAxis;
                let dates = this.getdates(newval);
                xAxis[0].data = dates;
                xAxis[1].data = dates;
                const series = this.option.series;
                let volumes = this.getvolumes(newval);
                series[0].data =this.getkdata(newval);
                series[1].data = this.calculateMA(5,newval);
                series[2].data = this.calculateMA(10,newval);
                series[3].data = this.calculateMA(30,newval);
                series[4].data = volumes;
                series[5].data = this.calculateMA(5,volumes);
                series[6].data = this.calculateMA(10,volumes);
            }
        },
        
        mounted() {
            that = this;
            // setTimeout(this.changeOption, 1500);
            // console.log('检查是否有打印')
            this.List = this.list;
        },
        methods: {
            getkdata(data){
              return data.map((item)=> {
                    return [+item[1], +item[2], +item[3], +item[4], +item[5]];
              });  
            },
            getdates(data){
                return data.map((item)=> {
                    return item[0];
                });
               },
            // 计算MA
            calculateMA(dayCount, data) {
            	var result = [];
            	for (var i = 0, len = data.length; i < len; i++) {
            		if (i < dayCount) {
            			result.push('-');
            			continue;
            		}
            		var sum = 0;
            		for (var j = 0; j < dayCount; j++) {
            			sum += data[i - j][1];
            		}
            		// console.log(sum, dayCount)
            		result.push((sum / dayCount).toFixed(2));
            	}
            	return result;
            },
            getvolumes(data){
                return data.map(function(item, index) {
                    return [index, item[5], item[1] > item[2] ? 1 : -1];
                });
  
            },
            // 截取数字字符串 保留precision小数
            formatterNum(value, precision) {
            	// console.log(value)
            	let reg = new RegExp('^\\d+(?:\\.\\d{0,' + precision + '})?')
            	return value.toString().match(reg)
            },
            onViewClick(options) {
                console.log(options)
            },
            lengendscroll(options){
               console.log(options,'101010101010101010101010101010101010101'); 
            }
        }
    }
</script>

<script module="echarts" lang="renderjs">
    let myChart
    export default {
        mounted() {
            if (typeof window.echarts === 'function') {
                this.initEcharts()
            } else {
                // 动态引入较大类库避免影响页面展示
                const script = document.createElement('script')
                // view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
                script.src = './static/echarts.min.js'
                script.onload = this.initEcharts.bind(this)
                document.head.appendChild(script)
            }
        },
        methods: {
            initEcharts() {
                console.log('6666666666666666666666666666666666666666');
                myChart = echarts.init(document.getElementById('echarts'))
                // 观测更新的数据在 view 层可以直接访问到
                // console.log(this.option,'777777777777777777878787');            
                myChart.setOption(this.option)
            },
            updateEcharts(newValue, oldValue, ownerInstance, instance) {
                // 监听 service 层数据变更
                console.log('7777', newValue);
                myChart.setOption(newValue)
            },
            onClick(event, ownerInstance) {
                // 调用 service 层的方法
                console.log(event,'999999999999999999')
                ownerInstance.callMethod('onViewClick', {
                    test: 'test',
                    // event:event,
                })
            },
            onDatazoom(event,ownerInstance){
                console.log('7777777777777777777777777777777777----------',JSON.stringify(event))
                ownerInstance.callMethod('lengendscroll',JSON.stringify(event));
            }
        }
    }
</script>

<style scoped>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .echarts {
        /* margin-top: 100px; */
        width: 100%;
        height: 300px;
        background-color: #101010;
    }

    .charts-border {
        position: relative;
    }

    .charts {
        width: 100vw;
        height: 420px;
    }

    .charts-label {
        position: absolute;
        left: 10px;
        top: 5px;
        font-size: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .charts-label view {
        margin-right: 14px;
    }

    .charts-MA5 {
        color: #eef4ba;
    }

    .charts-MA10 {
        color: #83c1c5;
    }

    .charts-MA30 {
        color: #b39cd8;
    }

    .charts-bar-label {
        position: absolute;
        left: 10px;
        top: 76%;
        font-size: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .charts-bar-label view {
        margin-right: 14px;
    }

    .charts-tooltip-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 5px 0;
    }

    .ctr-label {
        color: #51617b;
    }

    .ctr-value {
        color: #acbadf;
        margin-left: 30px;
    }

    .price-green {
        color: #38ad70;
    }

    .price-red {
        color: #fe5c57;
    }
</style>
