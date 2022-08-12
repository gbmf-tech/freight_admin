function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'driverlocation',
    name: 'admin.driverlocation',
    component: page('admin/driverlocation/main.vue'),
    redirect: {
        name: 'admin.driverlocation.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.driverlocation.list',
            component: page('admin/driverlocation/list.vue'),
        },
    ]
}
