// 验证码控件


Vue.component('code',{
  template: `
    <div class="item flex bor_top bor_f6" v-for="(item,key) in sort" >
      <label class="label lh80" :for="item.value">{{item.label}}</label>
      <input :id="item.value" class="flex_grow" :readonly="item.readonly" :type="item.type||'text'" v-model="data[item.value]" 
      :placeholder="item.placeholder||''" />
    </div>
  `,
  props:{
    data: {
      type: Object,
    },
    sort:{
      type: Array,
      default: [
        // {
        //   type: 'text',
        //   label: '营业时间',
        //   value: 'yy_time',
        //   readonly: 'readonly',
        //   placeholder: '请输入营业时间'
        // }
      ]
    },

  },
  data: function () {
    return {
    }
  },
  mounted(){
      
  },
  methods: {
    __init__(){
      this.codetxt
    },
    __send__(){
      this.send();
      this.__wait__();
    },
    __wait__(){

    }
  },
  computed: {
    
  },
  watch: {
    
  },
})
