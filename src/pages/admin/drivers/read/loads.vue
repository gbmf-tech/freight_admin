<template>
    <v-card :loading="loading">
        <v-card-title class="d-block">
            Loads
        </v-card-title>
        <v-card-text>
            <data-table-default
                :headers="headers"
                :geturl="geturl"
                :action="action"
                :actionroute="actionroute">
            </data-table-default>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['model'],
    components: {
        DataTableDefault: () => import('@/components/Admin/DataTableDefault'),
    },
    data: () => ({
        loading: true,
        headers: [
            { text: 'Track Number', value: 'track_number' },
            { text: 'Customer', value: 'customer.name' },
            { text: 'Status', value: 'status.name' },
            { text: 'Updated', value: 'updated_at' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/loads/v1/load/',
        actionroute: 'admin.loads.',
        action: ['show'],
        disablepagination: true,
    }),
    mounted: function(){
        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }
}
</script>
