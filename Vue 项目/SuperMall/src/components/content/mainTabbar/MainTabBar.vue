<template>
  <div>
    <van-tabbar route active-color="#ff8198" inactive-color="#000">
    <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/category" icon="shop-o">分类</van-tabbar-item>
    <van-tabbar-item replace to="/cart" icon="shopping-cart-o" :info="cartCount">购物车</van-tabbar-item>
    <van-tabbar-item replace  to="/profile" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "MainTabBar",
  components: {},
  data() {
    return {};
  },
  computed: {
    cartCount() {
      return this.$store.getters.cartCount;
    }
  }
};
</script>

<style scoped>
</style>
