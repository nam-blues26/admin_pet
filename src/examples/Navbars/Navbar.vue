<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Breadcrumbs from "../Breadcrumbs.vue";

const store = useStore();
const isRTL = computed(() => store.state.isRTL);

const route = useRoute();

const currentRouteName = computed(() => {
    return route.name;
});
const currentDirectory = computed(() => {
    let dir = route.path.split("/")[1];
    return dir.charAt(0).toUpperCase() + dir.slice(1);
});

</script>
<template>
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
        :class="isRTL ? 'top-0 position-sticky z-index-sticky' : ''" v-bind="$attrs" id="navbarBlur" data-scroll="true">
        <div class="px-3 py-1 container-fluid">
            <breadcrumbs :current-page="currentRouteName" :current-directory="currentDirectory" />

        
        </div>
    </nav>
</template>
