<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <h4><slot name="header" /></h4>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-card flat>
        <v-card-title><slot name="title" /></v-card-title>
        <v-card-subtitle><slot name="subtitle" /></v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col>
              <slot />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'campaignExpansion',
  data() {
    return {};
  }
}
</script>

