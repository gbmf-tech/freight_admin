<template>
    <div class="load-details mx-auto">
        <div class="loaditemsection pa-8 mb-10">
            <div class="text-22-60 mb-5">
                <v-btn
                    fab
                    small
                    depressed
                    color="silver"
                    :to="{name: 'admin.loads.all'}"
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                Main Information
                <v-btn class="remove-hover pa-0 mx-4 h-auto" color="primary" depressed text :ripple="false" :to="{name: 'admin.loads.edit', params: {id: model.id}}">
                    <v-icon>mdi-pencil-outline</v-icon> Edit
                </v-btn>
            </div>
            <v-row class="section">
                <v-col cols="6">
                    <v-row>
                        <v-col cols="4">
                            <p class="query text-14-60">Track Number:</p>
                        </v-col>
                        <v-col cols="8">
                            <p class="answer text-14" v-html="model.id"></p>
                        </v-col>
                        <v-col cols="4">
                            <p class="query text-14-60">Bill To:</p>
                        </v-col>
                        <v-col cols="8" v-if="model.customer">
                            <span v-if="model.customer.company_name" class="answer text-14" v-html="model.customer.company_name"></span>
                            <span v-if="!model.customer.company_name && model.customer.name" class="answer text-14" v-html="model.customer.name"></span>
                            <span v-if="!model.customer.company_name && !model.customer.name" class="answer text-14" v-html="model.customer.name"></span>

                            <!-- <v-btn class="remove-hover pa-0 mx-4 h-auto" color="primary" depressed text :ripple="false" :to="{name: 'admin.customers.read', params: {id: model.customer.id}}">View Profile</v-btn> -->
                        </v-col>
                        <v-col cols="4">
                            <p class="query text-14-60">W/O:</p>
                        </v-col>
                        <v-col cols="8">
                            <p class="answer text-14" v-html="model.wo"></p>
                        </v-col>
                        <v-col cols="4">
                            <p class="query text-14-60">Status:</p>
                        </v-col>
                        <v-col cols="8" v-if="model.status">
                            <p class="answer text-14" v-html="model.status.name"></p>
                        </v-col>
                        <!-- <v-col cols="4">
                            <p class="query text-14-60">Type:</p>
                        </v-col>
                        <v-col cols="8" v-if="model.type">
                            <p class="answer text-14" v-html="model.type.name"></p>
                        </v-col> -->
                    </v-row>
                </v-col>

                <v-col cols="6">
                    <v-row>
                        <v-col cols="4">
                            <p class="query text-14-60">Rate:</p>
                        </v-col>
                        <v-col cols="8">
                            <p class="answer text-14" v-html="model.init_rate"></p>
                        </v-col>
                        <v-col cols="4">
                            <p class="query text-14-60">Lamper:</p>
                        </v-col>
                        <v-col cols="8">
                            <p class="answer text-14" v-html="model.lamper"></p>
                        </v-col>
                        <v-col cols="4">
                            <p class="query text-14-60">Cross Dock:</p>
                        </v-col>
                        <v-col cols="8">
                            <p class="answer text-14" v-html="model.crossdock"></p>
                        </v-col>
                        <v-col cols="4">
                            <p class="query text-14-60">Driver Assist:</p>
                        </v-col>
                        <v-col cols="8">
                            <p class="answer text-14" v-html="model.driver_assist"></p>
                        </v-col>
                        <v-col cols="4">
                            <p class="query text-14-60">Accessorial Charges:</p>
                        </v-col>
                        <v-col cols="8">
                            <p class="answer text-14" v-html="model.sum_charges"></p>
                        </v-col>
                        <v-col cols="4">
                            <p class="query text-14-60">Final Rate:</p>
                        </v-col>
                        <v-col cols="8">
                            <p class="answer text-14" v-html="model.rate"></p>
                        </v-col>
                        <v-col cols="4">
                            <p class="query text-14-60">Company Net Income:</p>
                        </v-col>
                        <v-col cols="8">
                            <p class="answer text-14" v-html="model.income"></p>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>

        <div class="loaditemsection pa-8 mb-10">
            <div class="text-22-60 mb-5">Carrier Information</div>
            <v-row class="section">
                <v-col cols="6">
                    <v-row>
                        <v-col cols="4">
                            <p class="query text-14-60">Carrier:</p>
                        </v-col>
                        <v-col cols="8">
                            <p class="answer text-14" v-html="model.is_carrier && model.carrier ? model.carrier.name : 'Freight Crew Inc.'"></p>
                        </v-col>
                        <v-col cols="4" v-if="!model.is_carrier">
                            <p class="query text-14-60">Executor:</p>
                        </v-col>
                        <v-col cols="8" v-if="!model.is_carrier && model.driver">
                            <span class="answer text-14" v-html="model.driver.name"></span>
                            <!-- <v-btn class="remove-hover pa-0 mx-4 h-auto" color="primary" depressed text :ripple="false" :to="{name: 'admin.drivers.read', params: {id: model.driver.id}}">View Profile</v-btn> -->
                        </v-col>
                        <v-col cols="4" v-if="!model.is_carrier">
                            <p class="query text-14-60">Flat Rate:</p>
                        </v-col>
                        <v-col cols="8" v-if="!model.is_carrier">
                            <span class="answer text-14" v-html="model.flat_rate"></span>
                        </v-col>
                        <v-col cols="4" v-if="model.is_carrier">
                            <p class="query text-14-60">Carrier Fee:</p>
                        </v-col>
                        <v-col cols="8" v-if="model.is_carrier">
                            <span class="answer text-14" v-html="model.carrier_fee"></span>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="4">
                            <p class="query text-14-60">Equipment Type:</p>
                        </v-col>
                        <v-col cols="8" v-if="model.equipment">
                            <p class="answer text-14" v-html="model.equipment.name"></p>
                        </v-col>
                        <v-col cols="4" v-if="!model.is_carrier && model.truck">
                            <p class="query text-14-60">Truck:</p>
                        </v-col>
                        <v-col cols="8" v-if="!model.is_carrier && model.truck">
                            <span class="answer text-14" v-html="model.truck.number"></span>
                            <!-- <v-btn class="remove-hover pa-0 mx-4 h-auto" color="primary" depressed text :ripple="false" :to="{name: 'admin.drivers.read', params: {id: model.driver.id}}">View Profile</v-btn> -->
                        </v-col>
                        <v-col cols="4" v-if="!model.is_carrier && model.trailer">
                            <p class="query text-14-60">Trailer:</p>
                        </v-col>
                        <v-col cols="8" v-if="!model.is_carrier && model.trailer">
                            <span class="answer text-14" v-html="model.trailer.number"></span>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>

        <div v-if="model.items">
            <div class="loaditemsection pa-8 mb-10"  v-for="(item, index) in model.items.filter((itm) => { if(itm.is_shipper) return itm })">
                <div class="text-22-60 mb-5">Shipper information #{{index + 1}}</div>
                <v-row class="section">
                    <v-col cols="6">
                        <v-row>
                            <v-col cols="4">
                                <p class="query text-14-60">Shipper:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.warehouse.name"></span>
                                <!-- <v-btn class="remove-hover pa-0 mx-4 h-auto" color="primary" depressed text :ripple="false" :to="{name: 'admin.warehouse.read', params: {id: model.warehouse.id}}">View Profile</v-btn> -->
                            </v-col>
                            <v-col cols="4">
                                <p class="query text-14-60">Address:</p>
                            </v-col>
                            <v-col cols="8">
                                <p class="query text-14">{{item.warehouse.zip}}, {{item.warehouse.city}}, {{item.warehouse.address}}</p>
                            </v-col>
                            <v-col cols="4">
                                <p class="query text-14-60">Contact:</p>
                            </v-col>
                            <v-col cols="8">
                                <p class="query text-14">{{item.warehouse.contact_name}}, {{item.warehouse.contact_phone1}} {{item.warehouse.contact_phone2 ? '/ ' + item.warehouse.contact_phone2 : ''}}, {{item.warehouse.contact_email}}, on hours {{item.warehouse.contact_hours}}</p>
                            </v-col>
                            <v-col cols="4" >
                                <p class="query text-14-60">Loading Date:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.date"></span>
                                <span class="answer text-14" v-html="item.time"></span>
                            </v-col>
                            <v-col cols="4">
                                <p class="query text-14-60">Type of Location:</p>
                            </v-col>
                            <v-col cols="8">
                                <span v-if="item.location" class="answer text-14" v-html="item.location.name"></span>
                            </v-col>
                            <!-- <v-col cols="4">
                                <p class="query text-14-60">Additional Services:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.location.name"></span>
                            </v-col> -->
                            <v-col cols="4">
                                <p class="query text-14-60">Condition:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.is_new ? 'New Item' : 'Used Item'"></span>
                            </v-col>
                            <v-col cols="4" >
                                <p class="query text-14-60">M.N.F.C.:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.nmfc"></span>
                            </v-col>
                            <v-col cols="4" >
                                <p class="query text-14-60">P.O. Numbers:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.po_number"></span>
                            </v-col>
                            <v-col cols="4" v-if="item.broker">
                                <p class="query text-14-60">Custom Broker:</p>
                            </v-col>
                            <v-col cols="8" v-if="item.broker">
                                <span class="answer text-14">{{item.broker.name}}, {{item.broker.phone}} </span>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="6">
                        <v-row>
                            <v-col cols="4">
                                <p class="query text-14-60">Description:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.description"></span>
                                <!-- <v-btn class="remove-hover pa-0 mx-4 h-auto" color="primary" depressed text :ripple="false" :to="{name: 'admin.drivers.read', params: {id: model.driver.id}}">View Profile</v-btn> -->
                            </v-col>
                            <v-col cols="4" >
                                <p class="query text-14-60">Type:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.type"></span>
                            </v-col>
                            <v-col cols="4" >
                                <p class="query text-14-60">Size:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14">W{{item.width}} x L{{item.length}} x H{{item.height}}</span>
                            </v-col>
                            <v-col cols="4" >
                                <p class="query text-14-60">Weight:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.weight"></span>
                            </v-col>
                            <v-col cols="4" >
                                <p class="query text-14-60">Quantity:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.quantity"></span>
                            </v-col>
                            <v-col cols="4" >
                                <p class="query text-14-60">Value:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.value"></span>
                            </v-col>
                            <v-col cols="4" >
                                <p class="query text-14-60">Class:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.class"></span>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
            <div class="loaditemsection pa-8 mb-10"  v-for="(item, index) in model.items.filter((itm) => { if(!itm.is_shipper) return itm })">
                <div class="text-22-60 mb-5">Consignee information #{{index + 1}}</div>
                <v-row class="section">
                    <v-col cols="6">
                        <v-row>
                            <v-col cols="4">
                                <p class="query text-14-60">Consignee:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.warehouse.name"></span>
                                <!-- <v-btn class="remove-hover pa-0 mx-4 h-auto" color="primary" depressed text :ripple="false" :to="{name: 'admin.warehouse.read', params: {id: model.warehouse.id}}">View Profile</v-btn> -->
                            </v-col>
                            <v-col cols="4">
                                <p class="query text-14-60">Address:</p>
                            </v-col>
                            <v-col cols="8">
                                <p class="query text-14">{{item.warehouse.zip}}, {{item.warehouse.city}}, {{item.warehouse.address}}</p>
                            </v-col>
                            <v-col cols="4">
                                <p class="query text-14-60">Contact:</p>
                            </v-col>
                            <v-col cols="8">
                                <p class="query text-14">{{item.warehouse.contact_name}}, {{item.warehouse.contact_phone1}} {{item.warehouse.contact_phone2 ? '/ ' + item.warehouse.contact_phone2 : ''}}, {{item.warehouse.contact_email}}, on hours {{item.warehouse.contact_hours}}</p>
                            </v-col>
                            <v-col cols="4" >
                                <p class="query text-14-60">Unloading Date:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.date"></span>
                                <span class="answer text-14" v-html="item.time"></span>
                            </v-col>
                            <v-col cols="4">
                                <p class="query text-14-60">Type of Location:</p>
                            </v-col>
                            <v-col cols="8">
                                <span v-if="item.location" class="answer text-14" v-html="item.location.name"></span>
                            </v-col>
                            <!-- <v-col cols="4">
                                <p class="query text-14-60">Additional Services:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.location.name"></span>
                            </v-col> -->
                        </v-row>
                    </v-col>

                    <v-col cols="6">
                        <v-row>
                            <v-col cols="4">
                                <p class="query text-14-60">Description:</p>
                            </v-col>
                            <v-col cols="8">
                                <p class="answer text-14" v-html="item.description"></p>
                            </v-col>
                            <v-col cols="4" >
                                <p class="query text-14-60">Type:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.type"></span>
                            </v-col>
                            <v-col cols="4" >
                                <p class="query text-14-60">Quantity:</p>
                            </v-col>
                            <v-col cols="8">
                                <span class="answer text-14" v-html="item.quantity"></span>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
            <div class="loaditemsection pa-8 mb-10" v-if="model.numbers.length || model.charges.length">
                <v-row class="section">
                    <v-col cols="6" v-if="model.numbers.length">
                        <div class="text-22-60 mb-5">Load Numbers</div>
                        <v-row v-for="number in model.numbers" :key="number.id">
                            <v-col cols="4">
                                <p class="query text-14-60">{{ number.type.name }}:</p>
                            </v-col>
                            <v-col cols="8">
                                <p class="answer text-14" v-html="number.number"></p>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6" v-if="model.charges.length">
                        <div class="text-22-60 mb-5">Accessorial Charges</div>
                        <v-row v-for="number in model.charges" :key="number.id">
                            <v-col cols="4">
                                <p class="query text-14-60">{{ number.charge }}:</p>
                            </v-col>
                            <v-col cols="8">
                                <p class="answer text-14" v-html="number.amount"></p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
            <div class="loaditemsection pa-8 mb-10" v-if="model.files.length">
                <div class="text-22-60 mb-5">Load Files</div>
                <v-row>
                    <v-col cols="6" v-for="file in model.files" :key="file.id">
                        <p class="query text-14-60">{{ file.type.name }}:
                            <a :href="getEnv('VUE_APP_AXIOS_DOMAIN') + `/storage/documents/`+ file.id_load +`/`+ file.filename" class="answer text-14" download v-html="file.filename"></a>
                        </p>
                    </v-col>
                    <v-col cols="8">
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: ['model'],
	methods:{
		getEnv(variable){
			return process.env[variable]
		}
	}
}
</script>

<style lang="scss">
.load-details{
    max-width: 1200px;
    .loaditemsection{
        background: #fff;
        border-radius: 5px;
        p{
            margin: 0;
        }

    }
}
.v-application.theme--light{
    .loaditemsection{
        background: #fff;
        border-radius: 5px;
        p{
            margin: 0;
        }
    }
}
.v-application.theme--dark{
    .loaditemsection{
        background: #212C42;
        border-radius: 5px;
        p{
            margin: 0;
        }
    }
}
.v-window.v-item-group .v-tabs-items{
    background: transparent !important;
}
</style>
