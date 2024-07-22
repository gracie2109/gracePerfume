export const navigation = {
    adminNav:[
        {
            path: 'orders',
            name:'orders'
        },
        {
            path: 'vouchers',
            name:'vouchers'
        },
        {
            path: 'brands',
            name: 'adminBrands',
        },
        {
            path: 'products',
            name: 'adminProducts',
        },
        {
            path: 'collections',
            name: 'adminCollections',
        },
        {
            path: 'settings',
            name:'adminSetting'
        }
    ],
    settingNav :[
        {
            path: 'roles',
            name: 'adminSettingRoleList',
            icon:'',
        },
        {
            path: 'permissions',
            name: 'adminSettingPermissionList',
            icon:''
        }
    ],
    profileNav:[
        {
            path: 'general',
            name: 'general',
            icon:''
        },
        {
            path: 'address',
            name: 'address',
            icon:''
        },
        {
            path: 'transactions',
            name: 'transactions',
            icon:''
        }
    ],
    clientNav:[
        {
            text: 'Home',
            url: '/'
        },
        {
            text: 'About Us',
            url: '/about-us'
        },
        {
            text: 'Contact',
            url: '/contact'
        },
        {
            text:'Coupons',
            url:'/coupons'
        }
    ]
}
