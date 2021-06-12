Component({
  // 外面传过来的值  props
  properties: {
    lwh: {
      type: String,
      value: "默认值",
    },
  },

  // 组件自己的数据
  data: {
    message: "自定义组件数据",
    numberA: 0,
  },

  // 组件的方法列表
  methods: {
    updata() {
      // triggerEvent === $emit
      this.triggerEvent("itemcheng", "当当当当");
    },
    addnumberA() {
      this.setData({ numberA: this.data.numberA + 1 });
    },
  },
  //只能在组件中使用,监听 data 和 properties 变化
  observers: {
    numberA(a) {block
      console.log(a);
    },
  },
});
