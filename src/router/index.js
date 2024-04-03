import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import ProductList from "../views/Product/ProductList.vue";
import PostList from "../views/Post/PostList.vue";
import BillListUnCheck from "../views/Bill/BillListUnCheck.vue";
import BillListCheck from "../views/Bill/BillListCheck.vue";
import BillListCancel from "../views/Bill/BillListCancel.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/product/list",
    name: "ProductList",
    component: ProductList,
  },
  {
    path: "/post/list",
    name: "PostList",
    component: PostList,
  },
  {
    path: "/bill/list-uncheck",
    name: "BillListUnCheck",
    component: BillListUnCheck,
  },
  {
    path: "/bill/list-check",
    name: "BillListCheck",
    component: BillListCheck,
  },
  {
    path: "/bill/list-cancel",
    name: "BillListCancel",
    component: BillListCancel,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
