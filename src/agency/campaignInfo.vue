<template>
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <v-form>
            <v-text-field label="캠페인명" v-model="title" />
            <v-text-field label="기간" />
            <v-text-field label="총 예산 (KRW)" type="number" v-model="budget" />
            <v-select label="담당 팀" :items="teams" v-model="team" />
            <v-select label="담당자" :items="members" v-model="assignee" />
            
          </v-form>
        </v-col>
        <v-col>
          <v-card>
            <v-toolbar dark flat>
              <v-toolbar-title>{{ name }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-input :hint="`기간 진행율: ${period_rate}%`">
                <v-progress-linear :value="period_rate" />
              </v-input>
              <v-input :hint="`예산 집행율: ${spending_rate}%`">
                <v-progress-linear :value="spending_rate" />
              </v-input>
              <v-textarea label="LandingURL" :value="landings.join('\n')" />
              <v-select label="매체" />
              <v-textarea label="소재" :value="creatives.join('\n')" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
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
    spending_rate() {
      return 100*this.spending / Math.max(1, this.budget);
    },
    period_rate() {
      return 100*Math.random();
    },
  },
  data() {
    return Object.assign({
      updated_at: null,
      period_from: '2020-09-01',
      period_till: '2020-09-30',
      budget: Math.round(10000*Math.random())*1e4,
      creatives: [],


    },this.campaign);
  }
}
</script>