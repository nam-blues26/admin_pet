<script setup>
import { useRoute } from "vue-router";

import SidenavItem from "./SidenavItem.vue";

const getRoute = () => {
    const route = useRoute();
    const routeArr = route.path.split("/");
    return routeArr[1];
};
</script>
<template>
    <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
        <ul class="navbar-nav">
            <li class="mt-3 nav-item">
                <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6" :class="'ms-2'">
                    Product
                </h6>
            </li>
            <li class="nav-item">
                <sidenav-item to="/dashboard-default" :class="getRoute() === 'dashboard-default' ? 'active' : ''"
                    :navText="'Dashboard'">
                    <template v-slot:icon>
                        <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                    </template>
                </sidenav-item>
            </li>
            <li class="nav-item">
                <sidenav-item to="/product/list" :class="getRoute() === 'product/list' ? 'active' : ''" :navText="'Danh sách sản phẩm'">
                    <template v-slot:icon>
                        <i class="ni ni-laptop text-warning text-sm opacity-10"></i>
                    </template>
                </sidenav-item>
            </li>
            <li class="nav-item">
                <sidenav-item to="/post/list" :class="getRoute() === 'post/list' ? 'active' : ''" :navText="'Danh sách bài viết'">
                    <template v-slot:icon>
                        <i class="ni ni-image text-warning text-sm opacity-10"></i>
                    </template>
                </sidenav-item>
            </li>
            <li class="nav-item">
                <sidenav-item to="/bill/list-uncheck" :class="getRoute() === 'bill/list' ? 'active' : ''" :navText="'Quản lý hóa đơn'">
                    <template v-slot:icon>
                        <i class="ni ni-image text-warning text-sm opacity-10"></i>
                    </template>
                </sidenav-item>
            </li>
            <li class="mt-3 nav-item">
                <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6" :class="'ms-2'">
                    ACCOUNT PAGES
                </h6>
            </li>

            <li class="px-6 nav-item">
                <button class="btn btn-danger" @click="logout()">Log out</button>
            </li>

        </ul>
    </div>

</template>

<script>
import VueCookies from 'vue-cookies';
import router from '@/router';
export default {
    components: {
    },
    data() {
        return {
           
        }
    },
    methods: {
        logout() {
            VueCookies.remove('loggedIn');
            router.push({ path: '/signin' })
        },

    },

}
</script>
