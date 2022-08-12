<template>
    <v-row>
        <v-col cols="12" sm="6">
            <div class="">
                <validation-provider
                    v-slot="{ errors }"
                    name="First Name"
                    rules="required"
                >
                    <label>First Name *</label>
                    <text-field-component
                        v-model="editItem.first_name"
                        :error-messages="errors"
                        placeholder="First Name"
                        required
                    />
                </validation-provider>
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <validation-provider
                    v-slot="{ errors }"
                    name="Last Name"
                    rules="required"
                >
                    <label>Last Name *</label>
                    <text-field-component
                        v-model="editItem.last_name"
                        :error-messages="errors"
                        placeholder="Last Name"
                        required
                    />
                </validation-provider>
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <validation-provider
                    v-slot="{ errors }"
                    name="Email"
                    rules="required|email"
                >
                    <label>Email *</label>
                    <text-field-component
                        v-model="editItem.email"
                        :error-messages="errors"
                        placeholder="Email"
                        required
                    />
                </validation-provider>
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <validation-provider
                    v-slot="{ errors }"
                    name="Phone"
                    rules="required"
                >
                    <label>Phone *</label>
                    <text-field-component
                        v-model="editItem.phone"
                        placeholder="Phone"
                        v-mask="'###-###-####'"
                        type="phone"
                        required
                    />
                </validation-provider>
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <label>Phone Additional</label>
                <text-field-component
                    v-model="editItem.phone2"
                    placeholder="Phone Additional"
                    v-mask="'###-###-####'"
                    type="phone"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <validation-provider
                    v-slot="{ errors }"
                    name="Address"
                    rules="required"
                >
                    <label>Address *</label>
                    <text-field-component
                        v-model="editItem.address"
                        :error-messages="errors"
                        placeholder="Address"
                        required
                    />
                </validation-provider>
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <div class="d-flex justify-space-between">
                    <label>City or Zip</label>
                    <span v-show="!showzip" class="pointer text--blue" @click="showzip = true">Fix Zip</span>
                </div>
                <city-autocomplete @setCity="setCity"/>
            </div>
        </v-col>
        <v-col cols="12" sm="6" v-show="showzip">
            <div class="">
                <label>Zip</label>
                <text-field-component
                    v-model="editItem.zip"
                    placeholder="Zip"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <label>Date of Birth</label>
            <datepicker-component @setDate="editItem.date_birth = $event.date"/>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <label>License No.</label>
                <text-field-component
                    v-model="editItem.license"
                    placeholder="License No."
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <label>License Exp. Date</label>
            <datepicker-component @setDate="editItem.date_license_exp = $event.date"/>
        </v-col>
        <v-col cols="12" sm="6">
            <label>Last Medical</label>
            <datepicker-component @setDate="editItem.date_medical = $event.date"/>
        </v-col>
        <v-col cols="12" sm="6">
            <label>Next Medical</label>
            <datepicker-component @setDate="editItem.date_next_medical = $event.date"/>
        </v-col>
        <v-col cols="12" sm="6">
            <label>Last Drug Test</label>
            <datepicker-component @setDate="editItem.date_drug = $event.date"/>
        </v-col>
        <v-col cols="12" sm="6">
            <label>Next Drug Test</label>
            <datepicker-component @setDate="editItem.date_next_drug = $event.date"/>
        </v-col>
        <v-col cols="12" sm="6">
            <label>Passport Expiry</label>
            <datepicker-component @setDate="editItem.date_passport = $event.date"/>
        </v-col>
        <v-col cols="12" sm="6">
            <label>Fast Card Expiry</label>
            <datepicker-component @setDate="editItem.date_fastcard_exp = $event.date"/>
        </v-col>
        <v-col cols="12" sm="6">
            <label>Date of Hire</label>
            <datepicker-component @setDate="editItem.date_hire = $event.date"/>
        </v-col>
        <v-col cols="12" sm="6">
            <label for="">Driver Status</label>
            <v-select
                v-model="editItem.id_status"
                :items="status"
                item-text="status"
                item-value="id"
                background-color="silver"
                outlined
                flat
                >
            </v-select>
        </v-col>
        <v-col cols="12" sm="6">
            <label for="">Account Status</label>
            <v-select
                v-model="editItem.is_active"
                :items="active"
                item-text="name"
                item-value="key"
                background-color="silver"
                outlined
                flat
                >
            </v-select>
        </v-col>
    </v-row>
</template>

<script>
import { required, digits, email} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

import CityAutocomplete from '@/components/Base/CityFind'
import DataTableDefault from '@/components/Admin/DataTableDefault'
import DatepickerComponent from '@/components/Base/CustomDatepicker'
import TextFieldComponent from '@/components/Base/CustomTextField'


extend('email', {
    ...email,
    message: 'Email must be valid',
})
extend('required', {
    ...required,
    message: '{_field_} can not be empty',
})

export default {
    props: ['item'],
    components: {
        DataTableDefault,
        CityAutocomplete,
        DatepickerComponent,
        TextFieldComponent,
        ValidationProvider
    },
    data: () => ({
        showzip: false,
        editItem: {},
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
        active: [
            {key: 1, name: 'Active'},
            {key: 0, name: 'Disabled'}
        ],
        status: [],
    }),
    created: function () {
        this.$watch('editItem', this.emitData, {
            deep: true
        })
        this.getStatuses();
    },
    watch: {
        item: function(newVal){
            this.editItem = newVal;
        }
    },
    mounted() {
        this.setItems()
    },
    methods: {
        emitData(){
            this.$emit('update', this.editItem)
        },
        setCity(val){
            this.editItem.city = val.address.city
            this.editItem.id_city = val.id
            this.editItem.zip = val.address.stateCode + ', ' + val.address.postalCode
            this.editItem.state = val.address.stateCode
        },
        setItems(){
            if(this.item)
                this.editItem = this.item;
        },
        async getStatuses(){
            var api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/driverstatuses/v1/driverstatus/';
            await this.axios
                .get(api).then(response => {
                    this.status = response.data;
                });
        },
    }
}
</script>
