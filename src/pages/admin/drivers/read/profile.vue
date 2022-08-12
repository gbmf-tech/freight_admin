<template>
    <v-card :loading="loading">
        <v-card-title class="d-block">
            Profile
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.email" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.phone" label="Phone"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.phone2" label="Phone Additional"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.address" label="Address"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.id_city" label="City"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.zip" label="Zip"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.license" label="License No."></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.date_birth" label="Date of Birth"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.date_medical" label="Last Medical"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.date_drug" label="Last Drug Test"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.date_passport" label="Passport Expiry"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.date_hire" label="Date of Hire"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.date_license_exp" label="License Exp. Date"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.date_next_medical" label="Next Medical"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.date_next_drug" label="Next Drug Test"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.date_fastcard_exp" label="Fast Card Expiry"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="model.date_termination" label="Termination Date"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                            v-model="model.id_status"
                            label="Driver Status"
                            :items="status"
                            item-text="status"
                            item-value="id"
                            >
                        </v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                            v-model="model.is_active"
                            label="Account Status"
                            :items="active"
                            item-text="name"
                            item-value="key"
                            >
                        </v-select>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['model'],
    data: () => ({
        loading: true,
        active: [
            {key: 1, name: 'Active'},
            {key: 0, name: 'Disabled'}
        ],
        status: [],
    }),
    mounted: function(){
        setTimeout(() => {
            this.loading = false;
        }, 2000);
    },
    created(){
        this.getStatuses();
    },
    methods: {
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
