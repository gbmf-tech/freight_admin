<template>
    <v-dialog v-model="main_dialog" max-width="800px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="borderedonly text-transform-none mt-2 mx-0 mr-5" style="border: 1px solid #91B9FB;" height="56" depressed v-bind="attrs" v-on="on" depressed :ripple="false">Manage load numbers</v-btn>
            <!-- <v-text-field background-color="silver" outlined flat v-bind="attrs" v-on="on" hide-details class="mt-2" append-icon="text-box-plus-outline"></v-text-field> -->
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Load Numbers</span>
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="headers" :items="numbers">
                    <template  v-slot:item.id_number_type="{ item }">
                        <span>{{numbertypes[item.id_number_type].name}}</span>
                    </template>
                    <template v-slot:top>
                        <v-btn color="primary" dark class="mb-2" @click="item_dialog = true" depressed>New Item</v-btn>
                        <v-dialog v-model="item_dialog" max-width="500px">
                            <v-card>
                                <v-card-title>Add Load Number</v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" sm="6">
                                            <label for="">Type of number</label>
                                            <v-select
                                                v-model="current.id_number_type"
                                                :items="Object.values(numbertypes)"
                                                item-text="name"
                                                item-value="id"
                                                background-color="silver"
                                                outlined
                                                flat
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <label for="">Value</label>
                                            <v-text-field
                                                v-model="current.number"
                                                placeholder="Value"
                                                hide-details
                                                background-color="silver"
                                                outlined
                                                flat></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="itemDialogClose">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="itemDialogSave">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="main_dialog = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="numbersSave()">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['items'],
    data: () => ({
        main_dialog: false,
        item_dialog: false,
        headers: [
            { text: 'Load Number Type', value: 'id_number_type' },
            { text: 'Value', value: 'number' },
            { text: 'Actions', value: 'actions' },
        ],
        numbers: [],
        numbertypes: [],
        editIndex: -1,
        current: {},
    }),
    mounted(){
        this.getNumberTypes();
    },
    watch: {
        items: function(){
            this.numbers = this.items;
        }
    },
    methods: {
        getNumberTypes(){
            this.axios.get(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/numberstypes/v1/numberstype').then(response => {
                this.numbertypes = response.data;
            })
        },
        itemDialogClose(){
            this.item_dialog = false;
            this.$nextTick(() => {
                this.current = Object.assign({}, {})
                this.editIndex = -1;
            })
        },
        itemDialogSave(){
            if (this.editIndex > -1) {
                console.log('ifenter');
                console.log(this.current);
                console.log(this.numbers);
                console.log(this.editIndex);
                Object.assign(this.numbers[this.editIndex], this.current)
            } else {
                this.numbers.push(this.current)
            }
            this.item_dialog = false;
            this.current = Object.assign({}, {})
            this.editIndex = -1
        },
        editItem (item) {
            this.editIndex = this.numbers.indexOf(item)
            this.current = Object.assign({}, item)
            this.item_dialog = true
        },
        deleteItem (item) {
            const index = this.numbers.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.numbers.splice(index, 1)
        },
        numbersSave(){
            this.main_dialog = false;
            this.$emit('save', this.numbers);
        }
    }
}
</script>
