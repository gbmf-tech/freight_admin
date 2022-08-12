function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'loadstatus',
    name: 'admin.loadstatus',
    component: page('admin/loadstatus/main.vue'),
    redirect: {
        name: 'admin.loadstatus.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.loadstatus.list',
            component: page('admin/loadstatus/list.vue'),
        },
    ]
}
