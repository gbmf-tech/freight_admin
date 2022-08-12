<template>
    <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="localDate"
        persistent
        width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="localDate"
                placeholder="Date"
                append-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
                readonly
                background-color="silver"
                outlined
                flat
                class="mt-2"
            ></v-text-field>
        </template>
        <v-date-picker v-model="localDate" :min="min" scrollable color="#5496f0">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="save(localDate)">OK</v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script>
export default {
    props: ['date', 'index', 'min'],
    data: () => ({
        localDate: new Date().toISOString().substr(0, 10),
        // formattedDate: new Date().toISOString().substr(0, 10),
        // formattedDate: new Date().toLocaleDateString("en-US"),
        modal: false,
    }),
    mounted(){
        if(this.date)
            this.localDate = this.date
    },
    watch: {
      localDate (val) {
        this.formattedDate = this.formatDate(val)
      },
    },
    methods: {
        save(localDate){
            this.$refs.dialog.save(localDate);
            this.$emit('setDate', {
                index: this.index,
                date:localDate
            });
        },
        formatDate(item){
            var data = new Date(item);
            return data.toISOString().substr(0, 10);
            // return data.toLocaleDateString("en-US");
        },
    }
}
</script>
