<template>
    <div class="">
        <div class="px-8 pt-8">
            <div class="d-flex justify-space-between">
                <div class="cardtitle text-22-60" v-html="subtitle"></div>
                <v-btn large color="primary" class="mb-2 py-2" @click="$refs.dialogdatatable.dialogchange()" depressed>New Item</v-btn>
            </div>
        </div>
        <data-table-default
            :headers="headers"
            :geturl="geturl"
            :action="action"
            :disablepagination="disablepagination"
            :editedItem="editedItem"
            ref="dialogdatatable">
            <template v-slot:inputs="editItem">
                <v-col cols="12"  md="6">
                    <label for="">Name</label>
                    <text-field-component
                        v-model="editItem.editItem.name"
                        placeholder="Name"
                    />
                </v-col>
                <v-col cols="12" md="6">
                    <label for="">Email</label>
                    <text-field-component
                        v-model="editItem.editItem.email"
                        placeholder="Email"
                    />
                </v-col>
                <v-col cols="12" md="6">
                    <label for="">Phone</label>
                    <text-field-component
                        v-model="editItem.editItem.phone"
                        placeholder="Phone"
                        v-mask="'###-###-####'"
                        type="phone"
                    />
                </v-col>
                <v-col cols="12" md="6">
                    <label for="">Address</label>
                    <text-field-component
                        v-model="editItem.editItem.address"
                        placeholder="Address"
                    />
                </v-col>
                <v-col cols="12" md="6">
                    <label for="">Password</label>
                    <text-field-component
                        v-model="editItem.editItem.password"
                        placeholder="Password"
                    />
                </v-col>
                <v-col cols="12" md="6">
                    <label for="">Password Repeat</label>
                    <text-field-component
                        v-model="editItem.editItem.password_confirmation"
                        placeholder="Password Repeat"
                    />
                </v-col>
                <v-col cols="12" md="6">
                    <label for="">Role</label>
                    <v-select
                        v-model="editItem.editItem.id_role"
                        :items="Object.values(roles)"
                        item-text="name"
                        item-value="id"
                        background-color="silver"
                        outlined
                        flat
                        hide-details></v-select>
                </v-col>
            </template>
        </data-table-default>
    </div>
</template>

<script>
import TextFieldComponent from '@/components/Base/CustomTextField'

export default {
    layout: 'admin',
    middleware: 'auth',
    components: {
        DataTableDefault: () => import('@/components/Admin/DataTableDefault'),
        TextFieldComponent
    },
    data: () => ({
        title: 'User',
        subtitle: 'All Users',
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Phone', value: 'phone' },
            { text: 'Status', value: 'status' },
            { text: 'Role', value: 'role.name' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
            password_confirmation: null,
        },
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/users/v1/user/',
        actionroute: 'admin.user.',
        action: ['edit', 'delete'],
        disablepagination: true,
        roles: [],
    }),
    mounted(){
        this.$store.dispatch('title/setTitle', {title: this.title});
        this.$store.dispatch('title/setSubTitle', {cardtitle: this.subtitle});
        this.getRoles();
    },
    methods: {
        getRoles(){
            this.axios.get(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/users/v1/user/roles').then(result => {
                this.roles = result.data
            })
        }
    }
}
</script>
