<template>
    <view class="">
        
    </view>
</template>

<script>
    export default {
        
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
                script.src = './static/echarts.js'
                script.onload = this.initEcharts.bind(this)
                document.head.appendChild(script)
            }
        },
        methods: {
            initEcharts() {
                myChart = echarts.init(document.getElementById('echarts'))
                // 观测更新的数据在 view 层可以直接访问到
                myChart.setOption(this.option)
            },
            updateEcharts(newValue, oldValue, ownerInstance, instance) {
                // 监听 service 层数据变更
                console.log('7777', newValue);
                myChart.setOption(newValue)
            },
            onClick(event, ownerInstance) {
                // 调用 service 层的方法
                ownerInstance.callMethod('onViewClick', {
                    test: 'test'
                })
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
        margin-top: 100px;
        width: 100%;
        height: 300px;
    }
</style>
