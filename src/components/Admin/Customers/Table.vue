<template>
    <v-data-table :headers="headers" :items="items" item-key="id" class="elevation-1">
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="showItem(item)">mdi-eye</v-icon>
            <!-- <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
        </template>
    </v-data-table>
</template>
<script>
    export default {
        name: 'CustomersTable',
        data: function(){
            return {
                loading: true,
                item: [],
                headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'Customer', value: 'customer.name' },
                    { text: 'Driver', value: 'driver.intern_name' },
                    { text: 'From', value: 'from_city' },
                    { text: 'To', value: 'to_city' },
                    { text: 'Status', value: 'status.name' },
                    { text: 'Updated', value: 'updated_at' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
            }
        },
        methods: {
            showItem(item){
                this.$router.push({ name: this.actionroute, params: {id: item.id} })
            },
            async getList(){
                await this.axios
                    .get(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/customers/v1/customer/').then(response => {
                        this.loading = false;
                        this.items = response
                    });
            }
        },
        mounted: function(){
            this.getList();
        }

    }
</script>
