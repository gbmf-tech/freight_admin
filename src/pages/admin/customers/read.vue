<template>
    <v-row>
        <v-col cols="12" md="2">
            <v-card tile >
                <v-list>
                    <v-subheader>Driver Details</v-subheader>
                    <v-list-item-group color="primary">
                        <v-list-item
                            v-for="(itm, key) in menu"
                            :key="key"
                            :to="{ name: itm.to }"
                        >
                            <v-list-item-icon>
                                <v-icon v-text="itm.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="itm.name"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-col>
        <v-col cols="12" md="10">
            <router-view :model="Driver" />
        </v-col>
    </v-row>
</template>

<script>
export default{
    data: () => ({
        Driver: {},
        menu: [
            { icon: 'mdi-view-dashboard', name: 'Dashboard', to: 'admin.customers.read.dashboard' },
            { icon: 'mdi-state-machine', name: 'Loads', to: 'admin.customers.read.loads' },
            { icon: 'mdi-account-edit-outline', name: 'Profile', to: 'admin.customers.read.profile' },
        ],
    }),
    created() {
        this.getDriver();
    },
    methods: {
        getDriver(){
            var api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/drivers/v1/driver/';
            this.axios
                .get(api + this.$route.params.id).then(response => {
                    this.Driver = response.data;
                });
        }
    }
}
</script>
