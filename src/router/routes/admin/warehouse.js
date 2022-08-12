function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'warehouse',
    name: 'admin.warehouse',
    component: page('admin/warehouse/main.vue'),
    redirect: {
        name: 'admin.warehouse.list'
    },
    children: [
        {
            path: 'list/:type?',
            name: 'admin.warehouse.list',
            component: page('admin/warehouse/list.vue'),
        },
        // {
        //     path: 'shippers',
        //     name: 'admin.warehouse.shippers',
        //     component: page('admin/warehouse/shippers.vue'),
        // },
        // {
        //     path: 'consignee',
        //     name: 'admin.warehouse.consignee',
        //     component: page('admin/warehouse/consignees.vue'),
        // },
    ]
}
