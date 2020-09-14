<template>
  <v-navigation-drawer app>
    <v-list>

    </v-list>
  </v-navigation-drawer>
</template>
<script>
import routes from '@/views/routes'

export default {
  name: 'navigations',
  data() {
    return {
      routes,
    };
  }
}
</script>