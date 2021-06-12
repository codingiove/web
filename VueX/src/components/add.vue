<template>
  <div>
    <!-- {{ $store.state.moduleA.count }} -->
     {{count}}
    <br />
    {{ doubleCount }}
    <br />
    <button @click="add">+</button>
   
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters,mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("moduleA",["count"]), // 这里写你要用的方法名
    ...mapGetters("moduleA", ["doubleCount"]),
  },
  methods: {
    ...mapMutations("moduleA",["increment"]),
    ...mapActions("moduleA",["yibuplus"]),
    add() {
      this.yibuplus()
      // this.increment(8)
      // console.log(this.$store.state.moduleA);
    },
  },
};
</script>
<style scoped></style>
