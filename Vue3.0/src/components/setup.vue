<template>
  <div>
    {{ p1 }}
    {{ p2 }}
  </div>
</template>

<script>
export default {
  setup(props, context) {
    console.log(props);
    console.log(props.p1);
    console.log(context);
  },
  props: {
    p1: String,
    p2: String,
  },
};
</script>
<style scoped></style>
