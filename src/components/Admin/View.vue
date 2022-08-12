<template>
    <v-main>
        <v-container fluid class="">
            <router-view />
        </v-container>
        <dashboard-core-footer />
    </v-main>
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreFooter: () => import('./Footer'),
    },
  }
</script>
<style lang="scss">
    .v-main__wrap{
        justify-content: space-between !important;
        flex-direction: column !important;
        display: flex !important;
    }
</style>
