<template>
    <v-main class="pa-0">
        <div class="d-flex preloader h-100 justify-center align-center">
            <v-card class="py-10 px-16 text-center" flat >
                <img v-if="!$vuetify.theme.dark" src="/img/logo/newblack.svg" alt="" width="150px" class="my-5  text-center">
                <img v-if="$vuetify.theme.dark" src="/img/logo/newwhite.svg" alt="" width="150px" class="my-5  text-center">
                <div class="text-28-60 text-center">
                    Welcome back,<br/>
                    {{getUserName()}}
                </div>
            </v-card>
        </div>
    </v-main>
</template>

<script>
export default {
    methods:{
        getUserName(){
            if(this.$store.state.auth.user && this.$store.state.auth.user.name)
                return this.$store.state.auth.user.name
            return ''
        }
    }
}
</script>
<style lang="scss">
    .preloader{

    }
</style>
