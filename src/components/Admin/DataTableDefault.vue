<template>
    <v-data-table
        :headers="headers"
        :items="Object.values(items)"
        :search="search"
        sort-by="calories"
        class="datatabledefault elevation-0"
        @click:row="clickRow"
    >
        <template v-slot:top>
            <text-field-component
                v-if="!noSearchable"
                v-model="search"
                class="ml-8 mb-6"
                placeholder="Search"
                prepend-inner-icon="mdi-magnify"
                style="width: 350px;"
            />
            <v-dialog v-model="dialog" persistent :max-width="dialogwidth ? dialogwidth : `750px`">
                <validation-observer
                    ref="observer"
                    v-slot="{ invalid }"
                >
                    <v-form @submit.prevent="submit">
                        <v-card flat class="datatableform">
                            <v-card-text class="py-3 px-8">
                                <div class="text-22-60 py-2">
                                    {{ formTitle }}
                                </div>
                                <v-row>
                                    <slot name="inputs" :editItem="editedLocal"></slot>
                                </v-row>
                            </v-card-text>

                            <v-card-actions class="px-8">
                                <v-spacer></v-spacer>
                                <v-btn x-large color="black--text" depressed class="silver px-10 mr-6" @click="close">Cancel</v-btn>
                                <v-btn x-large color="white--text" depressed class="primary px-10 mx-0" type="submit" :disabled="invalid">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </validation-observer>
            </v-dialog>
        </template>
        <template v-for="name in itemSlots" v-slot:[name]="{ item }">
            <slot :name="name" :item="item"></slot>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                v-if="action.includes('show')"
                small
                class="mr-2"
                @click="showItem(item)"
            >
                mdi-eye
            </v-icon>
            <v-icon
                v-if="action.includes('edit')"
                dense
                @click.stop="editItem(item)"
                class="mr-2 datatableediticon"

            >
                mdi-pencil
            </v-icon>
            <v-icon
                v-if="action.includes('delete')"
                dense
                @click.stop="deleteItem(item)"
                class="datatabledeleteicon"
            >
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>
<script>
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import TextFieldComponent from '@/components/Base/CustomTextField'


export default {
    props: ['headers', 'actionroute', 'geturl', 'posturl', 'action', 'disablepagination', 'editedItem', 'itemSlots', 'dialogwidth', 'noSearchable'],
    components: {
        ValidationObserver,
        TextFieldComponent
    },
    data(){
        return {
            dialog: false,
            search: '',
            items: [],
            editedIndex: -1,
            editedLocal: this.editedItem,
            invalid: true,
        }
    },
    mounted() {},
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New ' + this.$store.state.title.title : 'Edit ' + this.$store.state.title.title
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
    },

    created () {
        this.initialize()
    },

    methods: {
        setCity(val){
            this.editedLocal.city = val.address.city
            this.editedLocal.id_city = val.id
            this.editedLocal.zip = val.address.postalCode
            this.editedLocal.state = val.address.stateCode
        },
        dialogchange(){
            this.dialog = !this.dialog
        },
        async initialize (url = null) {
            this.loading = true;
            if(!url)
                url = this.geturl;
            await this.axios
                .get(url).then(response => {
                    this.loading = false;
                    this.items = Object.values(response.data)
                });
        },

        showItem(item){
            this.$router.push({ name: this.actionroute + 'read', params: {id: item.id} })
        },

        editItem (item) {
            this.editedIndex = this.items.indexOf(item)
            this.editedLocal = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            const index = this.items.indexOf(item);
            let url = this.posturl ? this.posturl : this.geturl;

            confirm('Are you sure you want to delete this item?') && this.axios
                .delete(url + item.id).then(response => {
                    if(response.data == 1)
                        this.items.splice(index, 1);
                });
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedLocal = {}
                this.editedIndex = -1
            })
        },

        async submit () {
            this.$refs.observer.validate();
            var url = this.geturl;
            if(this.posturl) url = this.posturl;

            if (this.editedIndex > -1) {
                var item = this.items[this.editedIndex];
                var temp = this.editedLocal;

                delete this.editedLocal.created_at;
                delete this.editedLocal.updated_at;

                await this.axios
                    .put(url + item.id, this.editedLocal).then(response => {
                        if(response.data){
                            Object.assign(item, temp);
                        }
                    });
            } else {
                var temp = this.editedLocal;
                await this.axios
                    .post(url, this.editedLocal).then(response => {
                        if(response.data){
                            this.items.push(temp);
                            this.editedLocal = {};
                        }
                    });
            }
            this.initialize();
            this.close()
        },
        changeDefault(event){

        },
        clickRow(item){
            if(this.action.includes('show')){
                this.$router.push({ name: this.actionroute + 'read', params: {id: item.id} })}
        }
    },
}
</script>
<style lang="scss">
.datatabledefault.theme--light{
    thead{
        th{
            span{
                font-weight: 600;
                font-size: 14px;
                line-height: 22px;
                color: #484848;
            }
        }
    }
    tbody{
        td{
            font-size: 14px !important;
            line-height: 22px;
            color: #1F1F1F;
        }
    }
    .datatableediticon{
        color: #5496F0;
    }
    .datatabledeleteicon{
        color: #FF3700;
    }
    .v-input__slot::before{
        content: none!important;
    }
    .v-input__slot{
        background: #EDF2F9;
        border-radius: 5px;
        padding: 5px;
        .v-select__selections{
            padding: 0 10px;
        }
    }
    .v-data-footer__icons-before, .v-data-footer__icons-after{
        .v-btn .v-btn__content .v-icon{
            color: #1F1F1F !important;
        }
    }
}
.datatabledefault.theme--dark{
    thead{
        th{
            span{
                font-weight: 600;
                font-size: 14px;
                line-height: 22px;
                color: #8B97AE;
            }
        }
    }
    tbody{
        td{
            font-size: 14px !important;
            line-height: 22px;
            color: #ffffff;
        }
    }
    .datatableediticon{
        color: #5496F0;
    }
    .datatabledeleteicon{
        color: #FF3700;
    }
    .v-input__slot::before{
        content: none!important;
    }
    .v-input__slot{
        background: #2C364A;
        border-radius: 5px;
        padding: 5px;
        .v-select__selections{
            padding: 0 10px;
        }
    }
    .v-data-footer__icons-before, .v-data-footer__icons-after{
        .v-btn .v-btn__content .v-icon{
            color: #ffffff !important;
        }
    }
}
</style>
