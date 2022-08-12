<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.name" label="Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.email" label="Email"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.phone" label="Phone"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.address" label="Address"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.address2" label="Address Additional"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.address3" label="Address Additional"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.id_city" label="City"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.zip" label="Zip"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.billing_address" label="Billing Address"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.billing_address2" label="Billing Address Additional"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.billing_address3" label="Billing Address Additional"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.billing_id_city" label="Billing City"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.billing_zip" label="Billing Zip"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.fmcsa" label="fmcsa"></v-text-field>
                        </v-col><v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedLocal.fmcsa_value" label="Value"></v-text-field>
                        </v-col>>
                        <v-col cols="12" sm="6" md="4">
                            <v-checkbox v-model="editedLocal.is_active" label="Is Active"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-checkbox v-model="editedLocal.is_brocker" label="Is Brocker"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-checkbox v-model="editedLocal.is_blocked" label="Is Blocked"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-checkbox v-model="editedLocal.is_company"  label="Is Company"></v-checkbox>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['dialog'],

    data() {
        return{
            editedLocal: {
                is_company: true
            },
        }
    },
    methods: {
        save () {
            this.axios.post(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/customers/v1/customer/', this.editedLocal);
            this.close()
        },
        close () {
            this.$nextTick(() => {
                this.editedLocal = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.$emit('dialogClose', false)
            })
        },
    }
}
</script>
