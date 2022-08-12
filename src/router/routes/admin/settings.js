function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'Settings',
    name: 'admin.settings',
    component: page('admin/settings/main.vue'),
    redirect: {
        name: 'admin.settings.general'
    },
    children: [
        {
            path: 'general',
            name: 'admin.settings.general',
            component: page('admin/settings/general.vue')
        },
        {
            path: 'shipments',
            name: 'admin.settings.shipments',
            component: page('admin/settings/shipments.vue')
        },
        {
            path: 'customers',
            name: 'admin.settings.customers',
            component: page('admin/settings/customers.vue')
        },
        {
            path: 'drivers',
            name: 'admin.settings.drivers',
            component: page('admin/settings/drivers.vue')
        },
    ]
}
