import Vue from "vue";
import Router from "vue-router";
// import { component } from "vue/types/umd";
const Home = () => import("views/home/Home.vue");
const Category = () => import("views/category/Category.vue");
const Cart = () => import("views/cart/Cart.vue");
const Profile = () => import("views/profile/Profile.vue");
const Detail = () => import("views/detail/Detail.vue");
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "",
      redirect: "./home",
    },
    {
      path: "/cart",
      component: Cart,
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/category",
      component: Category,
    },
    {
      path: "/profile",
      component: Profile,
    },
    {
      path: "/detail/:iid",
      component: Detail,
    },
  ],
  mode: "history",
});
export default router;
