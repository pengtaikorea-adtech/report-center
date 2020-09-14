<template>
  <v-container v-bind="$props">
    <v-row>
      <v-col>
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'container-single',
  data() {
    return {};
  }
}
</script>