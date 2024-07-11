import { createRouter, createWebHistory } from 'vue-router'

import ClientLayout from "@/layouts/client/Layout.vue";
import HomeView from "@/views/app/HomeView.vue";
import AuthLayout from "@/layouts/auth/Layout.vue";
import AdminLayout from "@/layouts/admin/AdminLayout.vue";
import AdminSettingLayout from "@/layouts/admin/AdminSettingLayout.vue";
import NotFoundComponent from "@/components/NotFoundComponent.vue";
import DetailProduct from "@/views/app/product/Detail.vue";
import NoLayout from "@/layouts/no-layout/NoLayout.vue";
import {useCurrentUser} from "vuefire"
import {nextTick} from "vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: ClientLayout,
            children:[
                {
                    name: 'test',
                    path:'test',
                    component:() => import('@/components/ProvinceAddress.vue')
                },
                {
                    path: '',
                    component: HomeView,
                    name: 'home',
                    meta: {title: ""},
                },
                {
                    path: 'cart',
                    component: () => import('@/views/app/Cart.vue'),
                    name: 'cart',
                    meta: {title: "Cart"},
                },
                {
                    path: 'product/:id',
                    component: DetailProduct,
                    name: 'productDetail',
                },
                {
                    path: 'collections',
                    component: () => import('@/views/app/collection/List.vue'),
                    name: 'collections',
                },
                {
                    path: 'brands',
                    component: () => import('@/views/app/collection/List.vue'),
                    name: 'brands',
                },
                {
                    path: 'collection/:id',
                    component: () => import('@/views/app/collection/Detail.vue'),
                    name: 'collectionDetail',
                },
                {
                    path: 'brand/:id',
                    component: () => import('@/views/app/collection/Detail.vue'),
                    name: 'brandDetail',

                },
                {
                    path:'profile/',
                    component: () => import('@/layouts/profile/Index.vue'),
                    children: [
                        {
                            path: 'general',
                            name: 'general',
                            component: () => import('@/views/app/auth/Profile.vue'),
                        },
                        {
                            path: 'address',
                            name: 'address',
                            component: () => import('@/views/app/auth/Address.vue'),
                        },
                        {
                            path: 'transactions',
                            name: 'transactions',
                            component: () => import('@/views/app/auth/Transaction.vue'),
                        },
                    ]
                },
            ]
        },
        {
            path: '/auth/',
            component:AuthLayout,
            children:[
                {
                    path: 'login',
                    name: 'login',
                    component:  () =>import("@/views/auth/LoginPage.vue")
                },
                {
                    path: 'register',
                    name: 'register',
                    component:  () =>import("@/views/auth/Register.vue")
                },
            ]
        },
        {
            path: '/checkout/',
            component: NoLayout,
            meta: { requiresAuth: true , title: "Checkout"},
            children:[
                {
                    path: '',
                    component: () => import('@/views/app/checkout/Index.vue'),
                    name: 'checkout',
                },
            ]
        },
        {
            path: '/admin/',
            component: AdminLayout,
            name:'admin',
            meta: { requiresAuth: true, isAdmin:true },
            children:[
                //brands
                {
                    path: 'brands',
                    name: 'adminBrands',
                    component:  () =>import("@/views/admin/brands/PageList.vue"),
                },
                {
                    path: 'brands/edit/:id',
                    name: 'adminBrandEdit',
                    component:  () =>import("@/views/admin/brands/PageEdit.vue"),
                },
                {
                    path: 'brands/create',
                    name: 'adminBrandCreate',
                    component: () => import("@/views/admin/brands/PageCreate.vue"),
                },
                //products
                {
                    path: 'products',
                    name: 'adminProducts',
                    component: () => import("@/views/admin/products/PageProductList.vue"),
                },
                {
                    path: 'products/create',
                    name: 'adminProductCreate',
                    component:  () =>import("@/views/admin/products/PageProductCreate.vue"),
                },
                //collections
                {
                    path: 'collections',
                    name: 'adminCollections',
                    component: () => import("@/views/admin/collections/PageCollectionList.vue"),
                },
                {
                    path: 'collections/create',
                    name: 'adminCollectionCreate',
                    component: () => import("@/views/admin/collections/PageCollectionCreate.vue"),
                },
                {
                    path: 'collections/:id',
                    name: 'adminCollectionEdit',
                    component: () => import("@/views/admin/collections/PageCollectionEdit.vue"),
                },
                //settings
                {
                    path: 'settings',
                    component:AdminSettingLayout,
                    name:'adminSetting',
                    children:[
                        {
                            path:'permissions',
                            name: 'adminSettingPermissionList',
                            component: () => import("@/views/admin/settings/permissions/List.vue")
                        },
                        {
                            path:'permissions/create',
                            name: 'adminSettingPermissionsCreate',
                            component: () => import("@/views/admin/settings/permissions/Create.vue")
                        },
                        {
                            path: 'roles',
                            name: 'adminSettingRoleList',
                            component: () => import("@/views/admin/settings/roles/ListRole.vue"),
                        },
                        {
                            path: 'roles/create',
                            name: 'adminSettingRoleCreate',
                            component: () => import("@/views/admin/settings/roles/CreateRole.vue"),
                        }

                    ]
                }
            ]
        },

        { path: '/:pathMatch(.*)', component: NotFoundComponent }
    ]
});

router.beforeEach( (to, _, next) => {
    const user = useCurrentUser();
    if(to.meta.requiresAuth) {
      if(!user.value) next({name: 'login'})
      else next()
    }else  next()

})
router.afterEach((to) => {
    nextTick(
        () =>
            (document.title =
                (to?.meta?.title ? to?.meta?.title + "/" : "") +
                import.meta.env.VITE_APP_TITLE),
    );
});
export default router