function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'drivertruck',
    name: 'admin.drivertruck',
    component: page('admin/drivertruck/main.vue'),
    redirect: {
        name: 'admin.drivertruck.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.drivertruck.list',
            component: page('admin/drivertruck/list.vue'),
        },
    ]
}
