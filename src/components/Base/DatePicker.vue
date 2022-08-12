<template>
    <v-dialog
        :ref="dialog"
        v-model="local_modal"
        persistent
        width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="local_model"
                label="DOT Expiry Date"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker v-model="local_model" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="local_modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="save(local_model)">OK</v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script>
export default {
    props: ['model', 'modal', 'dialog'],
    data(){
        return {
            local_modal: false,
            local_model: this.model
        }
    },
    methods:{
        save(local_model){
            this.$refs[this.dialog].save(local_model);
            this.$emit('input', local_model);
            this.local_modal = false;
        }
    }

}
</script>
