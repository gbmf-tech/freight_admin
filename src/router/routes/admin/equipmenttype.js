function page (path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default {
    path: 'equipmenttype',
    name: 'admin.equipmenttype',
    component: page('admin/equipmenttype/main.vue'),
    redirect: {
        name: 'admin.equipmenttype.list'
    },
    children: [
        {
            path: 'list',
            name: 'admin.equipmenttype.list',
            component: page('admin/equipmenttype/list.vue'),
        },
    ]
}
