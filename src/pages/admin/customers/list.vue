<template>
    <div class="">
        <div class="px-8 pt-8">
            <div class="d-flex justify-space-between">
                <div class="cardtitle text-22-60" v-html="subtitle"></div>
                <v-btn large color="primary" class="ma-0 py-2" @click="$refs.dialogdatatable.dialogchange()" depressed>Add Customer</v-btn>
            </div>
        </div>
        <data-table-default
            :headers="headers"
            :geturl="geturl"
            :action="action"
            :actionroute="actionroute"
            :disablepagination="disablepagination"
            :editedItem="editedItem"
            ref="dialogdatatable">
            <template v-slot:inputs="{editItem}">
                <customer-form :item="editItem" @update="editItem = Object.assign(editItem, $event)"/>
            </template>
        </data-table-default>
    </div>
</template>

<script>
import DataTableDefault from '@/components/Admin/DataTableDefault'
import CustomerForm from '@/components/page/customerForm.vue'

export default {
    layout: 'admin',
    middleware: 'auth',
    components: {
        DataTableDefault,
        CustomerForm
    },
    data: () => ({
        title: 'Customers',
        subtitle: 'Customers',
        headers: [
            { text: 'Company', value: 'company_name' },
            { text: 'Email', value: 'email' },
            { text: 'Name', value: 'name' },
            { text: 'Phone', value: 'phone' },
            { text: 'Address', value: 'address' },
            { text: 'City', value: 'city' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
            id_city: null,
            city: null,
            zip: null,
            state: null,
            is_company: true
        },
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/customers/v1/customer/',
        actionroute: 'admin.customers.',
        action: [
            // 'show',
            'edit',
            'delete'
        ],
        disablepagination: true,

    }),
    mounted(){
        this.$store.dispatch('title/setTitle', {title: this.title});
        this.$store.dispatch('title/setSubTitle', {cardtitle: this.subtitle});
    },
    methods: {
        setCity(val){
            this.$refs.dialogdatatable.setCity(val);
        },
        update(val, parent){
            parent = val;
        }
    }
}
</script>
