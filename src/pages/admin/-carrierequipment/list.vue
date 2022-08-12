<template>
    <data-table-default
        :headers="headers"
        :geturl="geturl"
        :action="action"
        :disablepagination="disablepagination"
        :editedItem="editedItem">
        <template v-slot:inputs="editItem">
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.name" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.address" label="Address"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.address2" label="Address Additional"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.address3" label="Address Additional"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.id_city" label="City"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.zip" label="Zip"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.contact_name" label="Contact Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.email" label="Email"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.phone" label="Phone"></v-text-field>
            </v-col><v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.ext" label="Ext"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.tollfree" label="Tollfree"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.payment_terms" label="Payment Terms"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.mcff" label="MCFF"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editItem.editItem.dot" label="Dot"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-checkbox v-model="editItem.editItem.is_blocked" label="Is Blocked"></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-checkbox v-model="editItem.editItem.is_corporation" label="Is Corporation"></v-checkbox>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-checkbox v-model="editItem.editItem.is_factoring" label="Is Factoring"></v-checkbox>
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
            { text: 'UID', value: 'uid' },
            { text: 'Name', value: 'name' },
            { text: 'Address', value: 'address' },
            { text: 'City', value: 'id_city' },
            { text: 'Contact Name', value: 'contact_name' },
            { text: 'Phone', value: 'phone' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
            name: '',
            mile_price_min: 0,
            mile_price_max: 0,
        },
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/carriers/v1/carrier/',
        actionroute: 'admin.carriers.',
        action: ['edit', 'delete'],
        disablepagination: true,

    }),
}
</script>
