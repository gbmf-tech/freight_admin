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
                        placeholder="Business Name"
                        required
                    />
                </validation-provider>
            </div>
        </v-col>
        <v-col cols="12" sm="6">
            <div class="">
                <label>Crossing</label>
                <text-field-component
                    v-model="editItem.crossing"
                    placeholder="Crossing"
                />
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
                    />
                </validation-provider>
            </div>
        </v-col>
        <v-col cols="12" sm="6">
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
                <label>Fax</label>
                <text-field-component
                    v-model="editItem.fax"
                    placeholder="Fax"
                />
            </div>
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
