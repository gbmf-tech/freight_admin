function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'trailer',
    name: 'admin.trailer',
    component: page('admin/trailer/main.vue'),
    redirect: {
        name: 'admin.trailer.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.trailer.list',
            component: page('admin/trailer/list.vue'),
        },
    ]
}
