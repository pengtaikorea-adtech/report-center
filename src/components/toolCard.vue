<template>
  <v-card v-bind="cardProps">
    <v-toolbar v-bind="toolProps" flat dense>
      <slot name="card.tools">
        <v-toolbar-title>
          <slot name="card.tools.title" />
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items> 
          <slot name="card.tools.items" />
        </v-toolbar-items>
      </slot>
    </v-toolbar>
    <slot>
      <v-card-text>
      </v-card-text>
    </slot>
    <slot name="card.actions" />
  </v-card>
</template>

<script>
export default {
  name: 'tool-card',
  props: [
    'cardProps',
    'toolProps',
  ],
  data() {
    return {};
  },
}
</script>
