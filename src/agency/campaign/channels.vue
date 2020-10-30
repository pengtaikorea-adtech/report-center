<template>
  <campaign-expansion>
    <template #header>미디어믹스</template>
    <v-data-table v-bind="table_data" :items="campaign.mediamix">

    </v-data-table>
  </campaign-expansion>
</template>

<script>
import campaignExpansion from '@/components/campaignExpansion'

export default {
  name: 'campaignChannels',
  components: {
    campaignExpansion,
  },
  props: {
    campaign: Object,
  },
  data() {
    return {
      table_data: {
        hideDefaultFooter: true,
        itemsPerPage: -1,
        headers: [
          {text: '채널', value: 'channel'},
          {text: '상품', value: 'adproduct'},
          {text: '예산', value: 'budget'},
          {text: '소진율', value: 'spendings'},
          {text: '노출', value: 'imps'},
          {text: '클릭', value: 'clks'},
          {text: '방문', value: 'vts'},
          {text: '전환', value: 'cvs'},
        ],
      }
    };
  }
}
</script>