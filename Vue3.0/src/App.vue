<template>
  <div id="app">
    <!-- <button @click="themeColor = 'red'">红色</button>
    <button @click="themeColor = 'blue'">篮色</button>
    <button @click="themeColor = 'pink'">粉色</button>
    <hr />
    <setup p1="App内容1" p2="App内容2" />
    ------------------------------------------
    <reactive />
    ------------------------------------------
    <refs />
    ------------------------------------------
    <toRefs />
    ------------------------------------------
    <computed />
    ------------------------------------------
    <watch />
    ------------------------------------------
    <provide-inject /> -->
    <test />
  </div>
</template>

<script>
import setup from "@/components/setup.vue";
import reactive from "@/components/reactive.vue";
import refs from "@/components/ref.vue";
import toRefs from "@/components/toRefs.vue";
import computed from "@/components/computed.vue";
import watch from "@/components/watch.vue";
import provide_inject from "@/components/provide_inject.vue";
import test from "@/components/test.vue";
import { provide, ref } from "@vue/composition-api";
export default {
  name: "App",
  components: {
    setup,
    reactive,
    refs,
    toRefs,
    computed,
    test,
    watch,
    "provide-inject": provide_inject,
  },
  setup(props, context) {
    const themeColor = ref("red");
    provide("Color", themeColor);
    return {
      themeColor,
    };
  },
};
</script>

<style lang="scss"></style>
