<template>
  <div id="Cart">
    <nav-bar class="nav-bar"
      ><div slot="center">购物车({{ cartCount }})</div></nav-bar
    >
    <scroll class="context" ref="scroll">
      <cart-list :cartList="cartList" class="cart-list"></cart-list>
    </scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll.vue";
import CartList from "./childComps/CartList.vue";
import BottomBar from "./childComps/BottomBar.vue";
export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    BottomBar,
  },
  created() {
    // this.$refs.scroll.refresh();
    // console.log("1111111");
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  computed: {
    ...mapGetters(["cartCount", "cartList"]),
  },
};
</script>
<style scoped>
#Cart {
  position: relative;
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  /* position: sticky;
  z-index: 9;
  top: 0px; */
}
.context {
  height: calc(100% - 44px - 49px - 44px);
  overflow: hidden;
  /* position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
}
/* .cart-list {
  padding-bottom: 49px;
} */
</style>
