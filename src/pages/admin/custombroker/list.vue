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
            :editedItem="editedItem"
            ref="dialogdatatable">
            <template v-slot:inputs="editItem">
                <broker-form :item="editItem" @update="editItem = Object.assign(editItem, $event)"/>
            </template>
        </data-table-default>
    </div>
</template>

<script>
import DataTableDefault from '@/components/Admin/DataTableDefault'
import BrokerForm from '@/components/page/brokerForm.vue'

export default {
    layout: 'admin',
    middleware: 'auth',
    components: {
        DataTableDefault,
        BrokerForm
    },
    data: () => ({
        title: 'Custom Broker',
        subtitle: 'All Items',
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Crossing', value: 'crossing' },
            { text: 'Phone', value: 'phone' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
            name: '',
            mile_price_min: 0,
            mile_price_max: 0,
        },
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/custombrokers/v1/custombroker/',
        actionroute: 'admin.custombrokers.',
        action: ['edit', 'delete'],
        disablepagination: true,

    }),
    mounted(){
        this.$store.dispatch('title/setTitle', {title: this.title});
        this.$store.dispatch('title/setSubTitle', {cardtitle: this.subtitle});
    }
}
</script>
