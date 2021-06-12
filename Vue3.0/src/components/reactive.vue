<template>
  <div>
    {{ count }}
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
export default {
  setup(props, context) {
    console.log("-------------------------------");
    //定义变量接收reactive数据,return出去,供 template 使用
    const data = reactive({ count: 0 });
    console.log(data);
    return data;
  },
};
</script>
<style scoped></style>
