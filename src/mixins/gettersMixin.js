export default {
    methods: {
        async getBroker(val){
            var api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/custombrokers/v1/custombroker/';
            if(val)
                api += 'search/' + val;
            await this.axios
                .get(api).then(response => {
                    this.Custom.brokers = response.data;
                    this.Custom.loading = false;

                });
        },

        async getWarehouse(val, type){
            var api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/warehouses/v1/warehouse/';
            if(val){
                api += 'search/' + val;
                if(type)
                    api += '/' + type;
            }
            await this.axios
                .get(api).then(response => {
                    this.Shipper.shippers = response.data;
                    this.Shipper.loading = false;

                });
        },

        async getEquipments(){
            await this.axios
                .get(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/equipmenttypes/v1/equipmenttype').then(response => {
                    this.equipments = response.data;
                });
        },

        async getDispatchers(){
            await this.axios
                .get(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/users/v1/user/dispatchers').then(response => {
                    this.dispatchers = response.data;
                });
        },

        async getTrucks(){
            var api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/trucks/v1/truck/';
            await this.axios
                .get(api).then(response => {
                    this.trucks = response.data;
                });
        },

        async getTrailers(){
            var api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/trailers/v1/trailer/';
            await this.axios
                .get(api).then(response => {
                    this.trailers = response.data;
                });
        },

        async getExecutor(val){
            var api;
            if(this.Load.is_carrier == false)
                api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/drivers/v1/driver/';
            if(this.Load.is_carrier == true)
                api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/carriers/v1/carrier/';

            if(val)
                api += 'search/'+ val;

            await this.axios
                .get(api).then(response => {
                    this.Executor.items = response.data;
                    this.Executor.loading = false;

                });
        },

        async getTypes(){
            var api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/loads/v1/types/';
            await this.axios
                .get(api).then(response => {
                    this.types = response.data;
                });
        },

        async getStatuses(){
            var api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/loads/v1/status/';

            await this.axios
                .get(api).then(response => {
                    this.statuses = Object.values(response.data);
                }).catch(error => {
                    console.log(error)
                });
        },

        async getCustomers(val){
            var api = process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/customers/v1/customer/';
            if(val)
                api += 'search/' + val;
            await this.axios
                .get(api).then(response => {
                    this.Customer.items = response.data;
                    this.Customer.loading = false;
                });
        },
    }
}
