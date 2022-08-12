<template>
    <v-row>
        <v-col cols="12" sm="6">
            <div class="">
                <validation-provider
                    v-slot="{ errors }"
                    name="editItem.name"
                    rules="required"
                >
                    <label>Business Name *</label>
                    <text-field-component
                        v-model="editItem.name"
                        :error-messages="errors"
                        placeholder="Business Name"
                        required
                    />
                </validation-provider>
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <validation-provider
                    v-slot="{ errors }"
                    name="editItem.address"
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
                <validation-provider
                    v-slot="{ errors }"
                    name="City"
                    rules="required"
                >
                    <div class="d-flex justify-space-between">
                        <label>City or Zip *</label>
                        <span v-show="!showzip" class="pointer text--blue" @click="showzip = true">Fix Zip</span>
                    </div>
                    <city-autocomplete @setCity="setCity"/>
                    <text-field-component
                        v-model="editItem.id_city"
                        placeholder="Contact Name"
                        class="d-none"
                        required
                    />
                </validation-provider>
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
            <div class="">
                <label>Contact Name</label>
                <text-field-component
                    v-model="editItem.contact_name"
                    placeholder="Contact Name"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <label>Contact Phone</label>
                <text-field-component
                    v-model="editItem.contact_phone1"
                    placeholder="Contact Phone"
                    v-mask="'###-###-####'"
                    type="phone"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <label>Contact Email</label>
                <text-field-component
                    v-model="editItem.contact_email"
                    placeholder="Contact Email"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <label>Tollfree</label>
                <text-field-component
                    v-model="editItem.contact_tollfree"
                    placeholder="Tollfree"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <label>Hours</label>
                <text-field-component
                    v-model="editItem.contact_hours"
                    placeholder="Hours"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <label for="">Appointments</label>
            <v-select
                v-model="editItem.appointments"
                :items="appointments"
                item-value="key"
                item-text="name"
                background-color="silver"
                outlined
                flat
                hide-details
                class="mt-2"
            >
            </v-select>
            <!-- <v-text-field v-model="editItem.appointments" label="Appointments"></v-text-field> -->
        </v-col>
        <v-col v-if="showzip == false" cols="12" sm="4"></v-col>
        <v-col cols="12" sm="4">
            <v-checkbox v-model="editItem.is_active" label="Active"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="4">
            <v-checkbox v-model="editItem.is_shipper" label="Shipper"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="4">
            <v-checkbox v-model="editItem.is_consignee" label="Consignee"></v-checkbox>
        </v-col>
    </v-row>
</template>

<script>
import { required, digits, email} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

import TextFieldComponent from '@/components/Base/CustomTextField'
import CityAutocomplete from '@/components/Base/CityFind'

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
})

export default {
    props: ['item'],
    components: {
        CityAutocomplete,
        TextFieldComponent,
        ValidationProvider
    },
    data: () => ({
        showzip: false,
        editItem: {},
        appointments: [
            { key: 0, name: 'No' },
            { key: 1, name: 'Yes' },
        ]
    }),
    created: function () {

        this.$watch('editItem', this.emitData, {
            deep: true
        })
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
            this.editItem.zip = val.address.postalCode
            this.editItem.state = val.address.stateCode
        },
        setItems(){
            if(this.item)
                this.editItem = this.item;
        }
    }
}
</script>
