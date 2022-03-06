<template>
  <!-- <h2>首页</h2> -->
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">首页</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      ref="tabControl1"
      @tabClick="tabClick"
      class="tabControl"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="topShow"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        ref="tabControl2"
        @tabClick="tabClick"
      ></tab-control>
      <good-list :goods="ItemChange"></good-list>
    </scroll>
    <back-top @click.native="topClick" v-show="isShow"></back-top>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { getHomeMultidata, getHomeGoods } from "network/home.js";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodList from "components/content/goods/GoodList.vue";
import BackTop from "components/content/backTop/BackTop.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import { debounce } from "common/utils.js";
// import Swiper from "components/common/swiper/Swiper.vue";
// import SwiperItem from "components/common/swiper/SwiperItem.vue";
// import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    BackTop,
    Scroll,
  },
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      ItemType: "pop",
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      refresh();
    };
    // 监听item中图片加载完成  现在程序中无$bus 要去main.js 中添加原型 （Vue.prototype.$bus = new Vue();）
    this.$bus.$on("itemImageLoad", () => {
      // console.log("-------");
      // console.log(this.$bus);
      refresh();
    });
  },
  activated() {
    // console.log("actived");
    if (this.saveY != 0) {
      this.$refs.scroll.ScrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    }
  },
  destroyed() {
    // console.log("destroyed");
  },
  deactivated() {
    // console.log("deactivated");
    this.saveY = this.$refs.scroll.getPositionY();
    // 关闭刷新
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  computed: {
    ItemChange() {
      return this.goods[this.ItemType].list;
    },
  },

  methods: {
    /*
     监听相关方法
    */
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.ItemType = "pop";
          break;
        case 1:
          this.ItemType = "new";
          break;
        case 2:
          this.ItemType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    topClick() {
      // console.log("1111");
      this.$refs.scroll.ScrollTo(0, 0);
    },
    topShow(position) {
      // console.log(position);
      // 1.判断是否显示返回顶部按钮
      if (position.y < -1000) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      // 2.判断是否隐藏tabControl1
      if (position.y < -this.tabOffsetTop) {
        this.isTabFixed = true;
      } else {
        this.isTabFixed = false;
      }
    },
    loadMore() {
      // console.log("加载更多");
      this.getHomeGoods(this.ItemType);
    },
    swiperImageLoad() {
      // 用$el获取组件中的元素 然后给offsetTop赋值
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
    网络请求相关方法
    */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;

  /* top: 0;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 9;
   */
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  /* height: calc(100% - 93); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tabControl {
  position: relative;
  z-index: 9;
}
</style>
