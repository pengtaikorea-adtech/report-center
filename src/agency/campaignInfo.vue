<template>
    <v-container fluid>
      <v-row>
        <v-col md="6">
          <tool-card :toolProps="{dark:true, color:'primary', flat: true}">
            <template #card.tools.title>{{ title }} Status</template>
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
            <template #card.tools.title>Settings</template>
            <!-- default slot -->
            <v-card-text>
              <v-form>
                <v-subheader>캠페인 기본 설정</v-subheader>
                <v-text-field label="캠페인명" v-model="title" />
                <v-input>
                  <v-text-field type="date" label="시작일" v-model="period_from" />
                  <span class="mx-4"> ~ </span>
                  <v-text-field type="date" label="종료일" v-model="period_till" />
                </v-input>
                <v-text-field label="총 예산 (KRW)" type="text" v-model="budget_text" />
                <v-input>
                  <v-select label="담당 팀" :items="teams" v-model="team" />
                  <span class="mx-4">&nbsp;</span>
                  <v-select label="담당자" :items="members" v-model="assignee" />
                </v-input>

                <v-divider />
                
                <v-subheader>LandingURL</v-subheader>
                <v-input>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        <v-text-field placeholder="https://new-landing-page-url" />
                      </v-list-item-title>
                      <v-list-item-action>
                        <v-btn icon><v-icon small>mdi-plus-circle</v-icon></v-btn>
                      </v-list-item-action>
                    </v-list-item>
                    <v-list-item style="max-width: 100%;" v-for="url in landings" :key="`camp.landing-${url}`">
                      <v-list-item-title class="nowrap" :title="url">{{ url }}</v-list-item-title>
                      <v-list-item-action>
                        <v-btn icon><v-icon small>mdi-close-circle</v-icon></v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-input>

                <v-divider />
                
                <v-subheader>Contents</v-subheader>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>
                      <v-input>
                        <v-select :items="['text','image','slide','video']" />
                        <span class="mx-4" />
                        <v-text-field label="contentID" />
                      </v-input>
                    </v-list-item-title>
                    <v-list-item-action>
                      <v-btn icon><v-icon small>mdi-plus-circle</v-icon></v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider />
                </v-list>

                <v-divider />
                <v-subheader>Segments</v-subheader>

              </v-form>
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
  },
  data() {
    return Object.assign({
      updated_at: null,
      period_from: '2020-09-01',
      period_till: '2020-09-30',
      budget: Math.round(10000*Math.random())*1e4,
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