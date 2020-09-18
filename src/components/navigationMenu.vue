<template>
  <v-list-item one-line dense>
    <v-list-item-title>{{ label }}</v-list-item-title>
    <v-list-item-subtitle>{{ value || 'all' }}</v-list-item-subtitle>
    <v-list-item-action>
      <v-menu offset-x>
        <template #activator="{ on }">
          <v-btn icon v-on="on" @click="$emit('select', null)">
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item,idx) in items" @click="$emit('select', item)"
            :key="`simple.menu.${Date.now()}.${idx}`">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'navigation-menu',
  model: {
    prop: 'value',
    event: 'select',
  },
  props: {
    items: Array,
    value: {type: String, default: null},
    label: {type: String, default: 'Select'}
  },
  data() {
    return {
      // value: null,
    }

  }
}
</script>