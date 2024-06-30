import AdminLayout from "@/layouts/admin/AdminLayout.vue";
import HomeView from "../views/app/HomeView.vue"
import ClientLayout from "@/layouts/client/Layout.vue";
import AuthLayout from "@/layouts/auth/Layout.vue";
import AdminSettingLayout from "@/layouts/admin/AdminSettingLayout.vue";
import NotFoundComponent from "@/components/NotFoundComponent.vue";

export default [
    {
        path: '/',
        component: ClientLayout,
        children:[
            {
                path: '',
                component: HomeView,
                name: 'home',
            },
            {
                path: 'cart',
                component: () => import('@/views/app/Cart.vue'),
                name: 'cart',

            },
            {
                path: 'checkout',
                component: () => import('@/views/app/checkout/Index.vue'),
                name: 'checkout',

            }
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