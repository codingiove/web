<template>
  <div></div>
</template>
<script>
import { computed, ref } from "@vue/composition-api";
export default {
  setup() {
    const count = ref(1);
    const plusOne = computed({
      // 取值函数
      get: () => count.value + 1,

      // 赋值函数
      set: (val) => {
        count.value = val - 1;
      }, // 9
    });

    // 为计算属性赋值的操作，会触发 set 函数
    plusOne.value = 9;
    // 触发 set 函数后，count 的值会被更新
    console.log(count.value); // 输出 8
  },
};
</script>
