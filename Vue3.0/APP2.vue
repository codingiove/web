<template>
  <div>
    <div class="Common-type">
      <!-- 如果是ref创建的数据,Vue会自动给我们添加.value -->
      <!-- 怎么判断是否是ref类型呢 ? 
           ref 属性上有个 __v_isRef,通过它来判断
      -->
      {{ count }}
      <button @click="add">count 增加</button>
    </div>
    <div class="Complex-type">
      {{ state.arr }}
      <button @click="stateAdd">push</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"; // ref 函数只能监听简单类型的变化,不能监听复杂类型的变化(对象 / 数组)
import { reactive } from "vue"; // reactive 可以监听复杂类型的变化,如果传递了其他对象,需要重新赋值
// import { isRef, isReactive } from "vue"; // 判断类型
export default {
  name: "App",
  setup() {
    let count = ref(0);
    let state = reactive({
      arr: [1, 2, 3, 4, 5, 6, 7, 8],
    });
    function add() {
      count.value++;
    }
    function stateAdd() {
      state.arr.push(count.value);
    }
    return { count, add, state: state, stateAdd };
  },
};
</script>
