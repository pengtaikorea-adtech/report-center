<template>
  <v-app id="app">
    <navigations />
    <appbar />
    <v-main>
      <container-single fluid align="center">
        <v-sheet>
          <router-view />          
        </v-sheet>
      </container-single>
    </v-main>

    <appfooter />
  </v-app>
</template>

<script>

import navigations from '@/components/navigations'
import appbar from '@/components/appbar'
import appfooter from '@/components/appfooter'

export default {
  name: 'App',
  components: {
    navigations,
    appbar,
    appfooter,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
