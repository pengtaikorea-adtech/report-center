<template>
  <v-app id="agency">
    <v-app-bar app flat dark>
      <v-toolbar-title>PTK.Report Center</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <template v-for="rt in main_links">
          <v-btn :key="`ptk.agency.gnb-${rt.path}`"
            @click="$router.push(rt.path)"
            :icon="rt.icon" :text="rt.text" 
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
  data() {
    return {
      main_links: routes.filter((rt)=>rt.text || rt.icon),
    };
  }
}
</script>