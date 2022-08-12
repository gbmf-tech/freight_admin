<template>
    <v-row>
        <v-col cols="12" sm="6">
            <div class="">
                <validation-provider
                    v-slot="{ errors }"
                    name="Business Name"
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
                <label>Address Additional</label>
                <text-field-component
                    v-model="editItem.address2"
                    placeholder="Address Additional"
                />
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
                <label>Email</label>
                <text-field-component
                    v-model="editItem.email"
                    placeholder="Email"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <label>Phone</label>
                <text-field-component
                    v-model="editItem.phone"
                    placeholder="Phone"
                    v-mask="'###-###-####'"
                />
            </div>
        </v-col><v-col cols="12" sm="6">
            <div class="">
                <label>Ext</label>
                <text-field-component
                    v-model="editItem.ext"
                    placeholder="Ext"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <label>Tollfree</label>
                <text-field-component
                    v-model="editItem.tollfree"
                    placeholder="Tollfree"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <label>MC#</label>
                <text-field-component
                    v-model="editItem.mcff"
                    placeholder="MC#"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <label>DOT#</label>
                <text-field-component
                    v-model="editItem.dot"
                    placeholder="DOT#"
                />
            </div>
        </v-col>
        <v-col cols="12" sm="6" v-show="!showzip"></v-col>
        <v-col cols="12" sm="4">
            <v-checkbox v-model="editItem.is_blocked" label="Blocked"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="4">
            <v-checkbox v-model="editItem.is_corporation" label="Corporation"></v-checkbox>
        </v-col>
        <v-col cols="12" sm="4">
            <v-checkbox v-model="editItem.is_factoring" label="Factoring"></v-checkbox>
        </v-col>
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
        showzip: false,
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
        },
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
