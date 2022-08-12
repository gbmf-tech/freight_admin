function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'loadwo',
    name: 'admin.loadwo',
    component: page('admin/loadwo/main.vue'),
    redirect: {
        name: 'admin.loadwo.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.loadwo.list',
            component: page('admin/loadwo/list.vue'),
        },
    ]
}
