<template>
  <div>
    {{ count }}
  </div>
</template>
<script>
import { ref } from "@vue/composition-api";
export default {
  setup() {
    console.log("-----------------------------------");
    //ref,return出去得必须是以对象形式
    const count = ref(50);
    console.log(count);
    console.log(count.value);

    return { count };
  },
};
</script>
