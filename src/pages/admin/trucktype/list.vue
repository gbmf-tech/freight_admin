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
            dialogwidth="500"
            ref="dialogdatatable">
            <template v-slot:inputs="editItem">
                <v-col cols="12">
                    <div class="">
                        <label>Name</label>
                        <text-field-component
                            v-model="editItem.editItem.name"
                            placeholder="Name"
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="6">
                    <div class="">
                        <label>Min Price/Mile</label>
                        <text-field-component
                            v-model="editItem.editItem.mile_price_min"
                            placeholder="Min Price/Mile"
                        />
                    </div>
                </v-col>
                <v-col cols="12" sm="6">
                    <div class="">
                        <label>Max Price/Mile</label>
                        <text-field-component
                            v-model="editItem.editItem.mile_price_max"
                            placeholder="Max Price/Mile"
                        />
                    </div>
                </v-col>
            </template>
        </data-table-default>
    </div>
</template>

<script>
import TextFieldComponent from '@/components/Base/CustomTextField'

export default {
    layout: 'admin',
    middleware: 'auth',
    components: {
        DataTableDefault: () => import('@/components/Admin/DataTableDefault'),
        TextFieldComponent
    },
    data: () => ({
        title: 'Truck Types',
        subtitle: 'All Items',
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Min Price/Mile', value: 'mile_price_min' },
            { text: 'Max Price/Mile', value: 'mile_price_max' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
            name: '',
            mile_price_min: 0,
            mile_price_max: 0,
        },
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/trucktypes/v1/trucktype/',
        actionroute: 'admin.trucktype.',
        action: ['edit', 'delete'],
        disablepagination: true,

    }),
    mounted(){
        this.$store.dispatch('title/setTitle', {title: this.title});
        this.$store.dispatch('title/setSubTitle', {cardtitle: this.subtitle});
    }
}
</script>
