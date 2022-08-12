<template>
    <v-card :loading="loading">
        <v-card-title class="d-block">
            <div class="d-block">
                {{model.name}}
                <span v-if="typeof model.driver == 'object' && model.driver != null" class="">& {{model.driver.name}}</span>
            </div>
            <div class="d-block">
                Status: <span v-if="typeof model.status == 'object'" class="primary--text">{{model.status.status}}</span>
            </div>
        </v-card-title>
        <v-card-text>

        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['model'],
    data: () => ({
        loading: true
    }),
    mounted: function(){
        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }
}
</script>
