import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "@/views/app/HomeView.vue"
import AdminLayout from "@/layouts/admin/AdminLayout.vue";
import PageListBrand from "@/views/admin/brands/PageList.vue";
import PageEditBrand from "@/views/admin/brands/PageEdit.vue";
import PageCreateBrand from "@/views/admin/brands/PageCreate.vue";

import PageListProduct from "@/views/admin/products/PageProductList.vue";
import PageCreateProducts from "@/views/admin/products/PageProductCreate.vue";


import PageListCollections from "@/views/admin/collections/PageCollectionList.vue";
import PageCreateCollections from "@/views/admin/collections/PageCollectionCreate.vue";


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
            name:'admin',
            children:[
                //brands
                {
                    path: 'brands',
                    name: 'adminBrands',
                    component: PageListBrand,
                },
                {
                    path: 'brands/edit/:id',
                    name: 'adminBrandEdit',
                    component: PageEditBrand,
                },
                {
                    path: 'brands/create',
                    name: 'adminBrandCreate',
                    component: PageCreateBrand,
                },
                //products
                {
                    path: 'products',
                    name: 'adminProducts',
                    component: PageListProduct,
                },
                {
                    path: 'products/create',
                    name: 'adminProductCreate',
                    component: PageCreateProducts,
                },
                //collections
                {
                    path: 'collections',
                    name: 'adminCollections',
                    component: PageListCollections,
                },
                {
                    path: 'collections/create',
                    name: 'adminCollectionCreate',
                    component: PageCreateCollections,
                }
            ]
        }


    ]
})

export default router