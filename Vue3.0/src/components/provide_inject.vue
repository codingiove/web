<template>
  <div>
    <h2>子组件</h2>
    <grandson />
  </div>
</template>

<script>
import grandson from "@/components/grandson.vue";
export default {
  components: {
    grandson,
  },
};
</script>
