import { createRouter, createWebHistory } from 'vue-router'

import AdminLayout from "@/layouts/admin/AdminLayout.vue";
import HomeView from "../views/app/HomeView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/auth/',
            children:[
                {
                    path: 'login',
                    name: 'login',
                    component: import("@/views/auth/LoginPage.vue")
                },
                {
                    path: 'register',
                    name: 'register',
                    component: import("@/views/auth/Register.vue")
                }
            ]

        },
        {
            path: '/admin/',
            component: AdminLayout,
            name:'admin',
            children:[
                //brands
                {
                    path: 'brands',
                    name: 'adminBrands',
                    component: import("@/views/admin/brands/PageList.vue"),
                },
                {
                    path: 'brands/edit/:id',
                    name: 'adminBrandEdit',
                    component: import("@/views/admin/brands/PageEdit.vue"),
                },
                {
                    path: 'brands/create',
                    name: 'adminBrandCreate',
                    component: import("@/views/admin/brands/PageCreate.vue"),
                },
                //products
                {
                    path: 'products',
                    name: 'adminProducts',
                    component: import("@/views/admin/products/PageProductList.vue"),
                },
                {
                    path: 'products/create',
                    name: 'adminProductCreate',
                    component: import("@/views/admin/products/PageProductCreate.vue"),
                },
                //collections
                {
                    path: 'collections',
                    name: 'adminCollections',
                    component: import("@/views/admin/collections/PageCollectionList.vue"),
                },
                {
                    path: 'collections/create',
                    name: 'adminCollectionCreate',
                    component: import("@/views/admin/collections/PageCollectionCreate.vue"),
                }
            ]
        }


    ]
})

export default router