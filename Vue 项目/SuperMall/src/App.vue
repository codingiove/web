<template>
  <div id="app">
    <scroll ref="scroll">
      <keep-alive exclude="Detail">
        <!--keep-alive 包裹视图 ->排除不需要保存状态的部分组件 用 exclude=""
         exclude="" 中就要填 export default 里的 name 名字 -->
        <router-view />
        <!--路由跳转可以看见的页面内容,不写 router-view 路由发生跳转看见的就是一片空白-->
      </keep-alive>
      <!-- 不是这个路径就隐藏 -->
      <main-tab-bar v-if="!($route.path == '/detail')"></main-tab-bar>
      <icon></icon>
      <svg-icon></svg-icon>
    </scroll>
  </div>
</template>
<script>
import MainTabBar from "content/mainTabbar/MainTabBar";
import Icon from "content/Icon/Icon.vue";
import SvgIcon from "content/Icon/svg.vue";
import scroll from "@/components/common/scroll/Scroll.vue";
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  components: {
    MainTabBar,
    Icon,
    SvgIcon,
    scroll
  },
  data() {
    return {};
  },
  methods: {
    reload() {
      this.$nextTick(function() {
        this.$refs.scroll.refresh();
        console.log("刷新");
      });
    }
  },
  mounted() {
    this.reload();
  }
};
</script>

<style>
body {
  touch-action: none;
}
@import "assets/css/base.css";
</style>
