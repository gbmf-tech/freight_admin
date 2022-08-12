function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'driverstatus',
    name: 'admin.driverstatus',
    component: page('admin/driverstatus/main.vue'),
    redirect: {
        name: 'admin.driverstatus.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.driverstatus.list',
            component: page('admin/driverstatus/list.vue'),
        },
    ]
}
