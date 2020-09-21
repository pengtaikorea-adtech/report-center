<template>
  <v-app id="campaigns">
    <!-- appbar -->
    <v-app-bar app dark>
      <v-toolbar-title @click="nav_visible = !nav_visible">
        <v-app-bar-nav-icon />
        Campaigns
      </v-toolbar-title>
    </v-app-bar>
    <!-- Navigations: select campaign -->
    <v-navigation-drawer app v-model="nav_visible">
      <v-list-item @click="nav_filter_visible = !nav_filter_visible">
        <v-list-item-avatar><v-icon>mdi-filter</v-icon></v-list-item-avatar>
        <v-list-item-title>campaign filter</v-list-item-title>
        <v-list-item-action>
          <v-btn icon>
            <v-icon>mdi-unfold-{{ nav_filter_visible ? 'less':'more' }}-horizontal</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider v-show="nav_filter_visible" />
      <v-list-item v-show="nav_filter_visible">
        <v-list>
          <v-list-item dense>
            <v-text-field hide-details label="search by name" prepend-icon="mdi-magnify" v-model="filter_name" />
          </v-list-item>
          <!-- campaign name search -->
          <navigation-menu label="Team" :items="teams" :btn="{small:true}" v-model="filter_team" />
          <navigation-menu label="담당자" :items="members" :btn="{small:true}" v-model="filter_member" />
          <navigation-menu label="태그" :items="tags" v-model="filter_tag" />
        </v-list>          
      </v-list-item>
      <!-- campaign tag search -->
      <v-divider />
      <!-- campaign list (main) -->
      <v-list-item-group v-model="campaign_selected_id" color="accent">
        <template v-for="cpn in campaigns">
          <v-list-item two-line :key="`nav-campaign-${cpn.id}`" :value="cpn.id">
            <v-list-item-content>
              <v-list-item-title>{{ cpn.title }}</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip x-small>#{{ cpn.team }} </v-chip>
                <span v-for="a in cpn.assignee" :key="`nav-campaign-${cpn.id}-assigned.${a}`">
                  #{{ a }}
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon ripple><v-icon>mdi-chevron-right</v-icon></v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-navigation-drawer>
    <v-main>
      <container-single>
        <v-card flat>
          <!-- campaign toolbar -->
          <v-toolbar elevation="1" dark dense>
            <v-toolbar-title>
              {{ the_campaign ? the_campaign.name : 'No Campaign' }}
            </v-toolbar-title>
            <v-spacer />
            <v-toolbar-items v-if="the_campaign">
              <v-tabs v-model="tabindex">
                <v-tab>Info</v-tab>
                <v-tab>Media/CID</v-tab>
                <v-tab>Report</v-tab>
              </v-tabs>
            </v-toolbar-items>
          </v-toolbar>
          <template v-if="the_campaign">
            <template v-for="(comp,ci) in ['info','media','report']">
              <component v-show="tabindex==ci" :key="`campaign-main.${ci}.${campaign_selected_id}`" :is="`campaign-${comp}`"
                :campaign.sync="the_campaign"
                :teams.sync="teams_raw"
                :members.sync="members_raw"
                :tagnames.sync="tags_raw"
              />
            </template>
          </template>
          <!-- no campaign selected -->
          <template v-else>
            선택한 캠페인이 없습니다
          </template>
        </v-card>
      </container-single>
    </v-main>
  </v-app>
</template>

<script>
import navigationMenu from '@/components/navigationMenu'

import campaignInfo from './campaignInfo'
import campaignMedia from './campaignMedia'
import campaignReport from './campaignReport'

const dummy_campaigns = [
  { title: '8K Playground', 
    name: 'playground8k',
    team: 't1',
    assignee: ['Lois'],
    landings: ['https://www.samsung.com/sec/8k/playground/'],
    tags: ['TV', '8K', 'QLED'] },
  { title: '비스포크 웨딩샵', 
    name: 'bespoke_wed',
    team: 't3',
    assignee: ['Peach'],
    landings: ['https://www.samsung.com/sec/eventList/bespoke'], 
    tags: ['냉장고','주방가전','Bespoke','웨딩','프로모션'] },
  { title: 'TV 보상판매', 
    name: 'tv_tradein',
    team: 't1',
    assignee: ['Erin'],
    landings: ['https://www.samsung.com/sec/eventList/tv_tradein'], 
    tags: ['TV','보상판매','8K']},
  { title: '갤럭시20', 
    name: 'galaxy-s20_launch',
    team: 't1',
    assignee: ['Jade'],
    landings: ['https://www.samsung.com/sec/event/galaxy20-launch', 'https://www.samsung.com/sec/event/galaxy20-preview'],
    tags: ['모바일','갤럭시','런칭'] }, 
].map((c,i)=>Object.assign({id:i+1}, c));

export default {
  name: 'campaigns',
  components: {
    navigationMenu,
    campaignInfo,
    campaignMedia,
    campaignReport,
  },
  watch: {
    campaign_selected_id() {
      if(this.campaign_selected_id) {
        this.tabindex = 0;
        this.nav_visible = false;
      }
    }
  },
  methods: {
    tag_group_item(grp) {
      return this[grp.value];
    },
    filter_values(arr, valueFn) {
      return arr.reduce((m,v)=>m.concat(valueFn(v)), [])
        .filter((v,i,vs)=>vs.indexOf(v)==i)
        .sort();
    }
  },
  computed: {
    members() {
      return this.filter_values(this.campaigns, (c)=>c.assignee);
    },
    members_raw() {
      return this.filter_values(this.items, (c)=>c.assignee);
    },
    teams() {
      return this.filter_values(this.campaigns, (c)=>[c.team]);
    },
    teams_raw() {
      return this.filter_values(this.items, (c)=>[c.team]);
    },
    tags() {
      return this.filter_values(this.campaigns, (c)=>c.tags);
    },
    tags_raw() {
      return this.filter_values(this.items, (c)=>c.tags);
    },
    campaigns() {
      return this.items
        .filter((c)=>!this.filter_name || (c.name && c.name.includes(this.filter_name)) || (c.title && c.title.includes(this.filter_name)))
        .filter((c)=>!this.filter_team || (c.team && c.team.includes(this.filter_team)))
        .filter((c)=>!this.filter_member || (c.assignee && c.assignee.includes(this.filter_member)))
        .filter((c)=>!this.filter_tag || (c.tags && c.tags.includes(this.filter_tag)));
    },
    the_campaign() {
      let sl = this.campaigns.filter((c)=>c.id==this.campaign_selected_id);
      return 0<sl.length ? sl[0] : null;
    }
  },
  data() {
    return {
      nav_visible: true,
      nav_filter_visible: false,
      accent_color: 'blue',
      assignee: null,
      items: dummy_campaigns,
      campaign_selected_id: null,
      // the_campaign: null,
      filter_name: null,
      filter_team: null,
      filter_member: null,
      filter_tag: null,
      filter_groups: [
        {title: 'Team', value: 'teams'},
        {title: '담당자', value: 'members'},
        {title: '태그', value: 'tags'},
      ],

      tabindex: 0,
    };
  }
}
</script>