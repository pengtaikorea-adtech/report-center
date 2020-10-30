<template>
    <v-container fluid>
      <v-row>
        <v-col md="6">
          <tool-card :toolProps="{dark:true, color:'primary', flat: true}">
            <template #card.tools.title>Campaign Status</template>
            <!-- default slot contents -->
            <v-card-text>
              <apexchart :options="chart.topBars" :series="serieses.topBars" />
              <v-divider /><v-spacer />
              <apexchart :options="chart.mediaArea" :series="serieses.mediaArea" />
              <v-divider /><v-spacer />
              <apexchart :options="chart.pfHits" :series="serieses.pfHits" />
            </v-card-text>
          </tool-card>
        </v-col>
        <v-col md="6">
          <tool-card :toolProps="{dark: true, color: 'secondary', flat: true}">
            <template #card.tools.title>Campaign Settings</template>
            <!-- default slot -->
            <v-card-text>
              <v-simple-table dark>
              </v-simple-table>
              <v-expansion-panels flat dark mandatory popout elevation="1">
                <!-- Settings: base -->
                <v-expansion-panel>
                  <v-expansion-panel-header>캠페인 기본 설정</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-input>
                      <v-text-field label="캠페인명" v-model="title" />
                      <span class="mx-4" />
                      <v-text-field label="총 예산 (KRW)" type="text" v-model="budget_text" />
                    </v-input>
                    <v-input>
                      <v-select label="담당 팀" :items="teams" v-model="team" readonly />
                      <span class="mx-4" />
                      <v-select label="담당자" :items="members" v-model="assignee" />
                    </v-input>
                    <v-input>
                      <v-text-field type="date" label="시작일" v-model="period_from" />
                      <span class="mx-3"> ~ </span>
                      <v-text-field type="date" label="종료일" v-model="period_till" />
                    </v-input>
                    <v-input>
                      <v-text-field label="제품" v-model="product" />
                      <span class="mx-4" />
                      <v-select label="캠페인 단계" v-model="phase" :items="['ecommerce','promotion','retarget','launch','prelaunch',]" />
                    </v-input>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- Settings: Media -->
                <v-expansion-panel>
                  <v-expansion-panel-header>매체 Media</v-expansion-panel-header>
                  <v-expansion-panel-content>

                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- Settings: LandingURL -->
                <v-expansion-panel>
                  <v-expansion-panel-header>랜딩 LandingURL</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-input>
                      <v-textarea outlined v-model="landing_urls" />
                    </v-input>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- Settingns: Contents -->
                <v-expansion-panel>
                  <v-expansion-panel-header>소재 Creatives</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>
                          <v-input>
                            <v-select :items="['text','image','slide','video']" v-model="creative_edit.type" />
                            <span class="mx-4" />
                            <v-text-field label="contentID" v-model="creative_edit.id" />
                          </v-input>
                        </v-list-item-title>
                        <v-list-item-action>
                          <v-btn icon @click="creative_append"><v-icon small>mdi-plus-circle</v-icon></v-btn>
                        </v-list-item-action>
                      </v-list-item>
                      <v-divider />
                      <v-list-item v-for="(cr, ci) in creatives" :key="`campaign-creative.${ci}`" two-line dense>
                        <v-list-item-content> 
                          <v-list-item-title>
                            {{ cr.id }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ cr.type }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn icon @click="creative_subtract(ci)"><v-icon small>mdi-close-circle</v-icon></v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <!-- Settings: Segments -->
                <v-expansion-panel>
                  <v-expansion-panel-header>세그먼트 Segments</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-textarea v-model="segment_text" outlined />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </tool-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import chartOptions from './chartOptions'
import chartDummy from './chartDummy'


export default {
  name: 'campaign-info',
  props: {
    campaign: Object,
    members: Array,
    teams: Array,
    tagnames: Array,
  },
  methods: {
    creative_append() {
      window.console.log(this.creative_edit);
      this.creatives.push(Object.assign({}, this.creative_edit));
      this.creative_edit = { id: null, type: null };
    },
    creative_subtract(index) {
      this.creatives.splice(index, 1);
    }
  },
  computed: {
    spending() {
      return Math.round(this.budget * Math.random());
    },
    budget_text : {
      get() { return this.budget ? this.budget.toLocaleString() : '-' },
      set(v) { this.budget = parseInt(v.replace(/[^\d]/g, '')) },
    },
    spending_rate() {
      return 100*this.spending / Math.max(1, this.budget);
    },
    period_rate() {
      return 100*Math.random();
    },
    landing_urls() {
      return this.landings.join('\n')
    },
    segment_text() {
      return (this.segments || []).join('\n')
    }
  },
  data() {
    return Object.assign({
      updated_at: null,
      period_from: '2020-09-01',
      period_till: '2020-09-30',
      budget: Math.round(10000*Math.random())*1e4,
      creative_edit: {
        id: null,
        type: null,
      },
      creatives: [],
      chart: chartOptions.dashboard,
      serieses: chartDummy.dashboard,


    },this.campaign);
  }
}
</script>

<style scoped>
.nowrap {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>