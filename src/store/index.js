import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartList: [],
  },
  mutations: {
    // addCounter(state, payload) {
    //   payload.count++;
    // },
    // addToCart(state, payload) {
    //   state.cartList.push(payload);
    // },
    addCart(state, payload) {
      // 查找之前数组中是否有该商品
      let oldProduct = state.cartList.find((item) => item.iid === payload.iid);

      // 判断oldProduct
      if (oldProduct) {
        oldProduct.count += 1;
        // context.commit("addCounter", oldProduct);
      } else {
        payload.count = 1;
        payload.isChecked = true;
        state.cartList.push(payload);
        // context.commit("addToCart", payload);
      }
    },
  },
  actions: {},
  getters: {
    cartList(state) {
      return state.cartList;
    },
    cartCount(state, getter) {
      return getter.cartList.length;
    },
  },
});

export default store;
