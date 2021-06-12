<template>
  <div>1</div>
</template>
<script>
import { watch, reactive, ref } from "@vue/composition-api";
export default {
  setup() {
    // const state = reactive({ count: 0 });
    // watch(
    //   () => state.count,//监听的数据源,
    //   (newVal, prevCount) => {
    //     console.log(newVal, prevCount);
    //   }
    // );
    // setTimeout(() => {
    //   state.count++;
    // }, 1000);

    // 监视 state.count 这个数据节点的变化
    const count = ref(0);
    // 指定要监视的数据源
    watch(count, (newVal, prevCount) => {
      console.log(newVal, prevCount);
    });
    setTimeout(() => {
      count.value++;
    }, 1000);
  },
};
</script>
