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
                <v-tabs v-model="tab" background-color="bg-transparent">
                    <v-tab v-for="item in tabs" :key="item.tab" >
                        {{ item.tab }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item :key="'General'">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <div class="">
                                    <label>Truck Number</label>
                                    <text-field-component
                                        v-model="editItem.editItem.number"
                                        placeholder="Truck Number"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="">
                                    <label>License Plate</label>
                                    <text-field-component
                                        v-model="editItem.editItem.license"
                                        placeholder="License Plate"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Plate Expiry</label>
                                <datepicker-component @setDate="editItem.editItem.plate_exp = $event.date"/>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Inspection Expiry</label>
                                <datepicker-component @setDate="editItem.editItem.inspection_exp = $event.date"/>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select
                                    v-model="editItem.editItem.id_type"
                                    label="Truck Type"
                                    :items="trucktypes"
                                    item-value="id"
                                    item-text="name"
                                    background-color="silver"
                                    outlined
                                    flat
                                    hide-details
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select
                                    v-model="editItem.editItem.is_active"
                                    label="Status"
                                    :items="status"
                                    item-value="id"
                                    item-text="name"
                                    background-color="silver"
                                    outlined
                                    flat
                                    hide-details
                                ></v-select>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <v-radio-group row v-model="editItem.editItem.owner_company" label="Ownership" class="justify-center">
                                    <v-radio
                                        :key="1"
                                        label="Company Truck"
                                        :value="1"
                                        class="ml-5">
                                    </v-radio>
                                    <v-radio
                                        :key="0"
                                        label="Independent Contractor"
                                        :value="0">
                                    </v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab-item :key="'IFTA Form'">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <div class="">
                                    <label>Mileage</label>
                                    <text-field-component
                                        v-model="editItem.editItem.mileage"
                                        placeholder="Mileage"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="">
                                    <label>Axies</label>
                                    <text-field-component
                                        v-model="editItem.editItem.axies"
                                        placeholder="Axies"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="">
                                    <label>Year</label>
                                    <text-field-component
                                        v-model="editItem.editItem.year"
                                        placeholder="Year"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="">
                                    <label>Fuel Type</label>
                                    <text-field-component
                                        v-model="editItem.editItem.fuel"
                                        placeholder="Fuel Type"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="">
                                    <label>Vehicle Identification Number</label>
                                    <text-field-component
                                        v-model="editItem.editItem.vin"
                                        placeholder="Vehicle Identification Number"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="">
                                    <label>Insurance Policy Number</label>
                                    <text-field-component
                                        v-model="editItem.editItem.insurance"
                                        placeholder="Insurance Policy Number"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="">
                                    <label>Empty / Gross Weight</label>
                                    <text-field-component
                                        v-model="editItem.editItem.weight"
                                        placeholder="Empty / Gross Weight"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>DOT Expiry Date</label>
                                <datepicker-component @setDate="editItem.editItem.dot_exp = $event.date"/>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                </v-tabs-items>
            </template>
        </data-table-default>
    </div>
</template>

<script>
import DatepickerComponent from '@/components/Base/CustomDatepicker'
import TextFieldComponent from '@/components/Base/CustomTextField'

export default {
    layout: 'admin',
    middleware: 'auth',
    components: {
        DataTableDefault: () => import('@/components/Admin/DataTableDefault'),
        DatepickerComponent,
        TextFieldComponent
    },
    data: () => ({
        title: 'Trucks',
        subtitle: 'All Trucks',
        headers: [
            { text: 'Truck Number', value: 'number' },
            { text: 'Truck Type', value: 'type.name'},
            { text: 'License', value: 'license' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
        },
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/trucks/v1/truck/',
        actionroute: 'admin.truck.',
        action: ['edit', 'delete'],
        disablepagination: true,
        trucktypes: [],
        status: [
            {id: 1, name: 'Active'},
            {id: 0, name: 'Inactive'}
        ],
        tabs: [
            {tab: 'General'},
            {tab: 'IFTA Form'}
        ],
        tab: null,
        modal_plate_exp: false,
        modal_inspection_exp: false,
        modal_dot_exp: false,
    }),
    created() {
        this.getTruckTypes();
    },
    methods: {
        getTruckTypes(){
            this.axios
                .get(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/trucktypes/v1/trucktype').then(response => {
                    if(response.data)
                        this.trucktypes = response.data
                });
        }
    },
    mounted(){
        this.$store.dispatch('title/setTitle', {title: this.title});
        this.$store.dispatch('title/setSubTitle', {cardtitle: this.subtitle});
    }
}
</script>
