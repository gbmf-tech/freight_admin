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
                                    <label>Trailer Number</label>
                                    <text-field-component
                                        v-model="editItem.editItem.number"
                                        placeholder="Trailer Number"
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
                                    v-model="editItem.editItem.id_equipment_type"
                                    label="Trailer Type"
                                    :items="trailertypes"
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
                        </v-row>
                    </v-tab-item>
                    <v-tab-item :key="'IFTA Form'">
                        <v-row>
                            <v-col cols="12" sm="4">
                                <div class="">
                                    <label>Model</label>
                                    <text-field-component
                                        v-model="editItem.editItem.model"
                                        placeholder="Model"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <div class="">
                                    <label>Axies</label>
                                    <text-field-component
                                        v-model="editItem.editItem.axies"
                                        placeholder="Axies"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <div class="">
                                    <label>Year</label>
                                    <text-field-component
                                        v-model="editItem.editItem.year"
                                        placeholder="Year"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div class="">
                                    <label>Vehicle Identification Number</label>
                                    <text-field-component
                                        v-model="editItem.editItem.vin"
                                        placeholder="Vehicle Identification Number"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>DOT Expiry Date</label>
                                <datepicker-component @setDate="editItem.editItem.dot_exp = $event.date"/>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Activation Date</label>
                                <datepicker-component @setDate="editItem.editItem.activation_date = $event.date"/>
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
        title: 'Trailers',
        subtitle: 'All Items',
        headers: [
            { text: 'Trailer Number', value: 'number' },
            { text: 'Trailer Type', value: 'type.name'},
            { text: 'License Plate', value: 'license' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
        },
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/trailers/v1/trailer/',
        actionroute: 'admin.trailer.',
        action: ['edit', 'delete'],
        disablepagination: true,
        trailertypes: [],
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
        modal_activation_date: false,
    }),
    created() {
        this.getTrailerTypes();
    },
    methods: {
        getTrailerTypes(){
            this.axios
                .get(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/equipmenttypes/v1/equipmenttype').then(response => {
                    if(response.data)
                        this.trailertypes = response.data
                });
        }
    },
    mounted(){
        this.$store.dispatch('title/setTitle', {title: this.title});
        this.$store.dispatch('title/setSubTitle', {cardtitle: this.subtitle});
    }
}
</script>
