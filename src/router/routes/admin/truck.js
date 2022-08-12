function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'truck',
    name: 'admin.truck',
    component: page('admin/truck/main.vue'),
    redirect: {
        name: 'admin.truck.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.truck.list',
            component: page('admin/truck/list.vue'),
        },
    ]
}
