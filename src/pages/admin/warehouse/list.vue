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
            :posturl="posturl"
            :action="action"
            :disablepagination="disablepagination"
            :editedItem="editedItem"
            ref="dialogdatatable">
            <template v-slot:inputs="{editItem}">
                <warehouse-form :item="editItem" @update="editItem = Object.assign(editItem, $event)"/>
            </template>
        </data-table-default>
    </div>
</template>

<script>
import DataTableDefault from '@/components/Admin/DataTableDefault'
import WarehouseForm from '@/components/page/warehouseForm.vue'

export default {
    layout: 'admin',
    middleware: 'auth',
    components: {
        DataTableDefault,
        WarehouseForm
    },
    data: () => ({
        title: 'Items',
        subtitle: 'All Items',
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Address', value: 'address' },
            { text: 'City', value: 'city' },
            { text: 'Status', value: 'is_active'},
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
            id_city: null,
            city: null,
            zip: null,
            state: null,
            appointments: 0,
        },
        geturl: null,
        actionroute: 'admin.warehouse.',
        action: ['edit', 'delete'],
        disablepagination: true,
        posturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/warehouses/v1/warehouse/',
        appointments: [
            { key: 0, name: 'No' },
            { key: 1, name: 'Yes' },
        ]
    }),
    metaInfo () {
        return {
            title: 'Shipper List'
        }
    },
    methods: {
        setUrl(type = null){
            this.geturl = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/warehouses/v1/warehouse/';

            if(type)
                return this.geturl += 'type/' + type;

            if(this.$route.params.type)
                this.geturl += 'type/' + this.$route.params.type;
        },
        setCity(val){
            this.$refs.dialogdatatable.setCity(val);
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.setUrl(to.params.type);
        this.$refs.dialogdatatable.initialize(
            this.setUrl(to.params.type)
        );
        next()
    },
    created() {
        this.setUrl()
    },
    mounted(){
        this.$store.dispatch('title/setTitle', {title: this.title});
        this.$store.dispatch('title/setSubTitle', {cardtitle: this.subtitle});
    }
}
</script>
