<template>
    <data-table-default
        :headers="headers"
        :geturl="geturl"
        :action="action"
        :disablepagination="disablepagination"
        :editedItem="editedItem">
        <template v-slot:inputs="editItem">
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.status" label="Name"></v-text-field>
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
            { text: 'Name', value: 'status' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
        },
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/loadwos/v1/loadwo/',
        actionroute: 'admin.loadwo.',
        action: ['edit', 'delete'],
        disablepagination: true,

    }),
}
</script>
