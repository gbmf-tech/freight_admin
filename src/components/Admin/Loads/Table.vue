<template>
        <v-data-table
            :headers="headers"
            :items="loads"
            :loading="loading"
            item-key="id"
            class="elevation-1"
            :items-per-page="perPage"
            :server-items-length="totalItems"
            :sort-by="'updated_at'"
            :sort-desc="true"
            @update:page="changePage"
            @update:items-per-page="changePageCount"
            @click:row="clickRow"
            :footer-props="{
                itemsPerPageOptions: [100, 250, 500, 1000],
            }"
        >
            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="clickRow(item)"
                >
                    mdi-eye
                </v-icon>

            </template>
        </v-data-table>


</template>

<script>
export default {
    name: 'LoadsTable',
    data: function(){
        return{
            loads: [],
            totalItems: null,
            perPage: 250,
            page: 1,
            loading: true,
            headers: [
                { text: 'Track Number', value: 'sid' },
                { text: 'Customer', value: 'customer.name' },
                { text: 'Driver', value: 'executor.name' },
                { text: 'From', value: 'from_city' },
                { text: 'To', value: 'to_city' },
                { text: 'Status', value: 'status.name' },
                { text: 'Updated', value: 'updated_at' },
                { text: 'Actions', value: 'actions', sortable: false },
            ]
        }
    },
    beforeRouteUpdate (to, from, next) {
        console.log(from);
        this.getList(to.params.slug)
        next()
    },
    methods: {
        async getList(){
            this.loading = true
            let slug = null
            if(!slug){
                if(!this.$route.params.slug){
                    slug = 'all'
                }else{
                    slug = this.$route.params.slug;
                }
            }

            this.loads = [];

            await this.axios
                .get(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/loads/v1/load/', {
                    params: {
                        slug: slug,
                        page: this.page,
                        perpage: this.perPage
                    }
                }).then(response => {
                    this.loads = response.data.data;
                    this.totalItems = response.data.totalItems;
                    this.loading = false;
                    this.loads.forEach((item, i) => {
                        item.from_city = {};
                        item.to_city = {};
                        item.items.filter((items) => {
                            if(items.is_shipper == 1){
                                item.from_city['id_city'] = items.warehouse.city
                            }else{
                                item.to_city['id_city'] = items.warehouse.city
                            }
                        })
                        item.from_city = Object.values(item.from_city)
                        item.to_city = Object.values(item.to_city)
                    });

                });
        },
        changePage(pagination){
            this.page = pagination;
            this.getList()
        },
        changePageCount(count){
            this.perPage = count;
            this.getList()

        },
        clickRow(item){
            this.$router.push({ name: 'admin.loads.read', params: {id: item.id} })
        },
        from_city(item){
            return 'ok';
        }
    },
    mounted: function(){
        this.getList()
    },
}
</script>
