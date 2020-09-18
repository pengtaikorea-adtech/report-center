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
const dummy_campaigns = [
  { title: '8K Playground', 
    name: 'playground8k',
    landings: ['https://www.samsung.com/sec/8k/playground/'],
    tags: ['t1', 'Lois'],  },
  { title: '비스포크 웨딩샵', 
    tags: ['t3', 'Peach'], 
    landings: ['https://www.samsung.com/sec/eventList/bespoke'], },
  { title: 'TV 보상판매', 
    tags: ['t1', 'Erin'], 
    landings: ['https://www.samsung.com/sec/eventList/tv_tradein'], },
  { title: '갤럭시20', 
    tags: ['t1', 'Jade'], 
    landings: ['https://www.samsung.com/sec/event/galaxy20-launch', 'https://www.samsung.com/sec/event/galaxy20-preview'] }, 
].map((c,i)=>Object.assign({id:i+1}, c));

export default {
  name: 'campaigns',
  mounted() {
    // 
    this.$store.commit('transition', [
      'Campaigns',
      { title: 'Campaigns',
        tags: [['t1','t2','t3'], ['Peach','Lois','Erin','Jade']],
        text_key: 'title',
        items: dummy_campaigns,
      }
    ])

  },
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