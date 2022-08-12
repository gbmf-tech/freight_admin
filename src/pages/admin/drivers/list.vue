<template>
    <div class="">
        <div class="px-8 pt-8">
            <div class="d-flex justify-space-between">
                <div class="cardtitle text-22-60" v-html="subtitle"></div>
                <v-btn large color="primary" class="ma-0 py-2" @click="$refs.dialogdatatable.dialogchange()" depressed>Add Driver</v-btn>
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
                <driver-form :item="editItem" @update="editItem = Object.assign(editItem, $event)"/>
            </template>
        </data-table-default>
    </div>
</template>

<script>
import DataTableDefault from '@/components/Admin/DataTableDefault'
import DriverForm from '@/components/page/driverForm.vue'

export default {
    layout: 'admin',
    middleware: 'auth',
    components: {
        DataTableDefault,
        DriverForm
    },
    data: () => ({
        title: 'Drivers',
        subtitle: 'Drivers',
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Status', value: 'status.status' },
            { text: 'Phone', value: 'phone' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
            id: null,
            is_team: 0,
            id_driver_team: null,
            is_active: 1,
            driver: null,
            id_city: null,
            city: null,
            zip: null,
            state: null
        },
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/drivers/v1/driver/',
        actionroute: 'admin.drivers.',
        action: ['edit', 'delete'],
        disablepagination: true,
        drivertypes: [
            {key: 0, name: 'Single'},
            {key: 1, name: 'Team'}
        ],
        Driver: {
            loading:false,
            items: [],
            searchInput: '',
        },
        active: [
            {key: 1, name: 'Active'},
            {key: 0, name: 'Disabled'}
        ],
        status: [],
        tempItem: null,
        modal_date_birth: false,
        modal_date_license_exp: false,
        modal_date_medical: false,
        modal_date_next_medical: false,
        modal_date_drug: false,
        modal_date_next_drug: false,
        modal_date_passport: false,
        modal_date_hire: false,
        modal_date_passport: false,
        modal_date_fastcard_exp: false,
    }),
    watch: {
        'Driver.searchInput' (val) {
            if(val) {
                this.Driver.loading = true;
                this.getDrivers(val);
            }
        },
    },
    created(){
        this.getStatuses();
    },
    mounted(){
        this.$store.dispatch('title/setTitle', {title: this.title});
        this.$store.dispatch('title/setSubTitle', {cardtitle: this.subtitle});
    },
    methods: {
        filterDrivers: function(item, queryText, itemText) {
            return (
                item.id != this.tempItem.id && (
                    item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1 ||
                    item.phone.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1 ||
                    item.email.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1 ||
                    item.address.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
                )
            );
        },

        setCity(val){
            this.$refs.dialogdatatable.setCity(val);
        },

        async getDrivers(search){
            var api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/drivers/v1/driver/';
            if(search)
                api += 'search-team/' + search;
            await this.axios
                .get(api).then(response => {
                    this.Driver.customers = response.data;
                    this.Driver.loading = false;
                });
        },

        async getStatuses(){
            var api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/driverstatuses/v1/driverstatus/';
            await this.axios
                .get(api).then(response => {
                    this.status = response.data;
                });
        },

        setCurrent(item){
            this.tempItem = item;
        },
        unpairDriver(item){
            item.is_team = this.editedItem.is_team;
            return item;
        }
    }
}
</script>
