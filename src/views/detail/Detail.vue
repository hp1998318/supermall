<template>
  <div class="Detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @titleClick="titleClick"
      ref="navBar"
    ></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll" @scroll="topShow" :probeType="3">
      <detail-swiper :topImage="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
      <detail-param-info
        :paramInfo="paramInfo"
        ref="params"
      ></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <good-list :goods="recommends" ref="recommend"></good-list>
    </scroll>
    <back-top @click.native="topClick" v-show="isShow"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import { debounce } from "common/utils.js";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodList from "components/content/goods/GoodList.vue";
import BackTop from "components/content/backTop/BackTop.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
// import Toast from './componments/common/Toast.vue';
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // ImgListener: null,
      itemImgListener: null,
      recommendImgListener: null,
      themeTopYs: [],
      getThemeTopY: null,
      isShow: false,
      currentIndex: 0,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    BackTop,
    DetailBottomBar,
  },
  created() {
    // console.log(this.$route.params);
    // 1、保存传入的iid
    this.iid = this.$route.params.iid;
    // 2、根据iid请求详情页数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // 保存轮播图图片
      // console.log(data);
      this.topImage = data.itemInfo.topImages;
      // 保存其他数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 保存商家数据
      this.shop = new Shop(data.shopInfo);
      //保存商品信息
      this.detailInfo = data.detailInfo;
      // 保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 保存评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      /* 由于组件没有渲染所以会得到undifine 
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);  */

      /* $neaxtTick在渲染后加载  由于图片未加载完全 所以得到的位置不正确
      this.$nextTick(() => {
        (this.themeTopYs = []), this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      });

       */
    });
    // 3、请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    /* 用于获取准确的组件定位减少调用次数  给getThemeTopY进行赋值，从而进行防抖*/
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);
    }, 100);
  },

  mounted() {
    /* 防抖行数用于解决滚动给卡顿 */
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      refresh();
    };
    this.recommendImgListener = () => {
      refresh();
    };
    this.$bus.$on("imgLoad", () => {
      refresh();
      this.getThemeTopY();
    });
    this.$bus.$on("itemImageLoad", () => {
      refresh();
      this.getThemeTopY();
    });
  },
  updated() {},
  deactivated() {
    // console.log("deactivated");
    // console.log("detail");
    // 关闭刷新
    this.$bus.$off("itemImageLoad", this.itemImgListener);
    this.$bus.$off("imgLoad", this.recommendImgListener);
  },
  methods: {
    // Load() {
    //   console.log("11111111");
    //   const refresh = debounce(this.$refs.scroll.refresh, 500);
    //   refresh();
    //   this.getThemeTopY();
    // },
    // imgLoad1() {
    //   console.log("1111");
    // },
    titleClick(index) {
      // console.log(index);
      // this.getThemeTopY();
      this.$refs.scroll.ScrollTo(0, -this.themeTopYs[index], 200);
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

      // 3、判断当前位置与标题栏相对应
      for (let i = 0; i < this.themeTopYs.length; i++) {
        if (
          this.currentIndex !== i &&
          -position.y < this.themeTopYs[i + 1] &&
          -position.y >= this.themeTopYs[i]
        ) {
          this.currentIndex = i;
          // console.log(i);
        } else if (
          -position.y >= this.themeTopYs[this.themeTopYs.length - 1] &&
          this.currentIndex !== i
        ) {
          this.currentIndex = this.themeTopYs.length - 1;
        }
        // console.log(position.y);
        // console.log(this.currentIndex);
        this.$refs.navBar.currentIndex = this.currentIndex;
      }
    },
    addToCart() {
      // 1、获取购物车中商品需要展示的信息
      const product = {};
      product.image = this.topImage[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //2、 将信息添加到购物车
      this.$store.commit("addCart", product);
      // console.log(this.$toast);
      // console.log(this.$store);
      this.$toast.show("已添加到购物车", 1500);
    },
  },
};
</script>
<style scoped>
.Detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-scroll {
  height: calc(100% - 44px - 65px);
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
