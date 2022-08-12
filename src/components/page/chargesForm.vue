<template>
    <v-dialog v-model="main_dialog" max-width="800px">
        <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="sum_charges" background-color="silver" outlined flat v-bind="attrs" v-on="on" readonly class="mt-2" hide-details></v-text-field>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Accessorial Charges</span>
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="headers" :items="charges">
                    <template v-slot:top>
                        <v-btn color="primary" dark class="mb-2" @click="item_dialog = true" depressed>New Item</v-btn>
                        <v-dialog v-model="item_dialog" max-width="500px">
                            <v-card>
                                <v-card-title>Add Charge</v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" sm="12">
                                            <label for="">Charge</label>
                                            <v-text-field v-model="item.charge" label="Charge" hide-details background-color="silver" outlined flat></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12">
                                            <div class="d-flex">
                                                <div class=" mr-3">
                                                    <label for="">Add or Deduct</label>
                                                    <div class="py-3">
                                                        <v-radio-group v-model="item.type" class="createradiogroup" :row="true">
                                                            <v-radio :value="1" class="mr-0">
                                                                <template v-slot:label>
                                                                    <v-btn
                                                                        :color="item.type == 1 ? 'blue' : 'silver'"
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
                                                                        :color="item.type == 0 ? 'blue' : 'silver'"
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
                                                    <label for="">Amount</label>
                                                    <v-text-field v-model="item.amount" label="Amount" hide-details background-color="silver" outlined flat></v-text-field>
                                                </div>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="ChargesEditClose">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="ChargesEditSave">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon small class="mr-2" @click="ChargesEditItem(item)">mdi-pencil</v-icon>
                        <v-icon small @click="ChargesDeleteItem(item)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="ChargeClose">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['charges'],
    data: () => ({
        main_dialog: false,
        item_dialog: false,
        sum_charges: 0,
        item: {},
        index: -1,
        headers: [
            { text: 'Charge', value: 'charge' },
            { text: 'Amount', value: 'amount' },
            { text: 'Actions', value: 'actions' },
        ],
    }),
    methods: {
        ChargesEditClose(){
            this.item_dialog = false;
            this.$nextTick(() => {
                this.item = Object.assign({}, {})
                this.index = -1
            })
        },
        ChargesEditItem (item) {
            this.index = this.charges.indexOf(item)
            this.item = Object.assign({}, item)
            this.item_dialog = true
        },
        ChargesDeleteItem (item) {
            const index = this.charges.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.charges.splice(index, 1)
        },
        ChargesEditSave () {
            if (this.index > -1) {
                console.log(this.charges[this.index]);
                Object.assign(this.charges[this.index], this.item)
            } else {
                this.charges.push(this.item)
            }
            this.item_dialog = false;
            this.item = Object.assign({}, {})
            this.index = -1
        },
        ChargeClose(){
            this.main_dialog = false;
            this.sum_charges = 0;
            this.charges.forEach((item) => {
                this.sum_charges = parseFloat(this.sum_charges) + parseFloat(item.amount);
            });
            this.$emit('sum', this.sum_charges)
        },
    }
}
</script>
