<template>
  <v-list-item three-line>
    <v-list-item-content>
      <v-list-item-title>{{ itemTitle }}</v-list-item-title>
      <v-progress-linear :value="progress" striped :color="color" height="10" />
      <v-list-item-subtitle>{{ itemSubtitle }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'statusProgressItem',
  props: {
    itemTitle: String,
    itemSubtitle: String,
    progress: Number,
    color: undefined,
  },
  mounted() {
    window.console.log(this.$props)
  },
  data() { return {}; }
}
</script>