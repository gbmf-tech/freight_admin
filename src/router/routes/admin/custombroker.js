function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'custombroker',
    name: 'admin.custombroker',
    component: page('admin/custombroker/main.vue'),
    redirect: {
        name: 'admin.custombroker.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.custombroker.list',
            component: page('admin/custombroker/list.vue'),
        },
    ]
}
