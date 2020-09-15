import campaignsView from './campaigns'
import uploadsView from './uploads'
import mediaView from './media'

export default [
  {path: '/', text: '캠페인', component: campaignsView },
  {path: '/up', icon: 'mdi-upload', title: '데이터 업로드', component: uploadsView },
  {path: '/media', icon: 'mdi-table-cog', title: '매체 관리', component: mediaView  },
];