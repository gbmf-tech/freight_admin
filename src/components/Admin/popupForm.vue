<template>
    <v-dialog v-model="dialog"  max-width="750px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="primary" v-bind="attrs" v-on="on">Create New</v-btn>
        </template>
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

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn x-large color="black--text" depressed class="silver px-10" @click="dialog = false">Cancel</v-btn>
                        <v-btn x-large color="white--text" depressed class="primary px-10" @click="save" :disabled="invalid">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </validation-observer>
    </v-dialog>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

export default {
    props: ['formTitle', 'postUrl'],
    components: {
        ValidationObserver,
    },
    data: () => ({
        dialog: false,
        editedLocal: {},
        invalid: true,
    }),
    methods: {
        async save () {
            await this.axios.post(this.postUrl, this.editedLocal)
            .then(response => {
                this.dialog = false;
                this.editedLocal = {};
            })
            .catch(error => {
                console.log(error.response);
            });
            this.dialog = false;
        },
    }
}
</script>
