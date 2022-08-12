function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'customers',
    name: 'admin.customers',
    component: page('admin/customers/main.vue'),
    redirect: {
        name: 'admin.customers.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.customers.list',
            component: page('admin/customers/list.vue'),
        },
        {
            path: 'create',
            name: 'admin.customers.create',
            component: page('admin/customers/create.vue'),
        },
        {
            path: 'read/:id',
            name: 'admin.customers.read',
            component: page('admin/customers/read.vue'),
            redirect: {
                name: 'admin.customers.read.dashboard'
            },
            children: [
                {
                    path: '',
                    redirect: {name: 'admin.customers.read.dashboard'}
                },
                {
                    path: 'dashboard',
                    name: 'admin.customers.read.dashboard',
                    component: page('admin/customers/read/dashboard')
                },
                {
                    path: 'profile',
                    name: 'admin.customers.read.profile',
                    component: page('admin/customers/read/profile')
                },
                {
                    path: 'shipments',
                    name: 'admin.customers.read.shipments',
                    component: page('admin/customers/read/shipments')
                },
                {
                    path: 'logs',
                    name: 'admin.customers.read.logs',
                    component: page('admin/customers/read/logs')
                },
                {
                    path: 'settings',
                    name: 'admin.customers.read.settings',
                    component: page('admin/customers/read/settings')
                }
            ]
        }
    ],
}
