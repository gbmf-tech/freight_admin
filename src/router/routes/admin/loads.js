function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'loads',
    name: 'admin.loads',
    component: page('admin/loads/main.vue'),
    redirect: {
        name: 'admin.loads.all'
    },
    children: [
        {
            path: 'create',
            name: 'admin.loads.create',
            component: page('admin/loads/create.vue'),
        },
        {
            path: 'edit/:id',
            name: 'admin.loads.edit',
            component: page('admin/loads/edit.vue'),
        },
        {
            path: 'list/:slug?',
            name: 'admin.loads.all',
            component: page('admin/loads/list.vue'),
        },
        {
            path: 'read/:id',
            name: 'admin.loads.read',
            component: page('admin/loads/read.vue'),
            redirect: {
                name: 'admin.loads.read.dashboard'
            },
            children: [
                {
                    path: 'dashboard',
                    name: 'admin.loads.read.dashboard',
                    component: page('admin/loads/read/dashboard')
                },
                {
                    path: 'profile',
                    name: 'admin.loads.read.profile',
                    component: page('admin/loads/read/profile')
                },
                {
                    path: 'loads',
                    name: 'admin.loads.read.loads',
                    component: page('admin/loads/read/loads')
                },
                {
                    path: 'logs',
                    name: 'admin.loads.read.logs',
                    component: page('admin/loads/read/logs')
                },
                {
                    path: 'settings',
                    name: 'admin.loads.read.settings',
                    component: page('admin/loads/read/settings')
                }
            ]
        }
    ],
}
