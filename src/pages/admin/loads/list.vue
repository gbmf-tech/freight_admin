<template>
    <v-card flat>
        <div class="">
            <div class="px-8 pt-8">
                <div class="d-flex justify-space-between">
                    <div class="cardtitle text-22-60" v-html="subtitle"></div>
                    <router-link :to="{name: 'admin.loads.create'}">
                        <v-btn color="primary" dark class="mb-2" depressed>New Item</v-btn>
                    </router-link>
                </div>
                <text-field-component
                    placeholder="Search"
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    style="width: 350px;"
                />
            </div>
            <!-- <loads-table ref="loaddatatable"></loads-table> -->
            <v-data-table
                :headers="headers"
                :items="loads"
                :loading="loading"
                item-key="id"
                class="elevation-0 "
                mobile-breakpoint="1300"
                :calculate-widths="true"
                :items-per-page="perPage"
                :server-items-length="totalItems"
                :sort-by="'updated_at'"
                :sort-desc="true"
                :disable-sort="true"
                @update:page="changePage"
                @update:items-per-page="changePageCount"
                :footer-props="{
                    itemsPerPageOptions: [100, 250, 500, 1000],
                }"
                show-expand
            >
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <v-textarea
                            background-color="silver"
                            v-model="item.notes"
                            outlined
                            flat
                            class="my-2"
                            hide-details
                        ></v-textarea>
                    <v-btn class="primary" @click="updateNote(item)">Save</v-btn>
                    </td>
                </template>
                <template v-slot:item.customer.name="{item}">
                    <div v-if="item.customer" class="">
                        <span v-if="item.customer.company_name">{{ item.customer.company_name }}</span>
                        <span v-if="!item.customer.company_name && item.customer.name">{{item.customer.name}}</span>
                        <span v-if="!item.customer.company_name && !item.customer.name">{{item.customer.email}}</span>
                    </div>
                </template>
                <template v-slot:item.executor.name="{item}">
                    <div class="">
                        <span v-if="item.is_carrier == 1 && item.carrier">{{item.carrier.name}}</span>
                        <span v-if="item.is_carrier == 0 && item.driver">{{item.driver.name}}</span>
                        <span v-if="item.is_carrier == 0 && !item.driver">FreightCrew inc</span>
                    </div>
                </template>
                <template v-slot:item.status.name="{item}">
                    <v-select
                        v-model="item.status"
                        :items="statuses"
                        item-text="name"
                        item-value="id"
                        :background-color="item.status.color"
                        light
                        outlined
                        flat
                        hide-details
                        dense
                        width="100px"
                        class="text-14"
                        @change="changeStatus(item)"
                    >
                    </v-select>
                </template>
                <template v-slot:item.updated_at="{item}">
                    <span>{{ formatDate(item.updated_at) }}</span>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="clickRow(item)"
                    >
                        mdi-eye
                    </v-icon>
                    <!-- <v-icon
                        small
                        class="mr-2"
                        @click="$router.push({name: 'admin.loads.edit', params: {id: item.id}})"
                    >
                        mdi-pen
                    </v-icon> -->
                </template>
            </v-data-table>
        </div>
    </v-card>
</template>

<script>

import gettersMixin from '@/mixins/gettersMixin'
import TextFieldComponent from '@/components/Base/CustomTextField'


export default {
    layout: 'admin',
    middleware: 'auth',
    mixins: [gettersMixin],
    components: {
        TextFieldComponent
    },
    data: () => ({
        title: 'All Items',
        subtitle: 'All Items',
        loads: [],
        totalItems: null,
        perPage: 250,
        page: 1,
        loading: true,
        search: '',
        headers: [
            { text: 'Trip Number', value: 'id'},
            { text: 'Customer', value: 'customer.name' },
	        { text: 'Executor', value: 'executor.name' },
            { text: 'From', value: 'from_city' },
            { text: 'To', value: 'to_city' },
            { text: 'Status', value: 'status.name', width: '180px'},
	        { text: 'Dispatcher', value: 'dispatcher.name' },
	        { text: 'Updated', value: 'updated_at' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        statuses: [],
    }),
    beforeRouteUpdate (to, from, next) {
        this.getList(to.params.slug)
        next()
    },
    watch: {
        search(){
            this.getList()
        }
    },
    methods: {
        async getList(slug = null){
            this.loading = true
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
                        search: this.search,
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
                                item.from_city['id_city'] = items.warehouse.state + ', ' + items.warehouse.city
                            }else{
                                item.to_city['id_city'] = items.warehouse.state + ', ' + items.warehouse.city
                            }
                        })
                        item.from_city = Object.values(item.from_city)
                        item.to_city = Object.values(item.to_city)
                    });

                });
        },
        formatDate(item){
            var data = new Date(item);
            return data.toLocaleString("en-US");
        },
        updateNote(item){
            this.axios.put(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/loads/v1/load/' + item.id, item).then(() => {
                this.getList()
            })
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
        changeStatus(item){
            this.axios.put(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/loads/v1/load/changestatus/' + item.id, {id_status: item.status}).then(() => {
                this.getList()
            })

        }
    },
    mounted(){
        this.$store.dispatch('title/setTitle', {title: this.title});
        this.$store.dispatch('title/setSubTitle', {cardtitle: this.subtitle});
        this.getList()
        this.getStatuses()
    }
}
</script>
