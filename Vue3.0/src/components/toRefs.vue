<template>
  <div>
    {{ count }}
    <button @click="add">加一</button>
  </div>
</template>
<script>
import { toRefs, reactive } from "@vue/composition-api";
export default {
  setup() {
    console.log("----------------------------------");
    const state = reactive({
      count: 0,
      name: "张三",
    });
    const add = () => {
      state.count += 1;
    };
    return {
      //以展开运算符return出去的数据都不是响应式
      /* 那么为什么要用...return出去
        如果reactive定义了很多变量,以return {state}方式,那么template上就要通过{{以对象的形式去访问}}(state.count)
        ...话可以可以直接访问对象里面的属性({{count}})
        toRefs()能把数据变成响应式的,只不过，这个对象上的每个属性节点，都是 ref() 类型的响应式数据
      */
      ...toRefs(state),
      add,
    };
  },
};
</script>
