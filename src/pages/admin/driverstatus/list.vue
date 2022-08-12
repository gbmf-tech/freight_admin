<template>
    <div class="driverstatus">
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
            :itemSlots="['item.default']"
            dialogwidth="500"
            @hook:mounted="tablemountedevent"
            ref="dialogdatatable">
            <template v-slot:inputs="editItem">
                <v-col cols="12">
                    <div class="">
                        <label>Name</label>
                        <text-field-component
                            v-model="editItem.editItem.status"
                            placeholder="Name"
                        />
                    </div>
                </v-col>
            </template>
            <template v-slot:item.default="{ item }">
                <v-radio-group v-model="radioDefault" >
                    <v-radio @change="changeDefault(item)" :value="item.id" width="35" class="bg-transparent"/>
                </v-radio-group>
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
        title: 'Driver Statuses',
        subtitle: 'All Items',
        headers: [
            { text: 'Name', value: 'status' },
            { text: 'Default', value: 'default' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
        },
        items: [],
        geturl: process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/driverstatuses/v1/driverstatus/',
        actionroute: 'admin.driverstatus.',
        action: ['edit', 'delete'],
        disablepagination: true,
        radioDefault: false,


    }),
    created(){
        // this.setRadioDefault();
    },
    mounted(){
        this.$store.dispatch('title/setTitle', {title: this.title});
        this.$store.dispatch('title/setSubTitle', {cardtitle: this.subtitle});
    },
    methods:{
        async initialize () {
            await this.axios
                .get(this.geturl).then(response => {
                    this.loading = false;
                    this.items = response.data;
                    this.setRadioDefault();
                });
        },
        changeDefault(item){
            this.axios
                .put(this.geturl + 'set/default', {id: item.id}).then(response => {
                    if(response.data){

                    }
                });
        },
        setRadioDefault(){
            this.items.forEach((item) => {
                if(item.default) this.radioDefault = item.id
            });
        },
        tablemountedevent(){
            this.initialize();
            this.$refs.dialogdatatable.items = this.items;

        }
    }
}
</script>
<style lang="scss">
.driverstatus{
    .v-input--radio-group.v-input--radio-group--column{
        width: 35px;
    }
    .v-input__slot{
        background: transparent!important;
    }
}
</style>
