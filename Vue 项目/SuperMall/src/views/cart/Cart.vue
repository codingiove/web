<template>
  <div id="cart">
    <nav-bar class="nav-bar"
      ><div slot="center">购物车({{ cartCount }})</div></nav-bar
    >
    <Scroll class="cart-list" ref="scroll">
      <cart-list class="cart-list" :cart-list="cartList" ></cart-list>
    </Scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import Scroll from "../../components/common/scroll/Scroll";
import CartList from "./childComps/CartList";
import BottomBar from "./childComps/BottomBar";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    BottomBar
  },
  computed: {
    cartList() {
      return this.$store.getters.cartList;
    },
    cartCount() {
      return this.$store.getters.cartCount;
    }
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    
  },
};
</script>

<style scoped>
#cart {
  position: relative;
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.cart-list {
  position: absolute;
  top: 22px;
  bottom: 47px;
  width: 100%;
}
</style>
