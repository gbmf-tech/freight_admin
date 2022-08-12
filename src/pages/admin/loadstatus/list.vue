<template>
    <data-table-default
        :headers="headers"
        :geturl="geturl"
        :action="action"
        :disablepagination="disablepagination"
        :editedItem="editedItem">
        <template v-slot:inputs="editItem">
            <v-col cols="12">
                <v-text-field v-model="editItem.editItem.name" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="editItem.editItem.is_active" label="Status For Active Load"></v-text-field>
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
        },
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/loadstatus/v1/loadstatus/',
        actionroute: 'admin.loadstatus.',
        action: ['edit', 'delete'],
        disablepagination: true,

    }),
}
</script>
