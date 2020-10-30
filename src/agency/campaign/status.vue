<template>
  <campaign-expansion>
    <template #header>캠페인 현황</template>
    <v-divider />
    <v-row>
      <v-col cols="12" md="6">
        <v-form>
          <v-row>
            <v-col><v-text-field type="date" v-model="campaign.period_from" /></v-col>
            <v-col><v-text-field type="date" v-model="campaign.period_till" /></v-col>
          </v-row>
          <v-row>
            <v-col><v-text-field label="예산" type="number" v-model="campaign.budget" /></v-col>
          </v-row>
          <v-row>
            <v-col><v-select label="KPI" :items="kpi_metrics" v-model="campaign.kpi_metric" /></v-col>
            <v-col><v-text-field type="number" v-model="campaign.kpi_value" /></v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12" md="6">
        <!-- progress -->
        <v-list elevation="1">
          <status-progress-item 
            item-title="기간" 
            :item-subtitle="`${campaign.period_from} - ${campaign.period_till}`"
            :progress="Math.random()*100" color="primary" />
          <status-progress-item 
            item-title="예산" 
            :item-subtitle="`${campaign.spendings} / ${campaign.budget} (KRW)`"
            :progress="Math.random()*100" color="secondary" />
          <status-progress-item 
            item-title="성과" 
            :item-subtitle="`${campaign.kpi_metric}`"
            :progress="Math.random()*100" color="accent" />
        </v-list>
      </v-col>
    </v-row>
  </campaign-expansion>
  
  <!--  -->
</template>

<script>
import campaignExpansion from '@/components/campaignExpansion'
import statusProgressItem from '@/components/statusProgressItem'
import chartOptions from '../chartOptions'
import chartDummy from '../chartDummy'



export default {
  name: 'campaignStatus',
  components: {
    campaignExpansion,
    statusProgressItem
  },
  props: {
    campaign: Object,
    teams: Array,
    members: Array,
  },
  data() {
    return {
      kpi_metrics: ['impressions','reaches','click','view','install','action','revenue'],
      kpi: {
        metric: 'impressions',
        value: 100,
      },
      chart: chartOptions.dashboard,
      serieses: chartDummy.dashboard,
    };
  }
}
</script>