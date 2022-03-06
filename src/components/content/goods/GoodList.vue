<template>
  <div class="goods">
    <good-list-item
      v-for="item in goods"
      v-bind:key="item.id"
      :goodItem="item"
    ></good-list-item>
  </div>
</template>
<script>
// import GoodListItem from "components/content/GoodListItem.vue";
import GoodListItem from "./GoodListItem.vue";
export default {
  name: "GoodList",
  components: {
    GoodListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.goods {
  display: flex;
  /* 让弹性盒子在必要的时候拆行 */
  flex-wrap: wrap;
  /*  / space-evenly 均等分    justify-content留白  ！space-around与space-evenly的区别*/
  justify-content: space-evenly;
  /* 原生 */
  /* padding-bottom: 59px; */
}
</style>
