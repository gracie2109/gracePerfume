import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "@/views/app/HomeView.vue"
import AdminLayout from "@/layouts/admin/AdminLayout.vue";
import PageListBrand from "@/views/admin/brands/PageList.vue";
import PageEditBrand from "@/views/admin/brands/PageEdit.vue";
import PageCreateBrand from "@/views/admin/brands/PageCreate.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/admin/',
            component: AdminLayout,
            children:[
                {
                    path: 'brands',
                    name: 'adminBrands',
                    component: PageListBrand,
                },
                {
                    path: 'brand/edit/:id',
                    name: 'adminBrandEdit',
                    component: PageEditBrand,
                },
                {
                    path: 'brand/create',
                    name: 'adminBrandCreate',
                    component: PageCreateBrand,
                }
            ]
        }


    ]
})

export default router