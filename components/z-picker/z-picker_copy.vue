<template>
  <view class="picker-inset" @click="show = !show">
    <slot :isopen="show"></slot>
  </view>
  <z-popup v-model="show" type="bottom" @close="closeHandler">
    <view class="u-picker">
      <view class="">
        <!-- 这这个是标题 -->
        <slot name='pickerTitle'>
          <view class="">
            <view>{{'取消'}}</view>
            <view>{{'标题'}}</view>
            <view>{{'确定'}}</view>
          </view>
        </slot>
      </view>
      <picker-view class="u-picker-view" :indicatorStyle="`height: ${addUnit(itemHeight)}`" :value="innerIndex"
        :immediateChange="immediateChange" :style="{
					height: `${addUnit(visibleItemCount * itemHeight)}`
				}" @change="changeHandler">
        <picker-view-column v-for="(item, index) in innerColumns" :key="index" class="u-picker-view-column">
          <text v-if="testArray(item)" class="u-picker-view-column-item u-line-1" v-for="(item1, index1) in item"
            :key="index1" :style="{
							height: addUnit(itemHeight),
							lineHeight: addUnit(itemHeight),
							fontWeight: index1 === innerIndex[index] ? 'bold' : 'normal'
						}">{{ getItemText(item1) }}</text>
        </picker-view-column>
      </picker-view>
    </view>
  </z-popup>
</template>

<script setup>
  /**
   * u-picker
   * @description 选择器
   * @property {Boolean}			show				是否显示picker弹窗（默认 false ）
   * @property {Boolean}			showToolbar			是否显示顶部的操作栏（默认 true ）
   * @property {String}			title				顶部标题
   * @property {Array}			columns				对象数组，设置每一列的数据
   * @property {Boolean}			loading				是否显示加载中状态（默认 false ）
   * @property {String | Number}	itemHeight			各列中，单个选项的高度（默认 44 ）
   * @property {String}			cancelText			取消按钮的文字（默认 '取消' ）
   * @property {String}			confirmText			确认按钮的文字（默认 '确定' ）
   * @property {String}			cancelColor			取消按钮的颜色（默认 '#909193' ）
   * @property {String}			confirmColor		确认按钮的颜色（默认 '#3c9cff' ）
   * @property {Array}			singleIndex			选择器只有一列时，默认选中项的索引，从0开始（默认 0 ）
   * @property {String | Number}	visibleItemCount	每列中可见选项的数量（默认 5 ）
   * @property {String}			keyName				选项对象中，需要展示的属性键名（默认 'text' ）
   * @property {Boolean}			closeOnClickOverlay	是否允许点击遮罩关闭选择器（默认 false ）
   * @property {Array}			defaultIndex		各列的默认索引
   * @property {Boolean}			immediateChange		是否在手指松开时立即触发change事件（默认 false ）
   * @event {Function} close		关闭选择器时触发
   * @event {Function} cancel		点击取消按钮触发
   * @event {Function} change		当选择值变化时触发
   * @event {Function} confirm	点击确定按钮，返回当前选择的值
   */
  import {
    ref,
    reactive,
    watch
  } from "vue";
  import {
    addUnit
  } from "../../utils/index.js";
  import {
    defer
  } from "../../utils/optimize.js";
  import {
    object as teseObject,
    array as testArray
  } from "../../utils/test.js";
  // import {deepClone,sleep} from '../../utils/index.js'
  const emit = defineEmits(['confirm', 'close', 'cancel', "change"]);
  const props = defineProps({

    showbefore: {
      type: Function,
      default: defer
    },

    // 对象数组，设置每一列的数据
    columns: {
      type: Array,
      default: []
    },
    // 各列中，单个选项的高度
    itemHeight: {
      type: [String, Number],
      default: '98'
    },

    // 选择器只有一列时，默认选中项的索引，从0开始
    singleIndex: {
      type: [String, Number],
      default: 0
    },
    // 每列中可见选项的数量
    visibleItemCount: {
      type: [String, Number],
      default: 3
    },
    // 选项对象中，需要展示的属性键名
    keyName: {
      type: String,
      default: "name"
    },
    // 是否允许点击遮罩关闭选择器
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    // 各列的默认索引
    defaultIndex: {
      type: Array,
      default: [0, 0, 0]
    },
    // 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
    immediateChange: {
      type: Boolean,
      default: true
    }
  });
  // 上一次选择的列索引
  let lastIndex = reactive([]);
  // 索引值 ，对应picker-view的value
  let innerIndex = reactive([]);
  // 各列的值
  let innerColumns = reactive([]);
  // 上一次的变化列索引
  let columnIndex = ref(0);

  let show = ref(false);




  // 获取item需要显示的文字，判别为对象还是文本
  function getItemText(item) {
    if (teseObject(item)) {
      return item[props.keyName]
    } else {
      return item
    }
  }
  // 关闭选择器
  function closeHandler() {
    if (props.closeOnClickOverlay) {
      emit('close')
    }
  }
  // 点击工具栏的取消按钮
  function cancel() {
    emit('cancel');
  }
  // 点击工具栏的确定按钮
  function confirm() {
    emit('confirm', {
      indexs: innerIndex,
      value: innerColumns.map((item, index) => item[innerIndex[index]]),
      values: innerColumns
    })
  }
  // 选择器某一列的数据发生变化时触发
  function changeHandler(e) {
    const {
      value
    } = e.detail
    let index = 0,
      columnIndex = 0
    // 通过对比前后两次的列索引，得出当前变化的是哪一列
    for (let i = 0; i < value.length; i++) {
      let item = value[i]
      if (item !== (lastIndex[i] || 0)) { // 把undefined转为合法假值0
        // 设置columnIndex为当前变化列的索引
        columnIndex = i
        // index则为变化列中的变化项的索引
        index = item
        break // 终止循环，即使少一次循环，也是性能的提升
      }
    }
    columnIndex.value = columnIndex
    const values = innerColumns
    // 将当前的各项变化索引，设置为"上一次"的索引变化值
    setLastIndex(value)
    setIndexs(value)

    emit('change', {
      // #ifndef MP-WEIXIN
      // 微信小程序不能传递this，会因为循环引用而报错
      picker: this,
      // #endif
      value: innerColumns.map((item, index) => item[value[index]]),
      index,
      indexs: value,
      // values为当前变化列的数组内容
      values,
      columnIndex
    })
  }
  // 设置index索引，此方法可被外部调用设置
  function setIndexs(index, setLastIndex) {
    innerIndex = reactive(deepClone(index));
    if (setLastIndex) {
      setLastIndex(index)
    }
  }
  // 记录上一次的各列索引位置
  function setLastIndex(index) {
    // 当能进入此方法，意味着当前设置的各列默认索引，即为“上一次”的选中值，需要记录，是因为changeHandler中
    // 需要拿前后的变化值进行对比，得出当前发生改变的是哪一列
    lastIndex = reactive(deepClone(index))
  }
  // 设置对应列选项的所有值
  function setColumnValues(_columnIndex, values) {
    // 替换innerColumns数组中_columnIndex索引的值为values，使用的是数组的splice方法
    innerColumns.splice(_columnIndex, 1, values)
    // 拷贝一份原有的innerIndex做临时变量，将大于当前变化列的所有的列的默认索引设置为0
    let tmpIndex = deepClone(innerIndex)
    for (let i = 0; i < innerColumns.length; i++) {
      if (i > columnIndex) {
        tmpIndex[i] = 0
      }
    }
    // 一次性赋值，不能单个修改，否则无效
    setIndexs(tmpIndex)
  }
  // 获取对应列的所有选项
  function getColumnValues(columnIndex) {
    // 进行同步阻塞，因为外部得到change事件之后，可能需要执行setColumnValues更新列的值
    // 索引如果在外部change的回调中调用getColumnValues的话，可能无法得到变更后的列值，这里进行一定延时，保证值的准确性
    (async () => {
      await sleep()
    })()
    return innerColumns[columnIndex]
  }
  // 设置整体各列的columns的值
  function setColumns(columns) {
    innerColumns = reactive(deepClone(columns));
    // 如果在设置各列数据时，没有被设置默认的各列索引defaultIndex，那么用0去填充它，数组长度为列的数量
    if (innerIndex.length === 0) {
      innerIndex = reactive(new Array(columns.length).fill(0))
    }
  }
  // 获取各列选中值对应的索引
  function getIndexs() {
    return innerIndex
  }
  // 获取各列选中的值
  function getValues() {
    // 进行同步阻塞，因为外部得到change事件之后，可能需要执行setColumnValues更新列的值
    // 索引如果在外部change的回调中调用getValues的话，可能无法得到变更后的列值，这里进行一定延时，保证值的准确性
    (async () => {
      await sleep()
    })()
    return innerColumns.map((item, index) => item[innerIndex[index]])
  }
  // 监听默认索引的变化，重新设置对应的值
  watch(() => [...props.defaultIndex], (newval, oldval) => {
    setIndexs(newval, true)
  })
  // 监听columns参数的变化
  watch(() => [...props.columns], (newval, oldval) => {
    setColumns(newval)
  })
</script>

<style lang="scss" scoped>
  @import "../../libs/css/components.scss";

  .u-picker {
    position: relative;

    &-view {

      &-column {
        @include flex;
        flex: 1;
        justify-content: center;

        &-item {
          @include flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          text-align: center;
          /* #ifndef APP-NVUE */
          display: block;
          /* #endif */
          color: var(--color-main);

          &--disabled {
            /* #ifndef APP-NVUE */
            cursor: not-allowed;
            /* #endif */
            opacity: 0.35;
          }
        }
      }
    }

    &--loading {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      @include flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.87);
      z-index: 1000;
    }
  }

  .picker-inset {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
  }
</style>
