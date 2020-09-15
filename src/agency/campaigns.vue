<template>
  <v-card>
    <v-toolbar flat dark :color="accent_color">
      <v-toolbar-title>Campaigns</v-toolbar-title>
      <v-spacer />
      <v-text-field label="캠페인 이름 검색" hide-details prepand-icon="mdi-magnify" />
      <v-toolbar-items>
        <v-btn icon ripple><v-icon>mdi-plus-circle</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-tabs vertical v-model="tabindex" :color="accent_color">
      <v-tab v-for="item in campaigns" :key="`campaign-list.${item.id}`">
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <v-tab-item>
    </v-tab-item>
    <v-card-actions>
    </v-card-actions>
  </v-card>
</template>

<script>
import dummy_campaigns from './dummy'

export default {
  name: 'campaigns',
  computed: {
    candidates() {
      return [];
    },
    teams() {
      return [];
    },
    the_campaign() {
      return (0<=this.tabindex && this.tabindex < this.campaigns.length)
        ? this.campaigns[this.tabindex]
        : {};
    }

  },
  data() {
    return {
      tabindex: 0,
      accent_color: 'blue',
      assignee: null,
      campaigns: dummy_campaigns,
    };
  }
}
</script>