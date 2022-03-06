<template>
  <div id="cart-list">
    <cart-list-item
      v-for="item in cartList"
      :key="item.id"
      :itemInfo="item"
    ></cart-list-item>
  </div>
</template>
<script>
import CartListItem from "./CartListItem.vue";
export default {
  name: "CartList",
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    CartListItem,
  },
};
</script>
<style scoped></style>
