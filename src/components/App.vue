<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <component :is="layout" v-if="layout" />
        </transition>
    </div>
</template>

<script>
const requireContext = require.context('@/layouts', false, /.*\.vue$/)
const layouts = requireContext.keys()
    .map(file => [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)])
    .reduce((components, [name, component]) => {
        components[name] = component.default || component
        return components
    }, {})

export default {
    el: '#app',
    data: () => ({
        layout: null,
        defaultLayout: 'default'
    }),
    metaInfo () {
        const { appName } = window.config

        return {
            title: appName,
            titleTemplate: `%s · ${appName}`
        }
    },

    methods: {
        setLayout (layout) {
            if (!layout || !layouts[layout])
                layout = this.defaultLayout
            this.layout = layouts[layout]
        }
    }
}
</script>
