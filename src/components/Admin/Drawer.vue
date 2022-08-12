<template>
    <v-navigation-drawer v-model="drawer" app class="navigation-main" :mini-variant="mini" mini-variant-width="100">
        <div class="d-flex flex-column justify-space-between h-100">
            <v-list class="pt-0">
                <v-list-item :class="!mini ? `logoborderbottom` : `text-center`">
                    <v-btn
                        fab
                        depressed
                        v-if="!$vuetify.theme.dark && mini"
                        color="#EDF2F9"
                        class="my-4 mx-0"
                        style="color:#1f1f1f"
                        @click="mini = !mini"
                    >
                        <v-icon>mdi-menu</v-icon>
                    </v-btn>
                    <v-btn
                        fab
                        depressed
                        v-if="$vuetify.theme.dark && mini"
                        color="silver"
                        class="my-4 mx-0"
                        style="color:#ffffff"
                        @click="mini = !mini"
                    >
                        <v-icon>mdi-menu</v-icon>
                    </v-btn>
                    <!-- <img v-if="!$vuetify.theme.dark && mini" class="py-5" src="/img/logo/dark-mini.svg" alt="" style="width:70px"> -->
                    <img v-if="!$vuetify.theme.dark && !mini" class="py-5" src="/img/logo/newblack.svg" alt="" style="width:150px">
                    <img v-if="$vuetify.theme.dark && !mini" class="py-5" src="/img/logo/newwhite.svg" alt="" style="width:150px">
                </v-list-item>
                <div v-for="item in items" class="">
                    <v-list-group v-if="item.items" v-model="item.active"  :key="item.text" class="px-0" :ripple="false">
                        <v-list-item slot="activator" v-show="mini" :to="{name: item.to, params: item.param}" :ripple="false">
                            <v-list-item-content>
                                <v-list-item-title class="text-center">
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item slot="activator" v-show="!mini" :ripple="false">
                            <v-list-item-content>
                                <v-list-item-title >
                                    {{ item.title }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="pl-8" v-if="mini == false" v-for="subItem in item.items" :key="subItem.text" :to="{name: subItem.to, params: subItem.param}" :ripple="false">
                            <v-list-item-action>
                                <v-icon>{{ subItem.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ subItem.title }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <!-- <v-list-item class="pl-12" v-if="item.items == 'status'" :to="{name: item.to, params: {slug: 'all'}}">
                            <v-list-item-action>
                                <v-icon>mdi-format-list-bulleted</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    All
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="pl-12" v-if="item.items == 'status'" :to="{name: 'admin.loads.create'}">
                            <v-list-item-action>
                                <v-icon>mdi-plus-box-outline</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    New Load
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item class="pl-12" v-if="item.items == 'status'" v-for="subItem in statuses" :key="subItem.text" :to="{name: item.to, params: {slug: subItem.slug}}">
                            <v-list-item-action>
                                <v-icon>mdi-format-list-bulleted</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ subItem.name }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item> -->
                    </v-list-group>
                    <v-list-item class="" v-if="!item.items" :to="{name: item.to}" :ripple="false">
                        <v-list-item-content>
                            <v-list-item-title v-show="!mini">
                                {{ item.title }}
                            </v-list-item-title>
                            <v-list-item-title v-show="mini" class="text-center">
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </v-list>
            <div class="">
                <v-list class="pt-0">
                    <v-list-item @click="mini = !mini" :ripple="false">
                        <v-list-item-content>
                            <v-list-item-title v-show="!mini" class="text-right">
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-list-item-title>
                            <v-list-item-title v-show="mini" class="text-center">
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </div>
        </div>
    </v-navigation-drawer>
</template>

<script>
import Cookies from 'js-cookie'

  export default {
    name: 'DashboardCoreDrawer',
    data: () => ({
        drawer: false,
        mini: true,
        statuses: [],
        items: [
            {
                icon: 'mdi-clipboard-list-outline',
                title: 'Dispatch',
                active: true,
                to: 'admin.loads.all',
                param: {slug: 'active'},
                // items: 'status'
                items: [
                    {
                        title: 'New Load',
                        icon: 'mdi-plus-box-outline',
                        to: 'admin.loads.create',
                    },
                    {
                        title: 'Active Loads',
                        icon: 'mdi-alert-decagram-outline',
                        to: 'admin.loads.all',
                        param: {slug: 'active'},
                    },
                    {
                        title: 'All Loads',
                        icon: 'mdi-clipboard-text-outline',
                        to: 'admin.loads.all',
                        param: {slug: 'all'},
                    },
                    {
                        title: 'Quotes',
                        icon: 'mdi-format-list-bulleted',
                        to: 'admin.loads.all',
                        param: {slug: 'quotes'},
                    },
                    {
                        title: 'Completed Loads',
                        icon: 'mdi-cached',
                        to: 'admin.loads.all',
                        param: {slug: 'completed'},
                    },
                    {
                        title: 'Cancelled Loads',
                        icon: 'mdi-format-list-bulleted',
                        to: 'admin.loads.all',
                        param: {slug: 'cancelled'},
                    }
                ]
            },
            {
                icon: 'mdi-account-multiple',
                title: 'Customers',
                to: 'admin.customers.list',
                // items: [
                //     {
                //         title: 'List',
                //         icon: 'mdi-format-list-bulleted',
                //         to: 'admin.customers.list',
                //     },
                // ]
            },
            {
                icon: 'mdi-clipboard-account-outline',
                title: 'Drivers',
                to: 'admin.drivers.list',

            },
            {
                icon: 'mdi-car',
                title: 'Carriers',
                to: 'admin.carrier.list',
            },
            {
                icon: 'mdi-home-city-outline',
                title: 'Warehouses',
                to: 'admin.warehouse.list',
                items: [
                    {
                        title: 'Shippers',
                        icon: 'mdi-arrow-right-thin-circle-outline',
                        to: 'admin.warehouse.list',
                        param: {type: 'shipper'},
                    },
                    {
                        title: 'Consignees',
                        icon: 'mdi-arrow-left-thin-circle-outline',
                        to: 'admin.warehouse.list',
                        param: {type: 'consignee'},
                    },
                ]
            },
            {
                title: 'Settings',
                icon: 'mdi-cog',
                to: 'admin.driverstatus.list',
                items: [
                    // {
                    //     title: 'Load Statuses',
                    //     icon: 'mdi-package-variant-closed',
                    //     to: 'admin.loadstatus.list',
                    // },
                    {
                        title: 'Driver Statuses',
                        icon: 'mdi-account-box-outline',
                        to: 'admin.driverstatus.list',
                    },
                    {
                        title: 'Equipment Types',
                        icon: 'mdi-puzzle-outline',
                        to: 'admin.equipmenttype.list',
                    },
                    {
                        title: 'Truck Types',
                        icon: 'mdi-bus',
                        to: 'admin.trucktype.list',
                    },
                    {
                        title: 'Truck',
                        icon: 'mdi-truck-outline',
                        to: 'admin.truck.list',
                    },
                    {
                        title: 'Trailer',
                        icon: 'mdi-rectangle-outline',
                        to: 'admin.trailer.list',
                    },
                    {
                        title: 'Load Numbers Types',
                        icon: 'mdi-file-outline',
                        to: 'admin.numberstype.list',
                    },
                    {
                        title: 'Custom Broker',
                        icon: 'mdi-emoticon-outline',
                        to: 'admin.custombroker.list',
                    },
                    {
                        title: 'Users',
                        icon: 'mdi-account-tie-voice-outline',
                        to: 'admin.user.list',
                    },
                ]
            },
        ],
    }),
    created() {
        this.getStatuses();
    },
    methods: {
        async getStatuses(){
            await this.axios
                .get(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/loads/v1/status').then(response => {
                    this.statuses = response.data;
                })
        },
        getCookie(){
            return Cookies.get('dark')
        }
    }
  }
</script>
<style lang="scss">
.navigation-main.theme--light{
    .logoborderbottom{
        border-bottom: 1px solid #ECECEC;
    }
    .v-list-group__header{
        padding: 0;
    }
    a.v-list-item::before{
        content: none;
    }
    .v-list-item--active{
        background: #EDF2F9;
        .v-list-item__content .v-list-item__title{
            color: #5496F0;
        }
    }
    .v-list-group__header.v-list-item.v-list-item--active{
        background: #EDF2F9;
    }
    .v-list-item:hover{
        background: #EDF2F9;
    }
    .v-list-group__header.v-list-item.v-list-item--active::before{
        content:none;
    }
    .v-list-item__content .v-list-item__title{
        font-weight: 600 !important;
        font-size: 16px !important;
        line-height: 24px;
        color: #1F1F1F;
        padding: 10px 0;
    }
    .v-list-item__icon.v-list-group__header__append-icon{
        margin-right: 7% !important;
    }
    .v-list-group__items{
        .v-list-item__content .v-list-item__title{
            font-weight: 450!important;
            font-size: 14px!important;
            line-height: 22px;
            padding: 0;

        }
    }
}
.navigation-main.theme--dark{
    .logoborderbottom{
        border-bottom: 1px solid #2C364A;
    }
    .v-list-group__header{
        padding: 0;
    }
    a.v-list-item::before{
        content: none;
    }
    a.v-list-item--active{
        background: #212C42;
        .v-list-item__content .v-list-item__title{
            color: #ffffff;
        }
        i.v-icon{
            color: #fff;
        }
    }
    i.v-icon{
        color: #8B97AE;
    }
    .v-list-item__content .v-list-item__title{
        font-weight: 600 !important;
        font-size: 16px !important;
        line-height: 24px;
        color: #8B97AE;
        padding: 10px 0;
    }
    .v-list-item__icon.v-list-group__header__append-icon{
        margin-right: 7% !important;
    }
    .v-list-group__items{
        .v-list-item__content .v-list-item__title{
            font-weight: 450!important;
            font-size: 14px!important;
            line-height: 22px;
            padding: 0;

        }
    }
}
</style>
