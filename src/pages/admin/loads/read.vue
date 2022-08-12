<template>
    <v-row>
        <v-col cols="12" md="12">
            <router-view v-show="loaded" :model="Load" />
        </v-col>
    </v-row>
</template>

<script>
export default {
    data: () => ({
        loaded: false,
        Load: {},
        menu: [
            { icon: 'mdi-view-dashboard', name: 'Dashboard', to: 'admin.drivers.read.dashboard' },
            { icon: 'mdi-state-machine', name: 'Loads', to: 'admin.drivers.read.loads' },
            { icon: 'mdi-account-edit-outline', name: 'Profile', to: 'admin.drivers.read.profile' },
            { icon: 'mdi-map-marker', name: 'Location', to: 'admin.drivers.read.location' },
        ],
    }),
    created() {
        this.getLoad();
    },
    methods: {
        async getLoad(){
            var api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/loads/v1/load/';
            await this.axios
                .get(api + this.$route.params.id).then(response => {
                    this.Load = response.data;
                    this.Load.from_city = {};
                    this.Load.to_city = {};
                    this.loaded = true;
                    response.data.items.filter((item) => {
                        if(item.is_shipper){
                            this.Load.from_city[item.warehouse.id_city] = item.warehouse.city
                        }else{
                            this.Load.to_city[item.warehouse.id_city] = item.warehouse.city
                        }
                    })
                });
        }
    }
}
</script>
