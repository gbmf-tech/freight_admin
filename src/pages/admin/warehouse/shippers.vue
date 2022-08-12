<template>
    <div class="">
        <div class="px-8 pt-8">
            <div class="d-flex justify-space-between">
                <div class="cardtitle text-22-60" v-html="subtitle"></div>
                <v-btn large color="primary" class="mb-2 py-2" @click="$refs.dialogdatatable.dialogchange()" depressed>New Item</v-btn>
            </div>
        </div>
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
    </div>
</template>

<script>
export default {
    layout: 'admin',
    middleware: 'auth',
    components: {
        DataTableDefault: () => import('@/components/Admin/DataTableDefault'),
    },
    data: () => ({
        title: 'Shippers',
        subtitle: 'All Items',
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
            name: '',
        },
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/warehouses/v1/warehouse/type/shipper',
        actionroute: 'admin.warehouse.',
        action: ['edit', 'delete'],
        disablepagination: true,

    }),
    metaInfo () {
        return {
            title: 'Shipper List'
        }
    }
}
</script>
