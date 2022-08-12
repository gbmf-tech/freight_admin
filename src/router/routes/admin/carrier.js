function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'carrier',
    name: 'admin.carrier',
    component: page('admin/carrier/main.vue'),
    redirect: {
        name: 'admin.carrier.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.carrier.list',
            component: page('admin/carrier/list.vue'),
        },
    ]
}
