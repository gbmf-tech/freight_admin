function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'carrierequipment',
    name: 'admin.carrierequipment',
    component: page('admin/carrierequipment/main.vue'),
    redirect: {
        name: 'admin.carrierequipment.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.carrierequipment.list',
            component: page('admin/carrierequipment/list.vue'),
        },
    ]
}
