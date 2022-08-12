<template>
    <v-autocomplete
        v-model="city"
        :items="items"
        :search-input.sync="search"
        background-color="silver"
        outlined
        class="mt-2"
        hide-no-data
        hide-details
        item-text="label"
        placeholder="City"
        return-object
        @input="returnCityData()"
    >

        <!-- <template v-slot:item="data">
            {{ data.address.state }}, {{ data.address.city}}, {{data.address.postalCode}}
        </template> -->
    </v-autocomplete>
</template>

<script>
export default {
    data:() =>  ({
        city: null,
        items: [],
        search: '',
    }),
    watch: {
        search: function(val) {
            val && val !== this.select && val !== 'null' && val.length > 2 && val.length < 15 && this.querySelections(val)
            if(val && val.length <= 2)
                this.items = [];
        },
    },
    methods: {
        querySelections(v) {
            this.axios.get(process.env.VUE_APP_AXIOS_DOMAIN + '/api/sudo/countries/v1/addressfind/' + v).then(response => {
                this.items = response.data.items.filter(item => {

                    if(['street', 'locality'].indexOf(item.resultType) < 0)
                        return false;

                    if(!('city' in item.address))
                        return false;

                    item.label = item.address.stateCode + ', ' + item.address.city + ', ' + item.address.postalCode
                    return item
                })
            }).catch(error => {
                console.log(error);
            })
        },
        returnCityData(){
            this.$emit('setCity', this.city)
        }
    },
}
</script>
