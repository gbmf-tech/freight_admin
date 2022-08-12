<template>
  <v-footer
    id="dashboard-core-footer"
  >
    <v-container>
        <div class="d-flex justify-end align-end">
            © Copyright 2021. All rights reserved. Powered by
            <a href="https://gbmf-studio.com" class="pa-0" style="height: max-content;">
                <img v-if="$vuetify.theme.dark" src="/img/logo/gbmf-white.svg" alt="" height="12px" class="ml-1">
                <img v-if="!$vuetify.theme.dark" src="/img/logo/gbmf-dark.svg" alt="" height="12px" class="ml-1">
            </a>
        </div>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'DashboardCoreFooter',

    data: () => ({
    }),
  }
</script>

<style lang="scss">
  footer.theme--light.v-footer{
      background: transparent;
      border-top: none !important;
  }
</style>
