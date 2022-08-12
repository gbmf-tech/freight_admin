<template>
    <data-table-default
        :headers="headers"
        :geturl="geturl"
        :action="action"
        :disablepagination="disablepagination"
        :editedItem="editedItem">
        <template v-slot:inputs="editItem">
            <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="editItem.editItem.name" label="Name"></v-text-field>
            </v-col>
        </template>
    </data-table-default>
</template>

<script>
export default {
    layout: 'admin',
    middleware: 'auth',
    components: {
        DataTableDefault: () => import('@/components/Admin/DataTableDefault'),
    },
    data: () => ({
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
            name: '',
        },
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/warehouses/v1/warehouse/type/consignee',
        actionroute: 'admin.warehouse.',
        action: ['edit', 'delete'],
        disablepagination: true,

    }),
    metaInfo () {
        return {
            title: 'Consignee List'
        }
    }
}
</script>
