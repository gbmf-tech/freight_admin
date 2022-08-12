<template>
    <v-card flat>
        <div class="px-8 pt-8">
            <v-form @submit.prevent="submit" enctype="multipart/form-data">
                <div class="text-28-60 my-4">
                    Main Information
                </div>
                <v-row>
                    <v-col cols="12" sm="3">
                        <label for="">Bill To:</label>
                        <autocomplete-component
                            @setItem="setCustomer"
                            :request="{
                                url: getEnv('VUE_APP_AXIOS_DOMAIN') + '/api/sudo/customers/v1/customer/'
                            }"
                            :postUrl="getEnv('VUE_APP_AXIOS_DOMAIN') + '/api/sudo/customers/v1/customer/'"
                            label="Enter Customer"
                            itemtext="company_name"
                        >
                            <template v-slot:result="{data}">
                                {{data.item.company_name}} | {{data.item.name}} | {{data.item.email}} | {{data.item.phone}} | {{data.item.address}} | {{data.item.zip}}
                            </template>

                            <template v-slot:popup="{editItem}">
                                <customer-form :item="editItem" @update="editItem = Object.assign(editItem, $event)"/>
                            </template>
                        </autocomplete-component>
                    </v-col>
                    <v-col cols="12" md="3">
                        <label for="">Reference Number</label>
                        <text-field-component v-model="Load.wo" outlined flat hide-details/>
                    </v-col>

                    <v-col cols="12" md="3">
                        <label for="">Status</label>
                        <v-select
                            v-model="Load.id_status"
                            :items="statuses"
                            item-text="name"
                            item-value="id"
                            background-color="silver"
                            outlined
                            flat
                            class="mt-2"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                        <label for="">Dispatcher</label>
                        <v-select
                            v-model="Load.id_user"
                            :items="dispatchers"
                            item-text="name"
                            item-value="id"
                            background-color="silver"
                            outlined
                            flat
                            class="mt-2"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                        <label for="">Rate</label>
                        <text-field-component
                            v-model="Load.init_rate"
                            @change="calculateRate"
                        />
                    </v-col>
                    <v-col cols="12" md="4">
                        <div class="d-flex">
                            <div class=" mr-3">
                                <label for="">Add or Deduct</label>
                                <div class="py-3">
                                    <v-radio-group v-model="Load.lamper_type" class="createradiogroup" :row="true" @change="calculateRate" hide-details>
                                        <v-radio :value="1" class="mr-0">
                                            <template v-slot:label>
                                                <v-btn
                                                    :color="Load.lamper_type == 1 ? 'blue' : 'silver'"
                                                    fab
                                                    small
                                                    depressed
                                                >
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </template>
                                        </v-radio>
                                        <v-radio :value="0" class="mr-0">
                                            <template v-slot:label>
                                                <v-btn
                                                    :color="Load.lamper_type == 0 ? 'blue' : 'silver'"
                                                    fab
                                                    small
                                                    depressed
                                                >
                                                    <v-icon>mdi-minus</v-icon>
                                                </v-btn>
                                            </template>
                                        </v-radio>
                                    </v-radio-group>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <label for="">Lamper</label>
                                <text-field-component
                                    v-model="Load.lamper"
                                    @change="calculateRate"
                                />
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" md="4">
                        <div class="d-flex">
                            <div class=" mr-3">
                                <label for="">Add or Deduct</label>
                                <div class="py-3">
                                    <v-radio-group v-model="Load.driver_assist_type" class="createradiogroup" :row="true" @change="calculateRate" hide-details>
                                        <v-radio :value="1" class="mr-0">
                                            <template v-slot:label>
                                                <v-btn
                                                    :color="Load.driver_assist_type == 1 ? 'blue' : 'silver'"
                                                    fab
                                                    small
                                                    depressed
                                                >
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </template>
                                        </v-radio>
                                        <v-radio :value="0" class="mr-0">
                                            <template v-slot:label>
                                                <v-btn
                                                    :color="Load.driver_assist_type == 0 ? 'blue' : 'silver'"
                                                    fab
                                                    small
                                                    depressed
                                                >
                                                    <v-icon>mdi-minus</v-icon>
                                                </v-btn>
                                            </template>
                                        </v-radio>
                                    </v-radio-group>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <label for="">Driver Assist</label>
                                <text-field-component
                                    v-model="Load.driver_assist"
                                    @change="calculateRate"
                                />
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" md="4">
                        <div class="d-flex">
                            <div class=" mr-3">
                                <label for="">Add or Deduct</label>
                                <div class="py-3">
                                    <v-radio-group v-model="Load.crossdock_type" class="createradiogroup" :row="true" @change="calculateRate" hide-details>
                                        <v-radio :value="1" class="mr-0">
                                            <template v-slot:label>
                                                <v-btn
                                                    :color="Load.crossdock_type == 1 ? 'blue' : 'silver'"
                                                    fab
                                                    small
                                                    depressed
                                                >
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </template>
                                        </v-radio>
                                        <v-radio :value="0" class="mr-0">
                                            <template v-slot:label>
                                                <v-btn
                                                    :color="Load.crossdock_type == 0 ? 'blue' : 'silver'"
                                                    fab
                                                    small
                                                    depressed
                                                >
                                                    <v-icon>mdi-minus</v-icon>
                                                </v-btn>
                                            </template>
                                        </v-radio>
                                    </v-radio-group>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <label for="">Cross Dock</label>
                                <text-field-component
                                    v-model="Load.crossdock"
                                    @change="calculateRate"
                                />
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" md="4">
                        <label for="">Accessorial Charges</label>
                        <charges-form :charges="Load.charges" @sum="Load.sum_charges = $event"/>
                    </v-col>
                    <v-col cols="12" md="2">
                        <label for="">Invoice Final Rate</label>
                        <text-field-component
                            readonly
                            v-model="Load.rate"
                        />
                    </v-col>
                    <v-col cols="12" md="2">
                        <label for="">Company Net Income</label>
                        <text-field-component
                            readonly
                            v-model="Load.income"
                        />
                    </v-col>
                </v-row>
                <div class="d-flex mb-10">
                    <div class="d-flex flex-column">
                        <label for="">Load Numbers</label>
                        <load-numbers-form @save="Load.numbers = Object.assign(Load.numbers, $event)" :items="Load.numbers"/>
                    </div>
                    <div class="d-flex flex-column">
                        <label for="">Load Documents</label>
                        <load-documents-form @save="Load.documents = Object.assign(Load.documents, $event)" :items="Load.documents"/>
                    </div>
                </div>

                <div class="text-28-60 my-4">
                    Carrier Information
                </div>
                <v-radio-group v-model="Load.is_carrier" :column="false" @change="resetExecutor" hide-details>
                    <v-radio class="mb-0 mr-2" label="Company asset" :value="0"></v-radio>
                    <v-radio class="" label="Carrier" :value="1"></v-radio>
                </v-radio-group>
                <v-row>
                    <v-col cols="12" md="4">
                        <label for="">Select Executor:</label>
                        <autocomplete-component
                            ref="executor"
                            @setItem="setExecutor"
                            :request="{
                                url: Load.is_carrier ? getEnv('VUE_APP_AXIOS_DOMAIN') + '/api/sudo/carriers/v1/carrier/' : getEnv('VUE_APP_AXIOS_DOMAIN') + '/api/sudo/drivers/v1/driver/'
                            }"
                            :postUrl="Load.is_carrier ? getEnv('VUE_APP_AXIOS_DOMAIN') + '/api/sudo/carriers/v1/carrier/' : getEnv('VUE_APP_AXIOS_DOMAIN') + '/api/sudo/drivers/v1/driver/'"

                            :placeholder="Load.is_carrier ? 'Enter Carrier Name Phone Address or Email' : 'Enter Driver Name Phone Address or Email'"
                        >
                            <template v-slot:result="{data}">
                                {{data.item.name}} | {{data.item.email}} | {{data.item.phone}} | {{data.item.address}} | {{data.item.zip}}
                            </template>
                            <template v-slot:popup="{editItem}">
                                <driver-form v-if="!Load.is_carrier" :item="editItem" @update="editItem = Object.assign(editItem, $event)"/>
                                <carrier-form v-if="Load.is_carrier" :item="editItem" @update="editItem = Object.assign(editItem, $event)"/>
                            </template>
                        </autocomplete-component>
                    </v-col>
                    <v-col cols="12" md="4">
                        <label for="">Equipment Type</label>
                        <v-select
                            v-model="Load.id_equipment_type"
                            :items="equipments"
                            item-text="name"
                            item-value="id"
                            background-color="silver"
                            outlined
                            flat
                            class="mt-2"
                        ></v-select>
                    </v-col>
                    <v-col v-if="!Load.is_carrier" cols="12" md="4">
                        <label for="">Truck</label>
                        <v-select
                            v-model="Load.id_truck"
                            :items="trucks"
                            item-text="number"
                            item-value="id"
                            background-color="silver"
                            outlined
                            flat
                            class="mt-2"
                        ></v-select>
                    </v-col>
                    <v-col v-if="!Load.is_carrier" cols="12" md="4">
                        <label for="">Trailer</label>
                        <v-select
                            v-model="Load.id_trailer"
                            :items="trailers"
                            item-text="number"
                            item-value="id"
                            background-color="silver"
                            outlined
                            flat
                            class="mt-2"
                        ></v-select>
                    </v-col>
                    <v-col v-if="!Load.is_carrier" cols="12" md="4">
                        <label for="">Flat Rate</label>
                        <text-field-component
                            v-model="Load.flat_rate"
                            @change="calculateRate"
                        />
                    </v-col>
                    <v-col v-if="Load.is_carrier" cols="12" md="4">
                        <label for="">Carrier Fee</label>
                        <text-field-component
                            v-model="Load.carrier_fee"
                            @change="calculateRate"
                        />
                    </v-col>
                </v-row>
                <div class="text-28-60 my-4">
                    Shipper information
                </div>
                <div class="">
                    <v-tabs v-model="Shipper.tab" background-color="transparent">
                        <v-tab v-for="(item, index) in Load.shippers" :key="index" :href="`#shipper-tab-${index}`">
                            Shipper {{ index + 1 }}
                        </v-tab>
                        <v-btn height="100%" text @click="addTab(Shipper, 'shippers')"><v-icon dark>mdi-plus</v-icon> Add</v-btn>

                        <v-tab-item v-for="(item, index) in Load.shippers" :key="index" :value="'shipper-tab-' + index" class="bg-transparent">
                            <v-row class="mt-4">
                                <v-col cols="12" md="4">
                                    <label for="">Shipper Name</label>
                                    <autocomplete-component
                                        @setItem="setShipper"
                                        @click:clear="clearItemWarehouse(item)"
                                        :index="index"
                                        :request="{
                                            url: getEnv('VUE_APP_AXIOS_DOMAIN') + '/api/sudo/warehouses/v1/warehouse/',
                                            type: 'is_shipper'
                                        }"
                                        :postUrl="getEnv('VUE_APP_AXIOS_DOMAIN') + '/api/sudo/warehouses/v1/warehouse/'"

                                        label="Enter Shipper Name Address or Zip"
                                    >
                                        <template v-slot:result="{data}">
                                            {{data.item.name}} | {{data.item.address}} | {{data.item.zip}}
                                        </template>
                                        <template v-slot:popup="{editItem}">
                                            <warehouse-form :item="editItem" @update="editItem = Object.assign(editItem, $event)"/>
                                        </template>
                                    </autocomplete-component>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Location</label>
                                    <text-field-component
                                        v-model="item.location"
                                        placeholder="Location"
                                        readonly
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Date</label>
                                    <datepicker-component @setDate="shipperDate" :index="index"/>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <div class="">
                                        <label for="">Time</label>
                                        <timepicker-component @setTime="shipperTime" :index="index"/>
                                    </div>
                                    <div class="">
                                        <label for="">Type</label>
                                        <v-select
                                        v-model="item.type"
                                        :items="itemTypes"
                                        background-color="silver"
                                        outlined
                                        flat
                                        class=""
                                        ></v-select>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="8">
                                    <label for="">Description</label>
                                    <v-textarea
                                        placeholder="Description"
                                        v-model="item.description"
                                        background-color="silver"
                                        rows="5"
                                        outlined
                                        flat
                                        hide-details="auto"
                                        class="mt-2"
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Quantity</label>
                                    <text-field-component
                                        placeholder="Quantity"
                                        v-model="item.quantity"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Weight</label>
                                    <text-field-component
                                        placeholder="Weight"
                                        v-model="item.weight"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Value</label>
                                    <text-field-component
                                        placeholder="Value"
                                        v-model="item.value"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Width</label>
                                    <text-field-component
                                        placeholder="Width"
                                        v-model="item.width"
                                    />
                                </v-col><v-col cols="12" md="4">
                                    <label for="">Length</label>
                                    <text-field-component
                                        placeholder="Length"
                                        v-model="item.length"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Height</label>
                                    <text-field-component
                                        placeholder="Height"
                                        v-model="item.height"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">P.O. Numbers</label>
                                    <text-field-component
                                        placeholder="P.O. Numbers"
                                        v-model="item.po_number"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Class</label>
                                    <text-field-component
                                        placeholder="Class"
                                        v-model="item.class"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Condition</label>
                                    <v-select
                                        v-model="item.is_new"
                                        :items="[{key: 1, name: 'New Item'},{key: 0, name: 'Used Item'}]"
                                        item-text="name"
                                        item-value="key"
                                        background-color="silver"
                                        outlined
                                        flat
                                        class="mt-2"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Type of Location</label>
                                    <v-select
                                        v-model="item.location_type"
                                        :items="getLocationTypes('up')"
                                        item-text="name"
                                        item-value="key"
                                        background-color="silver"
                                        outlined
                                        flat
                                        class="mt-2"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Additional Services</label>
                                    <v-select
                                        v-model="item.additional"
                                        :items="getAdditional('up')"
                                        item-text="name"
                                        item-value="key"
                                        multiple
                                        background-color="silver"
                                        outlined
                                        flat
                                        class="mt-2"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Customs Broker</label>
                                    <autocomplete-component
                                        @setItem="setBroker"
                                        :index="index"
                                        :request="{
                                            url: getEnv('VUE_APP_AXIOS_DOMAIN') + '/api/sudo/custombrokers/v1/custombroker/'
                                        }"
                                        :postUrl="getEnv('VUE_APP_AXIOS_DOMAIN') + '/api/sudo/custombrokers/v1/custombroker/'"

                                        label="Enter Customs Broker Address or Zip"
                                    >
                                        <template v-slot:result="{data}">
                                            {{data.item.name}} | {{data.item.phone}}
                                        </template>
                                        <template v-slot:popup="{editItem}">
                                            <broker-form :item="editItem" @update="editItem = Object.assign(editItem, $event)"/>
                                        </template>
                                    </autocomplete-component>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                    </v-tabs>
                </div>
                <div class="text-28-60 my-4 ">
                    Consignee information
                </div>
                <div class="">
                    <v-tabs v-model="Consignee.tab" background-color="transparent">
                        <v-tab v-for="(item, index) in Load.consignees" :key="index" :href="`#consignee-tab-${index}`">
                            Consignee {{ index + 1 }}
                        </v-tab>
                        <v-btn height="100%" text @click="addTab(Consignee, 'consignees')"><v-icon dark>mdi-plus</v-icon> Add</v-btn>

                        <v-tab-item v-for="(item, index) in Load.consignees" :key="index" :value="'consignee-tab-' + index" class="bg-transparent">
                            <v-row class="mt-4">
                                <v-col cols="12" md="4">
                                    <label for="">Consignee Name</label>
                                    <autocomplete-component
                                        @setItem="setConsignee"
                                        @click:clear="clearItemWarehouse(item)"
                                        :index="index"
                                        :request="{
                                            url: getEnv('VUE_APP_AXIOS_DOMAIN') + '/api/sudo/warehouses/v1/warehouse/',
                                            type: 'is_consignee'
                                        }"
                                        :postUrl="getEnv('VUE_APP_AXIOS_DOMAIN') + '/api/sudo/warehouses/v1/warehouse/'"
                                        label="Enter Consignee Name Address or Zip"
                                    >
                                        <template v-slot:result="{data}">
                                            {{data.item.name}} | {{data.item.address}} | {{data.item.zip}}
                                        </template>
                                        <template v-slot:popup="{editItem}">
                                            <warehouse-form :item="editItem" @update="editItem = Object.assign(editItem, $event)"/>
                                        </template>
                                    </autocomplete-component>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Location</label>
                                    <text-field-component
                                        v-model="item.location"
                                        placeholder="Location"
                                        readonly
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Date</label>
                                    <datepicker-component :min="startTime ? startTime : false" @setDate="consigneeDate" :index="index"/>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Time</label>
                                    <timepicker-component @setTime="consigneeTime" :index="index"/>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Description</label>
                                    <text-field-component
                                        placeholder="Description"
                                        v-model="item.description"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Type</label>
                                    <v-select
                                        v-model="item.type"
                                        :items="itemTypes"
                                        placeholder="Type (TL, LTL, Pallets, etc.)"
                                        background-color="silver"
                                        outlined
                                        flat
                                        class="mt-2"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Quantity</label>
                                    <text-field-component
                                        placeholder="Quantity"
                                        v-model="item.quantity"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Type of Location</label>
                                    <v-select
                                        v-model="item.location_type"
                                        :items="getLocationTypes('down')"
                                        item-text="name"
                                        item-value="key"
                                        background-color="silver"
                                        outlined
                                        flat
                                        class="mt-2"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <label for="">Additional Services</label>
                                    <v-select
                                        v-model="item.additional"
                                        :items="getAdditional('down')"
                                        item-text="name"
                                        item-value="key"
                                        multiple
                                        background-color="silver"
                                        outlined
                                        flat
                                        class="mt-2"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                    </v-tabs>
                </div>
                <div class="d-flex justify-end mb-5">
                    <v-btn class="silver py-6 h-auto mr-3" depressed :to="{name: 'admin.loads.all'}">Discard</v-btn>
                    <v-btn class="primary py-6 h-auto" depressed @click="submitForm">Submit</v-btn>
                </div>
            </v-form>
        </div>
    </v-card>
</template>
<script>
import { serialize } from 'object-to-formdata';

import gettersMixin from '@/mixins/gettersMixin'
import AutocompleteComponent from '@/components/Base/CustomAutocomplete'
import DatepickerComponent from '@/components/Base/CustomDatepicker'
import TimepickerComponent from '@/components/Base/CustomTimepicker'
import CustomerForm from '@/components/page/customerForm'
import DriverForm from '@/components/page/driverForm'
import CarrierForm from '@/components/page/carrierForm'
import LoadNumbersForm from '@/components/page/loadnumbersForm'
import TextFieldComponent from '@/components/Base/CustomTextField'
import ChargesForm from '@/components/page/chargesForm'
import WarehouseForm from '@/components/page/warehouseForm'
import BrokerForm from '@/components/page/brokerForm'
import LoadDocumentsForm from '@/components/page/loaddocumentsForm'


export default {
    mixins: [gettersMixin],
    components: {
        AutocompleteComponent,
        DatepickerComponent,
        TimepickerComponent,
        CustomerForm,
        DriverForm,
        CarrierForm,
        LoadNumbersForm,
        ChargesForm,
        TextFieldComponent,
        WarehouseForm,
        BrokerForm,
        LoadDocumentsForm
    },
    data: () => ({
        Load: {
            id_customer: null,
            id_executor: null,
            id_user: null,
            id_status: 3,
            id_equipment_type: null,
            init_rate: null,
            rate: null,
            lamper_type: null,
            lamper: null,
            driver_assist_type: null,
            driver_assist: null,
            crossdock_type: null,
            crossdock: null,
            flat_rate: null,
            id_truck: null,
            id_trailer: null,
            is_carrier: 1,
            carrier_fee: null,
            sum_charges: null,
            wo: null,
            charges: [],
            shippers: [],
            consignees: [],
            numbers: [],
            documents: [],
        },
        trucks: [],
        trailers: [],
        types: [],
        statuses: [],
        equipments: [],
        Shipper: {
            items: [],
            tab: null,
            is_shipper: 1,
        },
        Consignee: {
            items: [],
            tab: null,
            is_shipper: 0,
        },
        loadItem: {
            id_load: null,
            id_warehouse: null,
            warehouse: null,
            date: null,
            time: null,
            description: null,
            type: null,
            quantity: null,
            weight: null,
            width: null,
            length: null,
            height: null,
            class: null,
            location: null,
            packing_type: null,
            value: null,
            po_number: null,
            id_custom_broker: null,
            is_shipper: null,
        },
        Custom: {
            loading: false,
            brokers: [],
            searchInput: '',
        },
        location_types: [
            {
                key: 1,
                only: 'all',
                name: 'Business',
                desc: 'Commercial buildings and areas',
            },
            {
                key: 2,
                only: 'all',
                name: 'Residential',
                desc: 'Home and home businesses'
            },
            {
                key: 3,
                only: 'up',
                name: 'Pick up at a carrier terminal',
                desc: 'Save money and skip the pickup services'
            },
            {
                key: 4,
                only: 'down',
                name: 'Drop off at a carrier terminal',
                desc: 'Save money and skip the pickup services'
            }
        ],
        additional_services: [
            {
                key: 1,
                only: 'all',
                name: 'Lift gate',
                desc: 'When the location doesn\'t have a loading dock and your shipment is too heavy to lift without assistance'
            },
            {
                key: 2,
                only: 'up',
                name: 'Pickup inside the location',
                desc: 'When the driver needs to move the shipment from somewhere other than directly behind the truck'
            },
            {
                key: 3,
                only: 'up',
                name: 'Limited access',
                desc: 'A non-residential location that may be difficult for a truck to access. i.e. farms, construction site, church, strip mall, school, etc.'
            },
            {
                key: 4,
                only: 'down',
                name: 'Delivery inside the location',
                desc: 'When the driver needs to move the shipment from somewhere other than directly behind the truck'
            },
            {
                key: 5,
                only: 'down',
                disabled: true,
                name: 'Appointment Fee',
                desc: 'When the carrier is required to contact final delivery location for specific appointment window'
            },
            {
                key: 6,
                only: 'down',
                name: 'Residential delivery',
                desc: 'When the location is a residential address'
            },
        ],
        itemTypes: ['LTL', 'Pallets', 'TL', 'Pallet (48"x40")', 'Pallet (48"x48")', 'Box', 'Crate', 'Bundle', 'Drum', 'Roll', 'Bale'],
        dispatchers: [],
        startTime: null,
    }),
    created() {
        this.initialize()
        this.addTab(this.Shipper, 'shippers')
        this.addTab(this.Consignee, 'consignees')
    },
    watch: {
        'Load.sum_charges': function(){
            this.calculateRate()
        }
    },
    methods: {
        initialize(){
            this.getStatuses();
            this.getTypes();
            this.getEquipments();
            this.getTrucks();
            this.getTrailers();
            this.getDispatchers();
            this.Load.id_user = this.$store.state.auth.user.id;
        },

        submitForm(){
            this.axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
            // let formData = new FormData();
            const formData = serialize(
                this.Load,
                {
                    indices: true,
                    allowEmptyArrays: true
                }
            );
            console.log(formData);
            // .forEach(function(value, index){
            //     console.log(value.filename);
            //     formData.append('doc', value.filename);
            //     // formData.append('documents[' + index + '][id_type]', value.id_type);
            // });
            this.axios.post(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/loads/v1/load', formData).then(response => {
                this.$router.push({ name: 'admin.loads.all' })
            })
        },

        shipperDate(data){
            this.Load.shippers[data.index].date = data.date;
            this.startTime = data.date;
        },

        shipperTime(data){
            this.Load.shippers[data.index].time = data.time;
        },

        consigneeDate(data){
            this.Load.consignees[data.index].date = data.date;
        },

        consigneeTime(data){
            this.Load.consignees[data.index].time = data.time;
        },

        setConsignee(data){
            this.Load.consignees[data.index].id_warehouse = data.data.id;
            this.Load.consignees[data.index].location = data.data.address + ', ' + data.data.city + ', ' + data.data.zip;
        },

        setBroker(data){
            this.Load.shippers[data.index].id_custom_broker = data.data.id;
        },

        setShipper(data){
            this.Load.shippers[data.index].id_warehouse = data.data.id;
            this.Load.shippers[data.index].location = data.data.address + ', ' + data.data.city + ', ' + data.data.zip;
        },

        setCustomer(data){
            this.Load.id_customer = data.data.id;
        },

        setExecutor(data){
            this.Load.id_executor = data.data.id;
        },

        getLocationTypes(type) {
            type = [
                type,
                'all'
            ];
            return this.location_types.filter(function(item) {
                if(type.includes(item.only))
                    return item;
            })
        },

        getAdditional(type) {
            type = [
                type,
                'all'
            ];
            return this.additional_services.filter(function(item) {
                if(type.includes(item.only))
                    return item;
            })
        },

        saveTime(item){
            this.$refs.datedialog.save(date)
        },

        addTab(obj, loadgroup){
            var  item = this.loadItem;
            item.is_shipper = obj.is_shipper;
            this.Load[loadgroup].push(Vue.util.extend({}, item));
        },

        removeTab(obj, index){
            Vue.delete(this.Shipper.items, index);
        },

        resetExecutor(){
            this.Load.id_executor = null;
            this.$refs.executor.items = [];
            this.$refs.executor.searchInput = '';
            this.$refs.executor.localModel = null;
        },
        calculateRate(){
            this.Load.rate = 0;
            if(this.Load.init_rate)
                this.Load.rate = parseFloat(this.Load.init_rate);

            if(this.Load.lamper_type == 1)
                if(this.Load.lamper)
                    this.Load.rate += parseFloat(this.Load.lamper);
                 // - parseFloat(this.Load.crossdock) - parseFloat(this.Load.sum_charges) - parseFloat(this.Load.carrier_fee) + parseFloat(this.Load.driver_assist);
            if(this.Load.crossdock_type == 1)
                if(this.Load.crossdock)
                    this.Load.rate += parseFloat(this.Load.crossdock);
            if(this.Load.driver_assist_type == 1)
                if(this.Load.driver_assist)
                    this.Load.rate += parseFloat(this.Load.driver_assist);

            if(this.Load.sum_charges)
                this.Load.rate += parseFloat(this.Load.sum_charges);

            this.Load.income = this.Load.rate;
            if(this.Load.lamper_type == 0)
                if(this.Load.lamper)
                    this.Load.income -= parseFloat(this.Load.lamper);
            if(this.Load.crossdock_type == 0)
                if(this.Load.crossdock)
                    this.Load.income -= parseFloat(this.Load.crossdock);
            if(this.Load.driver_assist_type == 0)
                if(this.Load.driver_assist)
                    this.Load.income -= parseFloat(this.Load.driver_assist);
            if(this.Load.flat_rate)
                this.Load.income -= parseFloat(this.Load.flat_rate)
            if(this.Load.carrier_fee)
                this.Load.income -= parseFloat(this.Load.carrier_fee)

        },
        clearItemWarehouse(item){
            item.location = '';
        },
	    getEnv(variable){
			return process.env[variable]
	    }

    }
  }
</script>
