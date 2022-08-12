<template>
    <div>
        <!-- <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item v-for="item in items" :key="item.text" link>
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="mr-12 align-center">
                <span class="title">Alpha Exp</span>
            </v-toolbar-title>
        </v-app-bar> -->
        <v-navigation-drawer v-model="drawer" app clipped >
          <v-list dense>
            <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <!-- <v-app-bar app clipped-left>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar> -->
    </div>
</template>

<script>
export default {
    name: 'AdminAppMenu',
    data: () => ({
        drawer: false,
        items: [
            { icon: 'mdi-trending-up', text: 'Most Popular' },
            { icon: 'mdi-youtube-subscription', text: 'Subscriptions' },
            { icon: 'mdi-history', text: 'History' },
            { icon: 'mdi-playlist-play', text: 'Playlists' },
            { icon: 'mdi-clock', text: 'Watch Later' },
        ],
    }),
}
</script>
