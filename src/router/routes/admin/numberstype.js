function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'numberstype',
    name: 'admin.numberstype',
    component: page('admin/numberstype/main.vue'),
    redirect: {
        name: 'admin.numberstype.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.numberstype.list',
            component: page('admin/numberstype/list.vue'),
        },
    ]
}
