<template>
    <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="localTime"
        persistent
        width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="localTime"
                placeholder="Time"
                append-icon="mdi-clock-time-four-outline"
                v-bind="attrs"
                v-on="on"
                readonly
                background-color="silver"
                outlined
                flat
                class="mt-2"
            ></v-text-field>
        </template>
        <v-time-picker v-model="localTime" scrollable format="24hr" color="#5496f0">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="save(localTime)">OK</v-btn>
        </v-time-picker>
    </v-dialog>
</template>

<script>
export default {
    props: ['time', 'index'],
    data: () => ({
        localTime: '',
        modal: false,
    }),
    mounted(){
        if(this.time)
            this.localTime = this.time
    },
    methods: {
        save(localTime){
            this.$refs.dialog.save(localTime);
            this.$emit('setTime', {
                index: this.index,
                time:localTime
            });
        }
    }
}
</script>
