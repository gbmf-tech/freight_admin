<template>
    <v-dialog v-model="main_dialog" max-width="800px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="borderedonly text-transform-none mt-2 mx-0 mr-5" style="border: 1px solid #91B9FB;" height="56" depressed v-bind="attrs" v-on="on" depressed :ripple="false">Manage load documents <v-icon>mdi-file-outline</v-icon></v-btn>
            <!-- <v-text-field background-color="silver" outlined flat v-bind="attrs" v-on="on" hide-details class="mt-2" append-icon="text-box-plus-outline"></v-text-field> -->
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Load Documents</span>
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="headers" :items="documents">
                    <template v-slot:item.id_type="{ item }">
                        <v-select
                            v-if="!item.id"
                            v-model="item.id_type"
                            :items="Object.values(documenttypes)"
                            item-text="name"
                            item-value="id"
                            background-color="silver"
                            outlined
                            flat
                            class="mt-2"
                            hide-details
                        ></v-select>

                        <span v-if="item.id">{{documenttypes[item.id_type].name}}</span>
                    </template>
                    <template v-slot:item.filename="{ item }">
                        <div v-if="!item.id" class="">
                            <label for="File input"></label>
                            <v-file-input
                                v-model="item.filename"
                                background-color="silver"
                                outlined
                                flat
                                class="mt-2"
                                hide-details
                                @change="selectFile($event, item)"
                            ></v-file-input>
                        </div>
                        <div v-if="item.id" class="">
                            <label for="File"></label>
                            <a :href="`/storage/app/documents/`+ item.id_load +`/`+ item.filename" class="answer text-14" download v-html="item.filename"></a>
                        </div>
                    </template>
                    <template v-slot:top>
                        <v-btn color="primary" dark class="mb-2" @click="addDocument" depressed>Add Document</v-btn>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="main_dialog = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="documentsSave()">Save</v-btn>
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
            { text: 'Load Document Type', value: 'id_type', width: '250px' },
            { text: 'Values', value: 'filename' },
            { text: 'Actions', value: 'actions' },
        ],
        documents: [],
        documenttypes: [],
        editIndex: -1,
        current: {},
        defaultDocument: {
            id: null,
            id_type: null,
            filename: null
        }
    }),
    mounted(){
        this.getDocumentsTypes();
    },
    watch: {
        items: function(){
            this.documents = this.items;
        }
    },
    methods: {
        selectFile(event, item){
            item.filename = event;
        },
        getDocumentsTypes(){
            this.axios.get(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/loads/v1/files/types').then(response => {
                this.documenttypes = response.data;
            })
        },
        addDocument(){
            this.documents.push(Vue.util.extend({}, this.defaultDocument));
        },
        deleteItem (item) {
            if(item.id)
                this.axios.delete(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/loads/v1/files/delete/'+ item.id);
            const index = this.documents.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.documents.splice(index, 1)
        },
        documentsSave(){
            this.main_dialog = false;
            this.$emit('save', this.documents);
        }
    }
}
</script>
