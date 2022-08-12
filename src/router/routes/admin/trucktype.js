function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'trucktype',
    name: 'admin.trucktype',
    component: page('admin/trucktype/main.vue'),
    redirect: {
        name: 'admin.trucktype.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.trucktype.list',
            component: page('admin/trucktype/list.vue'),
        },
    ]
}
