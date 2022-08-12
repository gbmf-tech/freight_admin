function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'drivers',
    name: 'admin.drivers',
    component: page('admin/drivers/main.vue'),
    redirect: {
        name: 'admin.drivers.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.drivers.list',
            component: page('admin/drivers/list.vue'),
        },
        {
            path: 'read/:id',
            name: 'admin.drivers.read',
            component: page('admin/drivers/read.vue'),
            redirect: {
                name: 'admin.drivers.read.dashboard'
            },
            children: [
                {
                    path: 'dashboard',
                    name: 'admin.drivers.read.dashboard',
                    component: page('admin/drivers/read/dashboard')
                },
                {
                    path: 'profile',
                    name: 'admin.drivers.read.profile',
                    component: page('admin/drivers/read/profile')
                },
                {
                    path: 'loads',
                    name: 'admin.drivers.read.loads',
                    component: page('admin/drivers/read/loads')
                },
                {
                    path: 'location',
                    name: 'admin.drivers.read.location',
                    component: page('admin/drivers/read/location')
                },
                {
                    path: 'settings',
                    name: 'admin.drivers.read.settings',
                    component: page('admin/drivers/read/settings')
                }
            ]
        }
    ]
}
