<template>
    <div>
        <v-app-bar app flat class="bg-primary" height="87">
            <!-- <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')"></v-app-bar-nav-icon> -->
            <v-toolbar-title class="mr-12 align-center">
                <span class="title" v-html="$store.state.title.title"></span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <img v-show="!$vuetify.theme.dark" src="/img/svg/light.svg" @click="setTheme(!$vuetify.theme.dark)" style="cursor:pointer">
            <img v-show="$vuetify.theme.dark" src="/img/svg/dark.svg" @click="setTheme(!$vuetify.theme.dark)" style="cursor:pointer">
            <!-- <v-switch
                v-model="$vuetify.theme.dark"
                inset
                persistent-hint
                @click="setTheme"
                hide-details
            ></v-switch> -->
            <v-btn @click.prevent="logout" text depressed :ripple="false" class="remove-hover">Logout</v-btn>
        </v-app-bar>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
  export default {
    name: 'DashboardCoreAppBar',
    props: ['drawer'],
    mounted(){
        this.getTheme();
    },
    methods: {
        async logout () {
            await this.$store.dispatch('auth/logout')
            this.$router.push({ name: 'login' })
        },
        setTheme(theme){
            this.$vuetify.theme.dark = theme;
            Cookies.set('dark', theme, { expires: 365 })
        },
        getTheme(){
            if(Cookies.get('dark'))
                this.$vuetify.theme.dark = Cookies.get('dark') == 'false' ? false : true;
        }


    }
  }
</script>
