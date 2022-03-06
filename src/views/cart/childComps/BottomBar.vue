<template>
  <div class="bottom-menu">
    <check-button
      class="select-all"
      @btnClick="btnClick"
      v-model="isSelectAll"
    ></check-button>
    <span>全选</span>
    <span class="total-price">合计￥{{ getTotal }}</span>
    <span class="buy-product" @click="BuyClick">去结算</span>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CheckButton from "./CheckButton.vue";

export default {
  name: "BottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartCount", "cartList"]),
    getTotal() {
      const list = this.cartList;
      return list
        .filter((item) => {
          return item.isChecked === true;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    isSelectAll() {
      return (
        this.$store.getters.cartList.find((item) => {
          return item.isChecked == false;
        }) === undefined
      );
    },
  },
  methods: {
    btnClick() {
      // 判断是否存在未选中的
      let isSelectAll = this.$store.getters.cartList.find((item) => {
        return !item.isChecked;
      });
      if (isSelectAll) {
        this.$store.state.cartList.forEach((item) => {
          item.isChecked = true;
        });
      } else {
        this.$store.state.cartList.forEach((item) => {
          item.isChecked = false;
        });
      }
    },
    BuyClick() {
      this.$toast.show("结算中。。。", 1500);
    },
  },
};
</script>
<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}
.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}
.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}
.bottom-menu .buy-product {
  background-color: red;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
