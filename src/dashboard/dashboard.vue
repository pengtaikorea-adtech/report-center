<template>
  <v-app id="index">
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card elevation="1">
              <v-toolbar extended flat dark :color="accentingColor">
                <v-toolbar-title>
                  <v-icon>{{ nav_icon(selected) }}</v-icon>
                  Dashboard: {{ nav_label(selected) }}
                </v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                  <v-menu>
                    <template #activator="{ on }">
                      <v-btn icon ripple v-on="on" offset-y>
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <!-- Capture screen -->
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-icon>mdi-image</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>
                          Capture Screen
                        </v-list-item-title>
                      </v-list-item>
                      <!-- Watch dashboard -->
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-icon>mdi-open-in-new</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>
                          Open in New Tab
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-toolbar-items>
              </v-toolbar>
              <v-card elevation="1" class="mx-auto" :style="`width: ${48+embed_width}px; min-height: 50vh; margin-top: -48px;`">
                <v-toolbar flat dense>
                  <v-tabs v-model="tabindex" :color="accentingColor">
                    <v-tab v-for="rp in reports" :key="`dashboard-report.nav.${rp.id}`" ripple>
                      {{ nav_label(rp) }}
                    </v-tab>
                  </v-tabs>
                </v-toolbar>
              
                <v-card-text align="center" justify="center" class="fill-height pa-6">
                  <v-progress-circular v-if="loading" indeterminate rounded striped height="24" />
                  <iframe v-show="!loading" v-if="selected && selected.id" @load="loading=false;"
                    frameborder="0" style="border:0;" allowfullscreen
                    :width="embed_width"
                    :height="embed_height"
                    :src="embed_location">
                  </iframe>
                  <v-alert v-else text>리포트를 선택해 주세요</v-alert>
                </v-card-text>
              </v-card>
              <v-card-actions>
                <v-spacer />
              </v-card-actions>
              <v-footer>
                &copy; PengtaiKorea. MDG.
              </v-footer>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import moment from 'moment'
/*
<iframe width="600" height="338" 
  src="https://datastudio.google.com/embed/reporting/9b2a9722-a8a6-456d-b6f0-f96f9b94b292/page/gH5TB" 
  frameborder="0" 
  style="border:0" allowfullscreen>
</iframe>*/


const reportPresets = [
  {id: 'fe765a60-a1e1-404e-b646-b69e8c99880c', label: 'Sample', icon: 'mdi-chart-areaspline', w: 1366, h: 768, selected: true, updated_at: '2020-09-01T15:24:33.123Z'},
  {id: '9b2a9722-a8a6-456d-b6f0-f96f9b94b292', page: 'gH5TB', label: 'Sample2', w: 1366, h: 768, updated_at: '2020-09-14T17:24:33.123Z'},
  {id: '5f341ace-6367-40b9-8051-9693e17fcafa', page: 'lTyUB', label: 'Buyers'},
]

export default {
  name: 'App',
  watch: {
    tabindex() { this.loading=true; }
  },
  mounted() {
    // filtered index first
    let indexSelected = false;
    this.reports
      .filter((rp)=>rp.selected)
      .forEach((rp,ri)=>{ 
        if(!indexSelected) this.tabindex = ri;
      });
    if(!indexSelected)
      this.tabindex = 0;
    // if(index_candidates.length <= 0) index_candidates = this.reports;
    // this.selected = 0<index_candidates.length ? index_candidates[0] : {};
  },
  methods: {
    nav_label(report) { return report.label || '대시보드 리포트' },
    nav_icon(report) { return report.icon || 'mdi-chart-areaspline' },
    nav_title(report) { return report.title || report.label || report.id },
    nav_updated(report) { 
      if(report.updated_at) {
        return moment(report.updated_at).fromNow();
      } else {
        return ''
      }
    },
  },
  computed: {
    selected() {
      return this.reports[this.tabindex];
    },
    embed_location() {
      let location = `https://datastudio.google.com/embed/reporting/${this.selected.id}`;
      if(this.selected.page) {
        location += `/page/${this.selected.page}`;
      }
      return location;
    },
    embed_width() {
      return Math.min(window.innerWidth, this.selected.w || 1366);
    },
    embed_height() {
      return 24 + this.embed_width * (this.selected.h || 768) / this.embed_width;
    },
  },
  data() {
    return {
      accentingColor: 'black',
      tabindex: 1,
      loading: false,
      filter: null,
      show_list: true,
      reports: reportPresets,
    };
  }
}
</script>