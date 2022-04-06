const rules = {
  name: [
    // 必填规则
    {
      required: true,
      message: '此为必填字段'，
      // blur和change事件触发检验
      trigger: ['blur', 'change'],
    },
    // 正则判断为字母或数字
    {
      pattern: /^[0-9a-zA-Z]*$/g,
      // 正则检验前先将值转为字符串
      transform(value) {
        return String(value);
      },
      message: '只能包含字母或数字'
    },
    // 6-8个字符之间的判断
    {
      min: 6,
      max: 8,
      message: '长度在6-8个字符之间'
    },
    // 自定义规则判断是否包含字母"A"
    {
      validator: (rule, value, callback) => {
        return uni.$u.test.contains(value, "A");
      },
      message: '必须包含字母"A"'
    },
    // 校验用户是否已存在
    {
      asyncValidator: (rule, value, callback) => {
        uni.$u.http.post('/xxx/xxx', {
          name: value
        }).then(res => {
          // 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
          if (res.error) {
            callback(new Error('姓名重复'));
          } else {
            // 如果校验通过，也要执行callback()回调
            callback();
          }
        })
      },
      // 如果是异步校验，无需写message属性，错误的信息通过Error抛出即可
      // message: 'xxx'
    }
  ]
}
