<template>
    <v-app>
        <dashboard-core-app-bar v-show="!preloader" @toggle-drawer="changeDrawer" />

        <dashboard-core-drawer ref="drawer" v-show="!preloader"/>

        <dashboard-core-view v-show="!preloader"/>

        <preloader v-show="preloader" />
    </v-app>
</template>

<script>
import Preloader from '@/components/page/preloader.vue'
export default {
    name: 'DashboardIndex',
    components: {
        Preloader
    },
    data: () => ({
        drawer: false,
        preloader: true,
    }),
    watch:{
        $route (to, from){
            if(this.$store.getters['auth/check'])
                this.$refs.drawer.drawer = true;
        },

    },
    created(){
        if(this.$store.getters['auth/check']){
            setTimeout(() => this.preloader = false, 4000);
        }else{
            this.preloader = false
        }
    },
    mounted(){
        if(this.$store.getters['auth/check'])
            this.$refs.drawer.drawer = true;
        this.$store.watch(
            state => state.auth.user,
            (value) => {
                if(value){
                    if(this.$store.getters['auth/check']){
                        this.preloader = true;
                        setTimeout(() => this.preloader = false, 4000);
                    }else{
                        this.preloader = false
                    }
                }
            }
        )
    },
    methods: {
        changeDrawer(){
            if(this.$store.getters['auth/check'])
                this.$refs.drawer.drawer = true;
        }
    }
}
</script>
