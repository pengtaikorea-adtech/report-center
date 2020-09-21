<template>
  <router-view />
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
