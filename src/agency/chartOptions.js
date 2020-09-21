export default {
  dashboard: {
    topBars: {
      title: { text: '진행율 (%)' },
      chart: { type: 'bar', },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: { enabled: true },
        }
      },
      xaxis: {
        categories: [''],
      },
      // colors: [],
      legend: { show: true, },
    },
    mediaArea: {
      title: { text: '매체성과' },
      chart: { 
        type: 'bar', 
        stacked: true,
        zoom: { autoScaleYaxis: true },
      },
      dataLabels: { enabled: false},
      annotations: {
        yaxis: [
          {y: 200, borderColor: '#333', show: true, text: 'KPI Goal', style: { } }
        ],
      },
      xaxis: {
        type: 'datetime',
      }
    },
    pfHits: {
      title: {text: '평균 단가'},
      chart: { type: 'heatmap' },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['A','B','C','D','E','F'].map((s)=>`seg${s}`),
      }
    }
  }
}