<template>
    <div class="block">
        <div class="block-header block-header-default">
            <h3 class="block-title"></h3>
        </div>
        <div class="block-content block-content-full">
            <child/>
        </div>
    </div>
</template>

<script>
export default {
    metaInfo () {
        return {
            title: 'Truck Types'
        }
    }
}
</script>
