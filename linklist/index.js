// components/linklist/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    linkHeight: {
      type: [String,Number],
      value: 88,
    },
    fontSize: {
      //字体大小
      type: [String, Number],
      value: 28,
    },
    iconSize: {
      //箭头图标的大小 大于10
      type: [String, Number],
      value: 22,
    },
    iconColor: {
      type: [String],
      value: '#666',
    },
    list: {
      type: Array,
      value: [],
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

  }
})
