<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item v-for="item in topImage" v-bind:key="item.id">
        <img :src="item" alt="" class="swiper-item" />
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  name: "DetailSwiper",
  props: {
    topImage: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>
<style scoped>
.swiper-item {
  height: 300px;
}
</style>
