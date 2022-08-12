<template>
    <div class="">
        <v-text-field
            v-bind="$attrs"
            v-on="$listeners"
            :value="value"
            @input="$emit('update', $event)"
            background-color="silver"
            outlined
            flat
            hide-details="auto"
            class="mt-2">
        </v-text-field>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: ["value", "label"],
    model: {
        prop: "value",
        event: "update"
    }
};
</script>
