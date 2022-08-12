<template>
    <div class="d-flex align-center justify-center" style="height:100%">
        <v-card
            width="560"
            class="login pa-5"
            flat
        >
            <v-form @submit.prevent="login" @keydown="form.onKeydown($event)" class="d-block w-100">
                <v-card-text class="px-0">
                    <div class="text-28-60 py-2 mb-4">
                        Manager Authorization
                    </div>
                    <div class="">
                        <div class="">
                            <label>Email</label>
                            <v-text-field
                                v-model="form.email"
                                placeholder="Email"
                                background-color="silver"
                                outlined
                                flat
                                hide-details
                                class="mt-2"
                                :class="{'is-invalid': form.errors.has('email')}"
                                v-on:keyup.enter="onEnter">
                            </v-text-field>
                        </div>
                        <div class="mt-6">
                            <label>Password</label>
                            <v-text-field
                                v-model="form.password"
                                placeholder="Password"
                                background-color="silver"
                                outlined
                                flat
                                hide-details
                                class="mt-2"
                                :class="{'is-invalid': form.errors.has('password')}"
                                :type="show ? 'text' : 'password'"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show = !show"
                                v-on:keyup.enter="onEnter"
                                >
                            </v-text-field>
                        </div>
                    </div>
                </v-card-text>

                <v-card-actions class="mt-4 px-0">
                    <v-btn
                        x-large
                        class="primary"
                        width="100%"
                        @click="login"
                        depressed
                        :ripple="false"
                    >
                        Login
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import Form from 'vform'

export default {
  middleware: 'guest',
  layout: 'admin',

  metaInfo () {
    return { title: 'login' }
  },

    data: () => ({
        show: false,
        form: new Form({
            email: '',
            password: ''
        }),
        remember: false
    }),

    methods: {
        onEnter(){
            this.login()
        },
        async login () {
            // Submit the form.
            const { data } = await this.form.post(process.env.VUE_APP_AXIOS_DOMAIN + '/api/login')

            // Save the token.
            this.$store.dispatch('auth/saveToken', {
                token: data.token,
                remember: this.remember
            })

            // Fetch the user.
            await this.$store.dispatch('auth/fetchUser')

            // Redirect home.
            this.$router.push({ name: 'admin.loads' })
        }
    }
}
</script>
<style lang="scss">
    .v-card.login{
        border-radius: 10px;
    }
</style>
