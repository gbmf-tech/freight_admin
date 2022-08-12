function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'user',
    name: 'admin.user',
    component: page('admin/user/main.vue'),
    redirect: {
        name: 'admin.user.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.user.list',
            component: page('admin/user/list.vue'),
        },
    ]
}
