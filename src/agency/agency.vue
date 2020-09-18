<template>
  <v-app id="agency">
    <v-navigation-drawer app v-if="navigation" v-model="show_drawer">
      <v-list-item>
        <v-list-item-title>
          {{ navigation.title }}
        </v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item v-for="(nav,ni) in navigation.items" :key="`agency-nav.${ni}`"
        @click="$store.state.commit('select_instance', nav)">
        <v-list-item-title>
          {{ nav[navigation.text_key] }}
        </v-list-item-title>
      </v-list-item>
    </v-navigation-drawer>
    <v-app-bar app flat dark>
      <v-app-bar-nav-icon @click="show_drawer = !show_drawer" />
      <v-toolbar-title>PTK.Report Center</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <template v-for="rt in main_links">
          <v-btn :key="`ptk.agency.gnb-${rt.path}`"
            @click="$router.push(rt.path)"
            :icon="!!rt.icon" :text="!!rt.text" 
            ripple :title="rt.title || rt.text">
            <v-icon v-if="rt.icon">{{ rt.icon }}</v-icon>
            <template v-if="rt.text">{{ rt.text }}</template>
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import routes from './routes'

export default {
  name: 'App',
  methods: {
  },
  computed: {
    navigation() {
      return this.$store.state.navigation;
    }
  },
  data() {
    return {
      show_drawer: true,
      main_links: routes.filter((rt)=>rt.text || rt.icon),
    };
  }
}
</script>