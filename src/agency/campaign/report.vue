<template>
  <campaign-expansion>
    <template #header>리포트 데이터 입력</template>
    <v-row>
      <v-col>
      </v-col>
    </v-row>
  </campaign-expansion>
</template>
<script>
import campaignExpansion from '@/components/campaignExpansion'

export default {
  name: 'campaignTags',
  components: {
    campaignExpansion,
  },
  props: {
    campaign: Object,
  },
  methods: {
    cartesian(left,right,product){
      return left.reduce((g,l)=>g.concat(right.map((r)=>product(l,r))), []);
    }
  },
  computed: {
    landings() { return this.campaign.landings.split('\n').map((l)=>l.trim()) },
    creatives() { return this.campaign.creatives.split('\n').map((c)=>c.trim()) },
    segments() { return this.campaign.segments.split('\n').map((c)=>c.trim()) },
    composites() {
      // 0. sitecode SEC
      let prds = ['sec'];
      // 1. channel category
      // 2. channel type
      // 3. publisher
      prds = this.cartesian(prds, (this.campaign.mediamix||[]), 
        (l,r)=>`${l}_${r.channel_category}_${r.channel_type}_${r.channel}`);
      // 4. product
      prds = prds.map((p)=>`${p}_${this.campaign.model}`)
      // 5. phase
      prds = prds.map((p)=>`${p}_${this.campaign.phase}`);
      // 6. campaign
      prds = prds.map((p)=>`${p}_${this.campaign.name}`);
      // 7. content_type
      prds = prds.map((p)=>`${p}`)
      return prds;
    }
  },
  data() {
    return {
      table_data: {
        hideDefaultFooter: true,
        itemsPerPage: -1,
        headers: [
          {text: 'URL', value: 'url' },
          {text: '소재', value: 'creative' },
          {text: '세그먼트', value: 'segment' },
          {text: 'cid', value: 'cid'},
        ],
      },
      use_utm: true,
    };
  }
}
</script>