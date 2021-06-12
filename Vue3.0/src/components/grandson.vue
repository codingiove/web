<template>
  <div>
    <h5 :style="{ color:themeColor }">孙子组件</h5>
  </div>
</template>
<script>
import { inject } from "@vue/composition-api";
export default {
  setup() {
    const themeColor = inject("Color");
    return {
      themeColor,
    };
  },
};
</script>
