<template>
    <div class="">
        <v-autocomplete
            v-model="localModel"
            :loading="loading"
            :items="items"
            :search-input.sync="searchInput"
            :placeholder="label"
            v-bind="$attrs"
            v-on="$listeners"
            hide-details
            :item-text="itemtext ? itemtext : `name`"
            item-value="id"
            clearable
            flat
            hide-details
            background-color="silver"
            outlined
            class="mt-2"
        >
            <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                    <div @click="exportData(data)">
                        <slot name="result" :data="data"></slot>
                    </div>
                </template>
            </template>
            <template v-slot:no-data>
                <div class="px-4">
                    Items Not Found
                    <popup-form :formTitle="formTitle" :postUrl="postUrl">
                        <template v-slot:inputs="{editItem}">
                            <slot name="popup" :editItem="editItem"></slot>
                        </template>
                    </popup-form>
                </div>
            </template>
        </v-autocomplete>
    </div>
</template>
<script>
// import gettersMixin from '@/mixins/gettersMixin'
import PopupForm from '@/components/Admin/popupForm'
export default {
    // mixins: [gettersMixin],
    props: ['model', 'index', 'label', 'request', 'formTitle', 'postUrl', 'itemtext'],
    components: {
        PopupForm,
    },
    data: () => ({
        dialog: false,
        localModel: false,
        loading: false,
        items: [],
        searchInput: ''
    }),
    mounted(){
        if(this.model)
            this.localModel = this.model
    },
    watch: {
        searchInput(val){
            if(val && val.length > 1) {
                this.loading = true
                this.getItems(val, this.request.type);
            }
            if(!val || val.length == 0) {
                this.loading = false
                this.items = [];
            }
        },
    },
    methods: {
        async getItems(val, type){
            var api = this.request.url;
            if(val){
                api += 'search/' + val;
                if(type)
                    api += '/' + type;
            }
            await this.axios
                .get(api).then(response => {
                    this.items = response.data;
                    this.loading = false;

                });
        },
        exportData(data){
            this.$emit('setItem', {
                data: data.item,
                index: this.index
            });
        }
    }

}
</script>

<style lang="css" scoped>
</style>
