<template>
  <div>
    我的年龄:{{ age }}
    <button @click="add">age加一</button>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  setup(props, context) {
    // 这样写 { root } 相当于  { root, emit, refs } = { root: 某个方法, emit: 某个方法, refs: 某个方法 };
    console.log(context.root);
    let state = reactive({
      name: "我是名字",
      age: 17,
    });

    let add = () => {
      state.age + 1;
    };
    return {
      ...state, // ...state => return{ name,age, add}     state => return{{state}, add}
      add,
    };
  },
};
</script>
