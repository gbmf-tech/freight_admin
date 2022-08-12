<template>
    <v-row>
        <v-col cols="12" sm="12">
            <div class="">
                <validation-provider
                    v-slot="{ errors }"
                    name="Company Name"
                    rules="required"
                >
                    <label>Company Name *</label>
                    <text-field-component
                        v-model="editItem.company_name"
                        :error-messages="errors"
                        placeholder="Company Name"
                        required
                    />
                </validation-provider>
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <label>First Name</label>
                <text-field-component
                    v-model="editItem.first_name"
                    placeholder="First Name"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <label>Last Name</label>
                <text-field-component
                    v-model="editItem.last_name"
                    placeholder="Last Name"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <validation-provider
                    v-slot="{ errors }"
                    name="Email"
                    rules="email"
                >
                    <label>Email</label>
                    <text-field-component
                        v-model="editItem.email"
                        :error-messages="errors"
                        placeholder="Email"

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
                        :error-messages="errors"
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
                <label>City</label>
                <city-autocomplete @setCity="setCity"/>
            </div>
        </v-col>
        <v-col cols="12" sm="6">
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
                <label>MC# or DOT#</label>
                <text-field-component
                    v-model="editItem.fmcsa_value"
                    placeholder="MC# or DOT#"
                />
            </div>
        </v-col>
        <!-- <v-col cols="12" sm="3"><v-checkbox v-model="editItem.is_active" label="Active"></v-checkbox></v-col>
        <v-col cols="12" sm="3"><v-checkbox v-model="editItem.is_brocker" label="Is Brocker"></v-checkbox></v-col>
        <v-col cols="12" sm="3"><v-checkbox v-model="editItem.is_blocked" label="Is Blocked"></v-checkbox></v-col>
        <v-col cols="12" sm="3"><v-checkbox v-model="editItem.is_company"  label="Is Company"></v-checkbox></v-col> -->
        <v-col cols="12" sm="3"><v-checkbox v-model="editItem.is_shipper" label="Shipper"></v-checkbox></v-col>
        <v-col cols="12" sm="3"><v-checkbox v-model="editItem.is_forwarder" label="Forwarder"></v-checkbox></v-col>
        <v-col cols="12" sm="3"><v-checkbox v-model="editItem.is_brocker" label="Broker"></v-checkbox></v-col>
        <v-col cols="12" sm="3"><v-checkbox v-model="editItem.is_person"  label="Person"></v-checkbox></v-col>
    </v-row>
</template>

<script>
import { required, digits, email} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

import CityAutocomplete from '@/components/Base/CityFind'
import TextFieldComponent from '@/components/Base/CustomTextField'

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
})
extend('email', {
    ...email,
    message: 'Email must be valid',
})

export default {
    props: ['item'],
    components: {
        CityAutocomplete,
        TextFieldComponent,
        ValidationProvider
    },
    data: () => ({
        editItem: {},
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
            this.editItem.zip = val.address.stateCode + ', ' + val.address.postalCode
            this.editItem.state = val.address.stateCode
        },
        setItems(){
            if(this.item)
                this.editItem = this.item;
        }
    }
}
</script>
